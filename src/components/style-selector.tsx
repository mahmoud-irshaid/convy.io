import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Palette } from "lucide-react";

interface StyleOption {
  id: string;
  name: string;
  description: string;
  previewClass: string;
}

export default function StyleSelector() {
  const [selectedStyle, setSelectedStyle] = useState("realistic");

  const styles: StyleOption[] = [
    {
      id: "realistic",
      name: "Realistic",
      description: "Photorealistic visuals with natural lighting and textures",
      previewClass: "bg-blue-50",
    },
    {
      id: "cartoon",
      name: "Cartoon",
      description: "Vibrant colors with bold outlines and playful aesthetics",
      previewClass: "bg-green-50",
    },
    {
      id: "anime",
      name: "Anime",
      description: "Japanese-inspired animation with distinctive visual style",
      previewClass: "bg-purple-50",
    },
    {
      id: "watercolor",
      name: "Watercolor",
      description: "Soft, artistic visuals with a hand-painted appearance",
      previewClass: "bg-yellow-50",
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
                <div className="h-32 bg-white bg-opacity-50 rounded-lg flex items-center justify-center text-gray-400">
                  {style.name} Style Preview
                </div>
              </div>
              <p className="text-sm text-gray-600">{style.description}</p>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
