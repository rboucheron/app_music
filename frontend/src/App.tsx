import { useState, useRef, useEffect } from 'react';
import AudioCard from './component/AudioCard';
import AudioNav from './component/AudioNav';
import { AudioI } from './interface/AudioI';
import useGet from '../utilities/Requester';
import Header from './component/Header';

function App() {
  const [audios, setAudios] = useState<AudioI[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [progressTime, setProgressTime] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<AudioI | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchAudio();
  }, []);

  const fetchAudio = async () => {
    try {
      const response = await useGet<AudioI[]>('music');
      setAudios(response);
    } catch (error) {
      console.error('Erreur lors de la récupération des audios:', error);
    }
  };

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
    <Header />
      <div className="grid grid-cols-3">
        {audios.map((audio) => (
          <AudioCard
            key={audio.id}
            src={audio.musicUrl}
            title={audio.title}
            paragraph={audio.paragraph}
            profil={audio.profil}
            audioImg={audio.imageUrl}
            handlePlay={handleAudioCardPlay}
            handleProgress={setProgressTime}
            duration={setDuration}
            exportData={setAudioData}
            isPlay={setIsPlay}
          />
        ))}
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
