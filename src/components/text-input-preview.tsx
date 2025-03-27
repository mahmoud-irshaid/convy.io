"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { BookOpen, Wand2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

interface TextInputPreviewProps {
  userId?: string;
}

export default function TextInputPreview({ userId }: TextInputPreviewProps) {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const sampleText =
    "It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.";

  const loadSample = () => {
    setText(sampleText);
  };

  const generateVideo = async () => {
    if (!text.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter some text to generate a video.",
        variant: "destructive",
      });
      return;
    }

    if (!userId) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to generate videos.",
        variant: "destructive",
      });
      router.push("/sign-in");
      return;
    }

    setIsGenerating(true);

    try {
      // In a real implementation, this would call an API to generate the video
      // For now, we'll simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Dispatch an event that the video preview component can listen for
      window.dispatchEvent(
        new CustomEvent("videoGenerationStarted", {
          detail: { text, userId },
        }),
      );

      toast({
        title: "Generation Started",
        description:
          "Your video is being generated. You'll see frames appear in the preview.",
      });
    } catch (error) {
      console.error("Error generating video:", error);
      toast({
        title: "Generation Failed",
        description:
          "There was an error generating your video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Story Text
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={loadSample}
          >
            Load Sample
          </Button>
        </div>

        <Textarea
          placeholder="Paste your book excerpt or write your original story here..."
          className="min-h-[200px] mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-end">
          <Button
            className="flex items-center"
            onClick={generateVideo}
            disabled={isGenerating || !text.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Video
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
