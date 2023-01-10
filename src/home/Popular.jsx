import React, { useContext, useState } from 'react'
import { Context } from '../Context/Context.jsx'
import spinner from './ViewChart/spinner.gif'
export default function NewReleases() {
    const {loading, popularTracks, setTrackIndex, setMusic, setMusicTracks } = useContext(Context)
    function changeMusic(val) {
        
        setMusic(popularTracks)
        setMusicTracks(popularTracks.map(track => track.preview))
        setTrackIndex(val)
      }
   
    //console.log(loading)
    const popular = popularTracks.map((track, index) => (
        <div className='new-release-box' key={track.id}>
            <img onClick={() => changeMusic(index)} src={track.album.cover_medium} alt="track image" className="new-release-track" />
            <h4>{track.title}</h4>
            <p>{track.artist.name}</p>
        </div>
    ))

  return (
    <section style={{marginTop: '0.4rem'}} id='new-release-container'>
      <h2>Popular in your area</h2>
      
      {loading? 
      
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'2rem auto'}}>
        
        <img className='spinner2' src={spinner} alt="" />
      </div>
      :
      <div className='new-release-container'> 
      {popular}
    </div>
    
      
  } 
    </section>
  )
}
