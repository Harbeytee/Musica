import React from 'react'
import whiteHeart from './icons/white-heart.svg'

export default function BottomComponent(props) {
    function convert(val) {
        let min = 0
        let sec = val
        
        while (sec >= 60 ) {
            min = min + 1
          sec = sec - 60
           
        }
        return `${min}:${sec >= 10 ? sec : '0' + sec}`
        
    }
    const component = props.tracks.map((track, index) => (
        <div style={{cursor: 'pointer'}} onClick={() => props.changeMusic(index)} key={track.id} className="row">
            
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className='track-img'>
                    <img src={track.album.cover_medium} alt="track image" className="track-image" />
                    <img src={whiteHeart} alt="a white heart" className="white-heart" />

                </div>
                <div className='track-name'>
                    <span className='trackname2'>{track.title} ~ {track.artist.name}</span>
                    <span>{track.album.title}</span>
                </div>

                
            </div>
            <div className="track-time">
                <div className='kebab'>
                    <div className='kebab-circle'></div>
                    <div className='kebab-circle'></div>
                    <div className='kebab-circle'></div>
                </div>
                <span>{convert(track.duration)}</span>
                    
            </div>
            
    </div>
    ))

  return (
        <section className='bottom'>
            {component}
        </section>
        
  )
}
