import React, { useState, useEffect, useContext} from 'react'
import spinner from './spinner.gif'
import axios from 'axios'
import { Context } from '../../Context'
import { useParams } from 'react-router-dom'
import TopComponent from './TopComponent'
import BottomComponent from './BottomComponent'
import Search from '../../components/Search'
import topchart from '../topchart'
export default function ChartDetail() {
  const { playlist, hamburger, music, musicTracks, setMusic, setMusicTracks } = useContext(Context)
  const[loading, setLoading] = useState(true)
  const { id } = useParams()
  const [error, setError] = React.useState(null);
  const detail = playlist.find(chart => chart.id == id)
  const [result, setResult] = useState([])
  function playAll () {
    setMusic(result.data.data)
    setMusicTracks(result.data.data.map(track => track.preview))
    
  }
 
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
      <Search background={'transparent'} position={'relative'} hamburger={hamburger} marginLeft={'-112px'}/>
      <main className='chart-detail' >
      
        <div className='body'>

          <TopComponent trackImg={detail.picture_medium} desc={detail.user.name} trackName={detail.title} songs={detail.nb_tracks} play={playAll}/>

          <BottomComponent tracks={result.data}/>
          
        </div>
        
      </main>
    </div>


  
  )
  }
}
