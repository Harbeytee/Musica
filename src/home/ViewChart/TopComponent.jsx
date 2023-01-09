import React from 'react'
import play from './icons/play.svg'
import add from './icons/add.svg'
import pinkHeart from './icons/pink-heart.svg'

export default function TopComponent(props) {
  const style = {
    cursor: 'pointer',
    
  }
    
  return (
    <section className='top'>
          
          <img src={props.trackImg} alt=" chart image" className="chart-img2" />

          <div className="top-text">
            <h2>{props.trackName}</h2>
            <p>{props.desc}</p>
            <p>{props.songs} songs ~ 16 hrs+</p>
            <div className='buttons'>
              <span style={style} className='button' onClick={() => props.play()}><img src={play} alt="play button" className="play-btn2" /> Play all</span>
              <span style={style} className='button'><img src={add} alt="add to collection icon"  className="add-btn" /> Add to collection</span>
              <span style={style} className='button'><img src={pinkHeart} alt="pink heart" className="pink-heart-btn" /> <span className='like-text'>Like</span></span>
              
            </div>

          </div>
        </section>
  )
}
