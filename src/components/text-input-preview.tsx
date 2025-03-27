import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { BookOpen, Wand2 } from "lucide-react";

export default function TextInputPreview() {
  const [text, setText] = useState("");

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Story Text
          </h3>
          <Button variant="outline" size="sm" className="text-xs">
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
          <Button className="flex items-center">
            <Wand2 className="w-4 h-4 mr-2" />
            Generate Video
          </Button>
        </div>
      </div>
    </div>
  );
}
