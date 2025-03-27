"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Mic, Play, Pause } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface VoiceOption {
  id: string;
  name: string;
  gender: string;
  description: string;
  sampleAudio?: string;
}

export default function VoiceSelector() {
  const [selectedVoice, setSelectedVoice] = useState("narrator");
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Store the selected voice in localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedVoice", selectedVoice);
      // Dispatch an event that other components can listen for
      window.dispatchEvent(
        new CustomEvent("voiceChanged", {
          detail: { voice: selectedVoice },
        }),
      );
    }
  }, [selectedVoice]);

  // Load the selected voice from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedVoice = localStorage.getItem("selectedVoice");
      if (savedVoice) {
        setSelectedVoice(savedVoice);
      }
    }
  }, []);

  // Create audio element for voice samples
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.onended = () => {
      setPlayingVoice(null);
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const voices: VoiceOption[] = [
    {
      id: "narrator",
      name: "Narrator",
      gender: "Male",
      description: "Deep, authoritative voice perfect for serious narratives",
      sampleAudio:
        "https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3",
    },
    {
      id: "storyteller",
      name: "Storyteller",
      gender: "Female",
      description: "Warm, engaging voice ideal for children's stories",
      sampleAudio:
        "https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-2.mp3",
    },
    {
      id: "dramatic",
      name: "Dramatic",
      gender: "Male",
      description: "Expressive voice with emotional range for dramatic scenes",
      sampleAudio:
        "https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-3.mp3",
    },
    {
      id: "gentle",
      name: "Gentle",
      gender: "Female",
      description: "Soft, soothing voice for calm and reflective passages",
      sampleAudio:
        "https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-4.mp3",
    },
  ];

  const togglePlayVoice = (voiceId: string) => {
    if (!audioRef.current) return;

    const voice = voices.find((v) => v.id === voiceId);

    if (!voice?.sampleAudio) {
      toast({
        title: "Sample Unavailable",
        description: "Voice sample is not available at this time.",
        variant: "destructive",
      });
      return;
    }

    if (playingVoice === voiceId) {
      audioRef.current.pause();
      setPlayingVoice(null);
    } else {
      // Stop any currently playing audio
      if (playingVoice) {
        audioRef.current.pause();
      }

      // Play the new audio
      audioRef.current.src = voice.sampleAudio;
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        toast({
          title: "Playback Error",
          description: "Could not play the voice sample. Please try again.",
          variant: "destructive",
        });
      });
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
