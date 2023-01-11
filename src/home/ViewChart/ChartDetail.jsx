import React, { useState, useEffect, useContext} from 'react'
import spinner from './spinner.gif'
import axios from 'axios'
import { Context } from '../../Context/Context'
import { useParams } from 'react-router-dom'
import TopComponent from './TopComponent'
import BottomComponent from './BottomComponent'
import Search from '../../components/Search'

export default function ChartDetail() {
  const { hamburger, audioSrc, audioRef, addToLikes, removeFromLikes, toggleLikes, state, setState, finalMusicState, dispatch } = useContext(Context)
  const { playlist } = finalMusicState
  const[loading, setLoading] = useState(true)
  const { id } = useParams()
  const [error, setError] = React.useState(null);
  const detail = playlist.find(chart => chart.id == id)
  const [result, setResult] = useState([])
 
  function playAll () {
    audioRef.current.pause()
    dispatch({type: 'ChangeMusic', value: 0, data: result.data})
    /*setState(prev =>(
      {...prev,
        music: result.data,
        musicTracks: result.data.map(track => track.preview),
        trackIndex: 0,

    }
    ))*/
    //setMusic(result.data)
    //setMusicTracks(result.data.map(track => track.preview))
    audioRef.current = new Audio(audioSrc);
    //setTrackIndex(0)
    
  }

  function changeMusic(val) {
    dispatch({type: 'ChangeMusic', value: val, data: result.data})
    /*setState(prev =>(
      {...prev,
        music: result.data,
        musicTracks: result.data.map(track => track.preview),
        trackIndex: val,

    }
    ))*/
    //setMusic(result.data)
    //setMusicTracks(result.data.map(track => track.preview))
    //setTrackIndex(val)
  }

  useEffect(() => {
      console.log(audioSrc)
  }, [audioSrc])
  useEffect(() => {
    
    axios.get(`https://api.allorigins.win/raw?url=https://api.deezer.com/playlist/${id}/tracks`)
    .then(response => {
      let res = response.data
      
      setResult(res)
      setLoading(false)
    })
    .catch(error => {
        setError(error);
        console.log(error)
      });

    
  }, [])
  
  
  
  
  if (loading == true) {
    return <div style={{display: 'grid', placeItems: 'center', marginTop: '3rem'}}><img className='spinner2'  src={spinner} alt="" /></div>
  }
  else {
  return (
    <div style={{backgroundImage: `linear-gradient(to bottom, rgba(30, 30, 30, 0.9), rgba(30, 30, 30, 0.9)),url(${detail.picture_big})`}} id='chart-detail'>
      <Search background={'transparent'} position={'relative'} hamburger={hamburger} marginLeft={window.matchMedia('(min-width: 895px)').matches? '-112px' : '0px'}/>
      <main className='chart-detail' >
      
        <div className='body'>

          <TopComponent toggle={toggleLikes} chart={detail} add={addToLikes} remove={removeFromLikes} isFavorite={detail.isFavorite} trackImg={detail.picture_medium} desc={detail.user.name} trackName={detail.title} songs={result.data.length} play={playAll}/>

          <BottomComponent tracks={result.data} changeMusic={changeMusic}/>
          
        </div>
        
      </main>
    </div>


  
  )
  }
}
