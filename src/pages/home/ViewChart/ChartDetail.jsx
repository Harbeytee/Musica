import React, { useState, useEffect, useContext} from 'react'
import spinner from '../../../assets/spinner.gif'
import axios from 'axios'
import { Context } from '../../../Context/Context'
import { useParams } from 'react-router-dom'
import TopComponent from './TopComponent'
import BottomComponent from './BottomComponent'
import Search from '../../../components/Search'

export default function ChartDetail() {
  const { hamburger, audioSrc, audioRef, add, remove, toggleLikes, finalMusicState, dispatch } = useContext(Context)
  const { playlist, collection } = finalMusicState
  const[loading, setLoading] = useState(true)
  const { id } = useParams()
  const [error, setError] = React.useState(null);
  
  const [result, setResult] = useState([])
  const detail = playlist.find(chart => chart.id == id) 
  function playAll () {
    audioRef.current.pause()
    dispatch({type: 'ChangeMusic', value: 0, data: result.data})
   
    audioRef.current = new Audio(audioSrc);
   
    
  }
  

  function changeMusic(val) {
    dispatch({type: 'ChangeMusic', value: val, data: result.data})
    
  }

  useEffect(() => {
      
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
  
 
  
  
  
  if (loading == true || result == undefined || result.length == 0) {
    return <div style={{display: 'grid', placeItems: 'center', marginTop: '3rem'}}><img className='spinner2'  src={spinner} alt="" /></div>
  }
  else {
  return (
    <div style={{backgroundImage: `linear-gradient(to bottom, rgba(30, 30, 30, 0.9), rgba(30, 30, 30, 0.9)),url(${detail.picture_big})`}} id='chart-detail'>
      <Search background={'transparent'} position={'relative'} hamburger={hamburger} marginLeft={window.matchMedia('(min-width: 895px)').matches? '-112px' : '0px'}/>
      <main className='chart-detail' >
      
        <div className='body'>

          <TopComponent toggle={toggleLikes} chart={detail} add={add} remove={remove} songs={result.data.length} play={playAll} />

          <BottomComponent tracks={result.data} changeMusic={changeMusic}/>
          
        </div>
        
      </main>
    </div>


  
  )
  }
}
