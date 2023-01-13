import React, { useContext } from 'react'
import { Context } from '../../Context/Context.jsx'
import spinner from '../../assets/spinner.gif'
export default function NewReleases() {
    const {state, dispatch, finalMusicState} = useContext(Context)
    const { popularTracks } = finalMusicState
    const { loading } = state
   
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
