import { useState, useEffect } from "react";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

interface PlayButtonProps {
  isPlay: boolean;
  handleButtonClick: (isPlay: boolean) => void;
}
const PlayButton = (props: PlayButtonProps) => {
  const [isPlay, setIsPlay] = useState<boolean>(props.isPlay);
  const handleToggleAudio = () => {
    setIsPlay(!isPlay);
    props.handleButtonClick(!isPlay);
  };
  useEffect(() => {
    setIsPlay(props.isPlay);
    console.log(props.isPlay);
  }, [props.isPlay]);
  return (
    <button
      className=" w-8 h-8  bg-slate-50 rounded-full flex items-center justify-center z-40 transition-opacity duration-300"
      onClick={handleToggleAudio}
    >
      {isPlay ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default PlayButton;
