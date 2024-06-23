import { useState } from "react";
import AudioCard from "./component/AudioCard";
import AudioNav from "./component/AudioNav";
import { AudioI } from "./interface/AudioI";

function App() {
  const [duration, setDuration] = useState<number>(0);
  const [progressTime, setProgressTime] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<AudioI | null>(null);

  return (
    <>
      <div className="grid grid-cols-3">
        <AudioCard
          src="https://ia801306.us.archive.org/21/items/13-beg-forgiveness/03-paid.mp3"
          title="Vultures"
          paragraph=""
          profil="YE & Ty dolla sign"
          audioImg="https://ia801306.us.archive.org/21/items/13-beg-forgiveness/front-cover.jpeg"
          handlePlay={setIsPlay}
          handleProgress={setProgressTime}
          duration={setDuration}
          exportData={(data: AudioI) => setAudioData(data)}
        />
             
   

      </div>
      {progressTime === 0 ? (
        ""
      ) : (
        <AudioNav
          isPlay={isPlay}
          progressTime={progressTime}
          duration={duration}
          audioData={audioData}
        ></AudioNav>
      )}
    </>
  );
}

export default App;
