import React, { useContext, useState } from 'react'
import { Context } from '../Context/Context.jsx'
import spinner from './ViewChart/spinner.gif'
export default function NewReleases() {
    const {state, setState, dispatch, finalMusicState} = useContext(Context)
    const {popularTracks} = finalMusicState
    const { loading } = state
    /*function changeMusic(val) {
        setState(prev => ({
          ...prev,
          music: popularTracks,
          musicTracks: popularTracks.map(track => track.preview),
          trackIndex: val
        }))
        /*setMusic(popularTracks)
        setMusicTracks(popularTracks.map(track => track.preview))
        setTrackIndex(val)*
      }*/
   
    //console.log(loading)
    const popular = popularTracks.map((track, index) => (
        <div className='new-release-box' key={track.id}>
            <img onClick={() => dispatch({type: 'ChangeMusic', value: index, data: popularTracks})} src={track.album.cover_medium} alt="track image" className="new-release-track" />
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
