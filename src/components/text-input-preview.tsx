"use client";

import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { BookOpen, Wand2, Loader2, FileUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

interface TextInputPreviewProps {
  userId?: string;
}

export default function TextInputPreview({ userId }: TextInputPreviewProps) {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const sampleText =
    "It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.";

  const loadSample = () => {
    setText(sampleText);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is PDF
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // In a real implementation, this would use a PDF extraction API
      // For now, we'll simulate PDF text extraction with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate extracted text
      const extractedText =
        "This is simulated text extracted from the PDF file: " +
        file.name +
        ". In a real implementation, this would contain the actual content from the PDF document.";

      setText(extractedText);

      toast({
        title: "PDF Uploaded Successfully",
        description: "Text has been extracted from your PDF.",
      });
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      toast({
        title: "Extraction Failed",
        description: "Failed to extract text from the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={triggerFileUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FileUp className="w-3 h-3 mr-1" />
                  Upload PDF
                </>
              )}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="application/pdf"
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={loadSample}
            >
              Load Sample
            </Button>
          </div>
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
