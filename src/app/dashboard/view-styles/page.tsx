import { Suspense } from "react";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { SubscriptionCheck } from "@/components/subscription-check";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface StyleExample {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export default async function ViewStylesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Sample style examples
  const styleExamples: StyleExample[] = [
    {
      id: "1",
      title: "Forest Scene",
      description:
        "Realistic rendering of a dense forest with natural lighting",
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      category: "realistic",
    },
    {
      id: "2",
      title: "City Skyline",
      description: "Realistic urban landscape with detailed architecture",
      image:
        "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
      category: "realistic",
    },
    {
      id: "3",
      title: "Cartoon Adventure",
      description:
        "Vibrant cartoon style with bold colors and playful characters",
      image:
        "https://images.unsplash.com/photo-1560800452-f2d475982b96?w=800&q=80",
      category: "cartoon",
    },
    {
      id: "4",
      title: "Cartoon Fantasy",
      description: "Whimsical cartoon world with fantasy elements",
      image:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
      category: "cartoon",
    },
    {
      id: "5",
      title: "Anime Portrait",
      description: "Japanese anime style character with distinctive features",
      image:
        "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=800&q=80",
      category: "anime",
    },
    {
      id: "6",
      title: "Anime Landscape",
      description: "Scenic anime background with detailed environment",
      image:
        "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&q=80",
      category: "anime",
    },
    {
      id: "7",
      title: "Watercolor Portrait",
      description: "Soft watercolor painting with blended colors",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
      category: "watercolor",
    },
    {
      id: "8",
      title: "Watercolor Landscape",
      description: "Dreamy watercolor scene with artistic brush strokes",
      image:
        "https://images.unsplash.com/photo-1557682260-96773eb01377?w=800&q=80",
      category: "watercolor",
    },
  ];

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Animation Styles</h1>
            <p className="text-gray-600">
              Explore different animation styles for your videos
            </p>
          </header>

          <Tabs defaultValue="realistic" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="realistic">Realistic</TabsTrigger>
              <TabsTrigger value="cartoon">Cartoon</TabsTrigger>
              <TabsTrigger value="anime">Anime</TabsTrigger>
              <TabsTrigger value="watercolor">Watercolor</TabsTrigger>
            </TabsList>

            {["realistic", "cartoon", "anime", "watercolor"].map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {styleExamples
                    .filter((example) => example.category === category)
                    .map((example) => (
                      <div
                        key={example.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                      >
                        <img
                          src={example.image}
                          alt={example.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-1">
                            {example.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {example.description}
                          </p>
                          <Link href="/dashboard/book-to-video">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              Use This Style
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Ready to create your own video with these styles?
            </p>
            <Link href="/dashboard/book-to-video">
              <Button>Create a Video Now</Button>
            </Link>
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
