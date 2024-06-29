import { useState, useRef, useEffect } from 'react';
import { AudioI } from '../interface/AudioI';
import { FaPause, FaPlay } from 'react-icons/fa';

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
      audioRef.current.addEventListener('play', () => setIsPlay(true));
      audioRef.current.addEventListener('pause', () => setIsPlay(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', () => setIsPlay(true));
        audioRef.current.removeEventListener('pause', () => setIsPlay(false));
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
      className="relative m-4 h-96 w-auto overflow-hidden rounded shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={props.audioImg}
        className="absolute z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-10 bg-black bg-opacity-35">
        <h1 className="absolute bottom-28 left-4 right-4 z-20 text-4xl text-white">
          {props.title}
        </h1>
        <p className="absolute bottom-20 left-4 right-4 z-20 text-sm text-white">
          {props.paragraph}
        </p>
        <div className="absolute left-2 top-2 z-20 flex items-center space-x-2 text-sm text-white">
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${String(
              props.profil,
            )}`}
            className="w-9 rounded-full"
          />
          <p>{props.profil}</p>
        </div>
      </div>
      <button
        onClick={handleToggleAudio}
        className={`absolute bottom-0 right-5 z-40 m-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff2f01] transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : isPlay ? 'opacity-100' : 'opacity-0'
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
