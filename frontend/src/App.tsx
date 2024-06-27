import { useState, useRef } from 'react';
import AudioCard from './component/AudioCard';
import AudioNav from './component/AudioNav';
import { AudioI } from './interface/AudioI';

function App() {
  const [duration, setDuration] = useState<number>(0);
  const [progressTime, setProgressTime] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<AudioI | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayButtonClick = () => {
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlay(!isPlay);
    }
  };

  const handleSliderDrag = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleAudioCardPlay = (audioElement: HTMLAudioElement) => {
    if (audioRef.current && audioRef.current !== audioElement) {
      audioRef.current.pause();
    }
    audioRef.current = audioElement;
    setIsPlay(!isPlay);
  };

  return (
    <>
      <div className="grid grid-cols-3">
        <AudioCard
          src="https://ia801306.us.archive.org/21/items/13-beg-forgiveness/03-paid.mp3"
          title="Vultures"
          paragraph="lorem ipsum indolor solor uska"
          profil="YE & Ty dolla sign"
          audioImg="https://ia801306.us.archive.org/21/items/13-beg-forgiveness/front-cover.jpeg"
          handlePlay={(audioElement: HTMLAudioElement) =>
            handleAudioCardPlay(audioElement)
          }
          handleProgress={setProgressTime}
          duration={setDuration}
          exportData={(data: AudioI) => setAudioData(data)}
          isPlay={(value: boolean) => setIsPlay(value)}
        />
      </div>
      {progressTime !== 0 && (
        <AudioNav
          isPlay={isPlay}
          progressTime={progressTime}
          duration={duration}
          audioData={audioData}
          handlePlayButtonClick={handlePlayButtonClick}
          handleSliderDrag={(value: number) => handleSliderDrag(value)}
        />
      )}
    </>
  );
}

export default App;
