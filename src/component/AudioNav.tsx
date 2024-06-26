import { BiSkipNext } from "react-icons/bi";
import { MdSkipPrevious } from "react-icons/md";
import { AudioI } from "../interface/AudioI";
import PlayButton from "./PlayButton";
import AudioProgress from "./AudioProgress";
interface AudioNavProps {
  isPlay: boolean;
  progressTime: number;
  duration: number;
  audioData: AudioI | null;
  handlePlayButtonClick: (isPlay: boolean) => void;
  handleSliderDrag: (time: number) => void;
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
              <h1 className="text-sm text-white font-semibold">
                {props.audioData.title}
              </h1>
              <p className="text-sm text-gray-400 ">{props.audioData.profil}</p>
            </div>
          </div>
        )}
      </div>
      <div className="block">
        <div className="flex items-center justify-center mb-2 space-x-4">
          <MdSkipPrevious className="text-white text-3xl" />
          <PlayButton
            isPlay={props.isPlay}
            handleButtonClick={(value: boolean) =>
              props.handlePlayButtonClick(value)
            }
          />
          <BiSkipNext className="text-white text-4xl" />
        </div>
        <AudioProgress
          totalTime={props.progressTime}
          elapsedTime={props.duration}
          dragTime={(value: number) => props.handleSliderDrag(value)}
        />
      </div>
    </div>
  );
};
export default AudioNav;
