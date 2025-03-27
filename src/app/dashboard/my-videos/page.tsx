import { Suspense } from "react";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { SubscriptionCheck } from "@/components/subscription-check";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import { Play, Download, Share2, Trash2 } from "lucide-react";
import Link from "next/link";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  duration: string;
}

export default async function MyVideosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // This would be a real database query in production
  // For now, we'll use sample data
  const sampleVideos: VideoItem[] = [
    {
      id: "1",
      title: "The Enchanted Forest",
      thumbnail:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      createdAt: "2023-07-15",
      duration: "1:24",
    },
    {
      id: "2",
      title: "Journey to the Stars",
      thumbnail:
        "https://images.unsplash.com/photo-1560800452-f2d475982b96?w=800&q=80",
      createdAt: "2023-07-12",
      duration: "2:15",
    },
    {
      id: "3",
      title: "The Lost City",
      thumbnail:
        "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=800&q=80",
      createdAt: "2023-07-10",
      duration: "3:42",
    },
  ];

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Videos</h1>
              <p className="text-gray-600">
                View, manage, and share your generated videos
              </p>
            </div>
            <Link href="/dashboard/book-to-video">
              <Button>Create New Video</Button>
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Created on {video.createdAt}
                  </p>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Play
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sampleVideos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                You haven't created any videos yet.
              </p>
              <Link href="/dashboard/book-to-video">
                <Button>Create Your First Video</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </SubscriptionCheck>
  );
}
