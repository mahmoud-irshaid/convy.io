"use client";

import { useState, useEffect } from "react";
import { Film, Download, Share2, Loader2, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useToast } from "./ui/use-toast";

export default function VideoPreview() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [frames, setFrames] = useState<string[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const { toast } = useToast();

  // Listen for video generation events
  useEffect(() => {
    const handleVideoGenerationStarted = (event: CustomEvent) => {
      const { text, userId } = event.detail;
      startVideoGeneration(text, userId);
    };

    window.addEventListener(
      "videoGenerationStarted",
      handleVideoGenerationStarted as EventListener,
    );

    return () => {
      window.removeEventListener(
        "videoGenerationStarted",
        handleVideoGenerationStarted as EventListener,
      );
    };
  }, []);

  // Simulate video generation
  const startVideoGeneration = (text: string, userId: string) => {
    setIsGenerating(true);
    setProgress(0);
    setFrames([]);
    setCurrentFrame(0);
    setVideoReady(false);

    // Get the selected style and voice from localStorage
    const style = localStorage.getItem("selectedStyle") || "realistic";
    const voice = localStorage.getItem("selectedVoice") || "narrator";

    console.log(
      `Generating video with text: ${text.substring(0, 50)}..., style: ${style}, voice: ${voice}, userId: ${userId}`,
    );

    // Simulate frame generation
    const totalFrames = 10;
    const frameUrls = [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      "https://images.unsplash.com/photo-1560800452-f2d475982b96?w=800&q=80",
      "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=800&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
      "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&q=80",
      "https://images.unsplash.com/photo-1557682260-96773eb01377?w=800&q=80",
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    ];

    let frameCount = 0;
    const interval = setInterval(() => {
      frameCount++;
      const newProgress = Math.round((frameCount / totalFrames) * 100);
      setProgress(newProgress);

      if (frameCount <= totalFrames) {
        setFrames((prev) => [...prev, frameUrls[frameCount - 1]]);
        setCurrentFrame(frameCount - 1);
      }

      if (frameCount === totalFrames) {
        clearInterval(interval);
        setIsGenerating(false);
        setVideoReady(true);
        toast({
          title: "Video Generated",
          description: "Your video is ready to download or share.",
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your video is being prepared for download.",
    });

    // In a real implementation, this would download the actual video
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your video has been downloaded.",
        variant: "success",
      });
    }, 2000);
  };

  const handleShare = () => {
    // In a real implementation, this would open a share dialog
    toast({
      title: "Share Link Generated",
      description: "A shareable link has been copied to your clipboard.",
    });
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold flex items-center mb-4">
          <Film className="w-5 h-5 mr-2 text-blue-600" />
          Video Preview
        </h3>

        {isGenerating && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Generating frames...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {frames.length > 0 ? (
            <img
              src={frames[currentFrame]}
              alt={`Frame ${currentFrame + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-center p-4">
              {isGenerating ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <p>Generating video frames...</p>
                </div>
              ) : (
                <p>Preview will appear here as frames are generated</p>
              )}
            </div>
          )}
        </div>

        {frames.length > 0 && (
          <div className="mb-4 flex overflow-x-auto gap-2 pb-2">
            {frames.map((frame, index) => (
              <div
                key={index}
                className={`w-16 h-12 rounded cursor-pointer flex-shrink-0 border-2 ${currentFrame === index ? "border-blue-500" : "border-transparent"}`}
                onClick={() => setCurrentFrame(index)}
              >
                <img
                  src={frame}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            variant="outline"
            className="flex items-center"
            disabled={!videoReady}
            onClick={handleDownload}
          >
            {videoReady ? (
              <Download className="w-4 h-4 mr-2" />
            ) : (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Download
          </Button>
          <Button
            variant="outline"
            className="flex items-center"
            disabled={!videoReady}
            onClick={handleShare}
          >
            {videoReady ? (
              <Share2 className="w-4 h-4 mr-2" />
            ) : (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Share
          </Button>
        </div>

        {videoReady && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center text-sm text-green-700">
            <Check className="w-4 h-4 mr-2" />
            Video generation complete! You can now download or share your video.
          </div>
        )}
      </div>
    </div>
  );
}
