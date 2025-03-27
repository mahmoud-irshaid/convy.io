import { Suspense } from "react";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { SubscriptionCheck } from "@/components/subscription-check";
import TextInputPreview from "@/components/text-input-preview";
import StyleSelector from "@/components/style-selector";
import VoiceSelector from "@/components/voice-selector";
import VideoPreview from "@/components/video-preview";
import { createClient } from "../../../../supabase/server";

export default async function BookToVideoPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Book to Video Converter</h1>
            <p className="text-gray-600">
              Transform your book excerpts or stories into engaging AI-generated
              videos
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Suspense fallback={<div>Loading text input...</div>}>
                <TextInputPreview userId={user.id} />
              </Suspense>
              <Suspense fallback={<div>Loading style selector...</div>}>
                <StyleSelector />
              </Suspense>
              <Suspense fallback={<div>Loading voice selector...</div>}>
                <VoiceSelector />
              </Suspense>
            </div>
            <div>
              <Suspense fallback={<div>Loading video preview...</div>}>
                <VideoPreview />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
