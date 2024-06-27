import { useState, useRef, useEffect } from "react";
import { AudioI } from "../interface/AudioI";
import { FaPause, FaPlay } from "react-icons/fa";

export interface AudioCardProps {
  src: string;
  handlePlay: (audioElement: HTMLAudioElement) => void;
  handleProgress: (progressTime: number) => void;
  duration: (duration: number) => void;
  title: string;
  paragraph: string;
  profil: string;
  audioImg: string;
  exportData: (data: AudioI) => void;
  isPlay: (isPlay: boolean) => void;
}

const AudioCard = (props: AudioCardProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("play", () => setIsPlay(true));
      audioRef.current.addEventListener("pause", () => setIsPlay(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", () => setIsPlay(true));
        audioRef.current.removeEventListener("pause", () => setIsPlay(false));
      }
    };
  }, []);

  const handleToggleAudio = () => {
    props.exportData({
      title: props.title,
      image: props.audioImg,
      profil: props.profil,
      paragraph: props.paragraph,
    });
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.pause();
      } else {
        props.handlePlay(audioRef.current);
        audioRef.current.play();
      }
      props.isPlay(!isPlay);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      props.handleProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      props.duration(audioRef.current.duration);
    }
  };

  return (
    <div
      className="relative w-auto h-96 m-4 rounded overflow-hidden shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={props.audioImg}
        className="w-full h-full object-cover absolute z-10"
      />
      <div className="absolute inset-0 bg-black bg-opacity-35 z-10">
        <h1 className="absolute bottom-28 left-4 right-4 text-white text-4xl z-20">
          {props.title}
        </h1>
        <p className="absolute bottom-20 left-4 right-4 text-white text-sm z-20">
          {props.paragraph}
        </p>
        <div className="absolute left-2 top-2 space-x-2 text-white text-sm z-20 flex items-center">
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${String(
              props.profil
            )}`}
            className="w-9 rounded-full"
          />
          <p>{props.profil}</p>
        </div>
      </div>
      <button
        onClick={handleToggleAudio}
        className={`absolute right-5 bottom-0 m-auto mb-4 w-12 h-12 bg-[#ff2f01] rounded-full flex items-center justify-center z-40 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : isPlay ? "opacity-100" : "opacity-0"
        }`}
      >
        {isPlay ? <FaPause /> : <FaPlay />}
      </button>
      <audio
        src={props.src}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
};

export default AudioCard;
