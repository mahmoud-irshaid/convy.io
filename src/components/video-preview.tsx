import { Film, Download, Share2 } from "lucide-react";
import { Button } from "./ui/button";

export default function VideoPreview() {
  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold flex items-center mb-4">
          <Film className="w-5 h-5 mr-2 text-blue-600" />
          Video Preview
        </h3>

        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
          <div className="text-gray-400">
            Preview will appear here as frames are generated
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button variant="outline" className="flex items-center" disabled>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" className="flex items-center" disabled>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
