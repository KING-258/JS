import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith('audio/'));
    if (files.length) {
      setAudioFiles(files);
      setCurrentFileIndex(0);
      setProgress(0);
    } else {
      alert('Please select audio files.');
    }
  };
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };
  const handleSeek = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value;
      setProgress((e.target.value / duration) * 100);
    }
  };
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };
  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 5, duration);
    }
  };
  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 5, 0);
    }
  };
  const nextTrack = () => {
    if (currentFileIndex < audioFiles.length - 1) {
      setCurrentFileIndex(currentFileIndex + 1);
      setProgress(0);
      setIsPlaying(true);
    }
  };
  const previousTrack = () => {
    if (currentFileIndex > 0) {
      setCurrentFileIndex(currentFileIndex - 1);
      setProgress(0);
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    if (audioFiles.length > 0 && currentFileIndex !== null) {
      audioRef.current.src = URL.createObjectURL(audioFiles[currentFileIndex]);
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
    }
  }, [currentFileIndex, audioFiles]);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Music Player</h1>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>
      <div className="main-content">
        <div className="file-selector">
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <div className="content">
          <div className="file-list-container">
            <h2>Songs</h2>
            <div className="file-list">
              <ul>
                {audioFiles.map((file, index) => (
                  <li key={index} onClick={() => setCurrentFileIndex(index)} className={index === currentFileIndex ? 'active' : ''}>
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {audioFiles.length > 0 && currentFileIndex !== null && (
            <div className="player-container">
              <h2>Now Playing</h2>
              <div className="player">
                <audio
                  ref={audioRef}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={nextTrack}
                  style={{ display: 'none' }}
                />
                <div className="controls">
                  <button onClick={previousTrack} disabled={currentFileIndex === 0}>Previous</button>
                  <button onClick={skipBackward}>-5 sec</button>
                  <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
                  <button onClick={skipForward}>+5 sec</button>
                  <button onClick={nextTrack} disabled={currentFileIndex === audioFiles.length - 1}>Next</button>
                </div>
                <div className="progress-container">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                  />
                  <div className="time-info">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="track-info">
                  <p>{audioFiles[currentFileIndex].name}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;