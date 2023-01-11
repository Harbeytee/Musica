import React, { useContext } from 'react'
import { Context } from '../Context/Context'
import spinner from './ViewChart/spinner.gif'
import charts from './topchart'
import YellowHrt from './images/topcharts/yellowheart.jsx'
import yellowHeart from './images/topcharts/yellow-heart.svg'
import { Link } from 'react-router-dom'

export default function TopCharts() {
   
 const {toggleLikes, addToLikes, removeFromLikes, state, finalMusicState } = useContext(Context)
    
    const {loading} = state
 
    const top = finalMusicState.playlist.map(chart => (
        <div  className='chart' key={chart.id}>
            <Link style={{textDecoration: 'none', color: '#fff'}} to ={`topchart/${chart.id}`}>
                <div className='chart-box'>
                    
                    <img src={chart.picture} alt="track image" className="chart-img" />
                    <div>
                        <h3>{chart.title}</h3>
                        <p className='chart-name'>{chart.user.name}</p>
                        <p className='chart-time'>{chart.nb_tracks} tracks</p>
                    </div>
                </div>
            </Link>
            
            
            {/*<img src={yellowHeart} alt="a yellow heart" className="yellow-heart" />*/}
            {chart.isFavorite?
            <div onClick={() =>{ toggleLikes(chart.id); removeFromLikes(chart.id)}} className='clicked2 yellow-heart2'>
                <YellowHrt fill="#EFEEE0"  />
            </div>
            :
            <div onClick={() => {toggleLikes(chart.id); addToLikes(chart)}} className='unclicked2 yellow-heart2'>
                <YellowHrt fill="#EFEEE0" />
            </div>
            }
            
        </div>
    ))
   
  if(loading ) {

   return (
   <div style ={{display: 'flex', flexDirection: 'column'}}>
   <h2 className='tophead2'>Top charts</h2>
   <div className='spinner'><img className='top-charts-container' src={spinner} alt="" />
   </div>
   </div>)
  }
  else  {
  return (
    
        <aside id='top-charts-container'>
            <h2>Top charts</h2>
           
           
            <div className='top-charts-container'>
                {top}
            </div>
               
            
        </aside>
        
    
  )
}
}
