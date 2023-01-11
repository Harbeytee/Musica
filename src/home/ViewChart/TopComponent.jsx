import React from 'react'
import play from './icons/play.svg'
import add from './icons/add.svg'
import PinkHeart from './icons/pink-heart.jsx'
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
              {props.isFavorite?
              <span onClick={() => {props.toggle(props.chart.id); props.remove(props.chart.id)}} style={style} className='button'><PinkHeart fill='#E5524A'/> {/*<span className='like-text'>Unlike</span>*/}</span>
              :
              <span onClick={() => {props.toggle(props.chart.id); props.add(props.chart)}} style={style} className='button'><PinkHeart fill='none'/> <span className='like-text'>Like</span></span>
              }
            </div>

          </div>
        </section>
  )
}
