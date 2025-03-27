import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import {
  ArrowUpRight,
  BookText,
  Palette,
  Mic,
  Film,
  Download,
  Share2,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  const result = plans?.items;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your favorite book excerpts or original stories into
              captivating videos in just a few simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BookText className="w-6 h-6" />,
                title: "Input Your Text",
                description:
                  "Paste a book excerpt or write your own original story in our clean, minimalist interface.",
              },
              {
                icon: <Palette className="w-6 h-6" />,
                title: "Choose Your Style",
                description:
                  "Select from various animation styles including realistic, cartoon, anime, and more.",
              },
              {
                icon: <Mic className="w-6 h-6" />,
                title: "Select a Voice",
                description:
                  "Browse and preview AI voice options to find the perfect narrator for your story.",
              },
              {
                icon: <Film className="w-6 h-6" />,
                title: "Generate Video",
                description:
                  "Watch as our AI creates your video frame by frame in the preview window.",
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: "Download Your Creation",
                description:
                  "Save your video in various resolution settings for different devices and purposes.",
              },
              {
                icon: <Share2 className="w-6 h-6" />,
                title: "Share With Others",
                description:
                  "Easily share your video creations on social media or with friends and family.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch how our AI transforms text into stunning visual narratives.
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
              <div className="text-gray-500">Video Demo Preview</div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                "The Enchanted Forest" - Sample Story
              </h3>
              <p className="text-gray-600 text-sm">
                Generated with Cartoon style and Storyteller voice
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Style Options Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Choose Your Style</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Customize your video with different animation styles to match your
              story's mood and theme.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Realistic",
                description:
                  "Photorealistic visuals for a cinematic experience",
                bgClass: "bg-blue-50",
              },
              {
                title: "Cartoon",
                description: "Vibrant, colorful animation with a playful feel",
                bgClass: "bg-green-50",
              },
              {
                title: "Anime",
                description:
                  "Japanese-inspired animation style with distinctive aesthetics",
                bgClass: "bg-purple-50",
              },
              {
                title: "Watercolor",
                description: "Soft, artistic visuals with a painted appearance",
                bgClass: "bg-yellow-50",
              },
            ].map((style, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${style.bgClass}`}
              >
                <div className="h-32 bg-white bg-opacity-50 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                  Style Preview
                </div>
                <h3 className="text-xl font-semibold mb-2">{style.title}</h3>
                <p className="text-gray-600">{style.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your creative needs. No hidden fees.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {result?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Bring Your Stories to Life?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of authors and storytellers who are transforming
            their words into captivating videos.
          </p>
          {user ? (
            <Link
              href="/dashboard/book-to-video"
              className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Make a Video
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Creating Now
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
