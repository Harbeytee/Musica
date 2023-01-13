import React, { useContext, } from 'react'
import { Context } from '../../Context/Context.jsx'
//import newReleases from './newRelease.js'
import spinner from '../../assets/spinner.gif'
export default function NewReleases() {
    const { state, finalMusicState, dispatch} = useContext(Context)
    const { tracks } = finalMusicState
    const { loading } = state
    const newR = tracks.map((track, index)=> (
        <div className='new-release-box' key={track.id}>
            <img 
            onClick={() => dispatch({type: 'ChangeMusic', value: index, data: tracks})} 
            src={track.album.cover_medium} alt="track image" className="new-release-track" 
            />
            <h4>{track.title}</h4>
            <p>{track.artist.name}</p>
        </div>
    ))

  return (
    <section id='new-release-container'>
      <h2>New releases</h2>
      
      {loading? 
      
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'2rem auto'}}>
        
        <img className='spinner2' src={spinner} alt="" />
      </div>
      :
      <div className='new-release-container'> 
      {newR}
    </div>
    
      
  } 
    </section>
  )
}
