"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Palette } from "lucide-react";

interface StyleOption {
  id: string;
  name: string;
  description: string;
  previewClass: string;
  previewImage?: string;
}

export default function StyleSelector() {
  const [selectedStyle, setSelectedStyle] = useState("realistic");

  // Store the selected style in localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedStyle", selectedStyle);
      // Dispatch an event that other components can listen for
      window.dispatchEvent(
        new CustomEvent("styleChanged", {
          detail: { style: selectedStyle },
        }),
      );
    }
  }, [selectedStyle]);

  // Load the selected style from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedStyle = localStorage.getItem("selectedStyle");
      if (savedStyle) {
        setSelectedStyle(savedStyle);
      }
    }
  }, []);

  const styles: StyleOption[] = [
    {
      id: "realistic",
      name: "Realistic",
      description: "Photorealistic visuals with natural lighting and textures",
      previewClass: "bg-blue-50",
      previewImage:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
    },
    {
      id: "cartoon",
      name: "Cartoon",
      description: "Vibrant colors with bold outlines and playful aesthetics",
      previewClass: "bg-green-50",
      previewImage:
        "https://images.unsplash.com/photo-1560800452-f2d475982b96?w=400&q=80",
    },
    {
      id: "anime",
      name: "Anime",
      description: "Japanese-inspired animation with distinctive visual style",
      previewClass: "bg-purple-50",
      previewImage:
        "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&q=80",
    },
    {
      id: "watercolor",
      name: "Watercolor",
      description: "Soft, artistic visuals with a hand-painted appearance",
      previewClass: "bg-yellow-50",
      previewImage:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80",
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold flex items-center mb-4">
          <Palette className="w-5 h-5 mr-2 text-blue-600" />
          Animation Style
        </h3>

        <Tabs
          defaultValue="realistic"
          value={selectedStyle}
          onValueChange={setSelectedStyle}
        >
          <TabsList className="grid grid-cols-4 mb-6">
            {styles.map((style) => (
              <TabsTrigger key={style.id} value={style.id}>
                {style.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {styles.map((style) => (
            <TabsContent key={style.id} value={style.id} className="mt-0">
              <div className={`p-4 rounded-lg ${style.previewClass} mb-4`}>
                {style.previewImage ? (
                  <div className="h-32 rounded-lg overflow-hidden">
                    <img
                      src={style.previewImage}
                      alt={`${style.name} style preview`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-32 bg-white bg-opacity-50 rounded-lg flex items-center justify-center text-gray-400">
                    {style.name} Style Preview
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">{style.description}</p>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
