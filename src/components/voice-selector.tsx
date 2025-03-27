import { useState } from "react";
import { Button } from "./ui/button";
import { Mic, Play, Pause } from "lucide-react";

interface VoiceOption {
  id: string;
  name: string;
  gender: string;
  description: string;
}

export default function VoiceSelector() {
  const [selectedVoice, setSelectedVoice] = useState("narrator");
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const voices: VoiceOption[] = [
    {
      id: "narrator",
      name: "Narrator",
      gender: "Male",
      description: "Deep, authoritative voice perfect for serious narratives",
    },
    {
      id: "storyteller",
      name: "Storyteller",
      gender: "Female",
      description: "Warm, engaging voice ideal for children's stories",
    },
    {
      id: "dramatic",
      name: "Dramatic",
      gender: "Male",
      description: "Expressive voice with emotional range for dramatic scenes",
    },
    {
      id: "gentle",
      name: "Gentle",
      gender: "Female",
      description: "Soft, soothing voice for calm and reflective passages",
    },
  ];

  const togglePlayVoice = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold flex items-center mb-4">
          <Mic className="w-5 h-5 mr-2 text-blue-600" />
          Voice Selection
        </h3>

        <div className="space-y-4">
          {voices.map((voice) => (
            <div
              key={voice.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedVoice === voice.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
              onClick={() => setSelectedVoice(voice.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{voice.name}</h4>
                  <p className="text-sm text-gray-500">{voice.gender}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayVoice(voice.id);
                  }}
                >
                  {playingVoice === voice.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-2">{voice.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
