import { Play, Pause } from "lucide-react";
import { AudioI } from "../interface/AudioI";
interface PlayButtonProps {
  isPlay: boolean;
}

interface AudioNavProps {
  isPlay: boolean;
  progressTime: number;
  duration: number;
  audioData: AudioI | null;
}

interface AudioProgressProps {
  elapsedTime: number;
  totalTime: number;
}

const AudioNav = (props: AudioNavProps) => {
  return (
    <div className="w-full z-50 fixed bottom-0 bg-black left-0 right-0  pt-4 pb-4 grid grid-cols-3">
      <div>
        {props.audioData === null ? (
          ""
        ) : (
          <div className="flex space-x-4 ml-4">
            <img src={props.audioData.image} className=" w-16 rounded-xl" />
            <div className="flex flex-col ">
              <h1 className="text-sm text-white font-semibold">{props.audioData.title}</h1>
              <p className="text-sm text-gray-400 ">{props.audioData.profil}</p>
            </div>
          </div>
        )}
      </div>
      <div className="block">
        <div className="flex items-center justify-center mb-2 ">
          <PlayButton isPlay={props.isPlay} />
        </div>
        <AudioProgress
          totalTime={props.progressTime}
          elapsedTime={props.duration}
        />
      </div>
    </div>
  );
};

const PlayButton: React.FC<PlayButtonProps> = ({ isPlay }) => {
  return (
    <button className=" w-8 h-8  bg-slate-50 rounded-full flex items-center justify-center z-40 transition-opacity duration-300">
      {isPlay ? (
        <Pause className="w-6 h-6" color="rgb(30, 41, 59)" />
      ) : (
        <Play className="w-6 h-6" color="rgb(30, 41, 59)" />
      )}
    </button>
  );
};

const AudioProgress: React.FC<AudioProgressProps> = ({
  elapsedTime,
  totalTime,
}) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressTime = (totalTime / elapsedTime) * 100;

  return (
    <div className="h-4 relative w-full rounded grid grid-cols-5 bg-opacity-10 gap-4  ">
      <div className=" right-0 mr-2  text-orange-300 text-sm text-end">
        {formatTime(totalTime)}
      </div>

      <div className=" col-span-3 mt-2">
        <div className=" h-1 bg-gray-200 w-full rounded ">
          <div
            style={{ width: `${progressTime}%` }}
            className="h-1  bg-orange-800 rounded"
          ></div>
        </div>
      </div>

      <div className="ml-2 text-start text-sm text-orange-300">
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
};

export default AudioNav;
