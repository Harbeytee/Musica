import React, { useState, useEffect, useRef, useContext } from 'react'
import shuffleOn from '../assets/components/shuffleOn.webp'
import shuffleOff from '../assets/components/shuffleoff.webp'
import prev from '../assets/components/prev.webp'
import play from '../assets/components/play.webp'
import pause from '../assets/components/pause.webp'
import next from '../assets/components/next.webp'
import repeat from '../assets/components/repeat.svg'
import speaker from '../assets/components/speaker.webp'

import { Context } from '../Context/Context'

  function PlayMusic() {
    
  const [test, setTest] = useState(false)
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50)
  const [shuffle, setShuffle] = useState(false)
  
  
  const {audioSrc, audioRef, finalMusicState, dispatch } = useContext(Context)

  
  const {trackIndex, music, musicTracks} = finalMusicState

 const track =[
    'https://www.bensound.com/bensound-music/bensound-buddy.mp3', 'https://www.bensound.com//bensound-music/bensound-sunny.mp3', 'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3', 
  ]
 
  const intervalRef = useRef();
 // const [isReady, setIsReady] = useState(false);
 
  const { duration } = audioRef.current;
  audioRef.current.volume = (volume/100).toFixed(1)
  
  const repeatSong = () => {
    
   audioRef.current.currentTime = 0;

  }
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `${currentPercentage} 100%`
   


  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        if(shuffle) {
          dispatch({type: 'ChangeTrackIndex', index: Math.floor(Math.random() * musicTracks.length)})
        }
        else {
          toNextTrack();
        }
       
      } else {
        setTrackProgress(audioRef.current.currentTime);
        
      }
    }, [1000]);
  };


  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      dispatch({type: 'ChangeTrackIndex', index: musicTracks.length - 1})
     
    } else {
      dispatch({type: 'ChangeTrackIndex', index: trackIndex - 1})
      
    }
  
  }
  
  const toNextTrack = () => {
    if (trackIndex < musicTracks.length - 1) {
      dispatch({type: 'ChangeTrackIndex', index: trackIndex + 1})
     
    } else {
      dispatch({type: 'ChangeTrackIndex', index: 0})
      
    }

    
   
  }

  const pausePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const changeVolume = (e) => {
      setVolume(e.target.value)
  }
  

  const shuffleMusic = () => {
    setShuffle(!shuffle)
  }

  
  

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
    console.log('scrub')
  };



  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
    console.log('scrubend')
  };

  
  useEffect(() => {
    
      if (isPlaying) {
        
       
        audioRef.current.play();
        startTimer();
        console.log(audioRef.current.volume)
        
       
      } else {
        audioRef.current.pause();
        clearInterval(intervalRef.current)
      }
    
    
  }, [isPlaying]);


  // Handles cleanup and setup when changing tracks
  useEffect(() => {
      if(test == true) {
        audioRef.current.pause();

        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);
        
          audioRef.current.play();
          setIsPlaying(true)
          startTimer()
        
      }
      
   
  }, [trackIndex, musicTracks]);
  

  

  useEffect(() => {
    if(musicTracks.length  > 1 && test == false) {
      audioRef.current = new Audio(audioSrc);
      setTest(true)
    }
    
  }, [musicTracks])
  
 
  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  function truncate(val) {
    if(val.length > 14) {
       const ans = val.slice(0, 14)
            return ans + '...'
    }
    else {
        return val
    }
}

  
  return (
    <section className='play-music'>
      <div className='play-music2'>
        <div className='controls'>
          <img onClick={shuffleMusic} src={shuffle? shuffleOn : shuffleOff} alt="shuffle songs" className="shuffle" />
          <img onClick={toPrevTrack} src={prev} alt="previous song" className="prev" />
          <img onClick={pausePlay} src={isPlaying? pause : play} alt="pause or play song" className="pause-play" />
          <img onClick={toNextTrack} src={next} alt="next song" className="next" />
          <img onClick ={repeatSong} src={repeat} alt="repeat song" className="repeat" />
        </div>
      
        <div className='music-playing'>
        
          
            <div className='name-of-music'>
            {music.length !== 0 &&
            (<>
              <img src={music[trackIndex].album.cover_medium} alt="" />
              <div style={{whiteSpace: 'nowrap'}}>
              
                <h4>{truncate(music[trackIndex].title)}</h4>
                <p>{music[trackIndex].artist.name}</p>
              </div>
              </>)
            }
          </div>
          
            <div className='volume-bar'>
              <img style={{height: '20px', width: '20px'}} src={speaker} alt="speaker icon" className="speaker" />
              <input type="range" 
              className="volume" 
              min='0'
              max='100'
              value={volume}
              onChange={changeVolume}
              onKeyUp={changeVolume}
              onMouseUp={changeVolume}
              style={{backgroundSize: `${volume}% 100%`}}
              
              
              />
            </div>
          
        
        </div>

        <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            className="progress"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ backgroundSize: trackStyling }} />
      
      
      
    </div>
    </section>
    
  )
}

export default PlayMusic