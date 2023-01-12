import React from 'react'
import play from './icons/play.svg'
import add from './icons/add.svg'
import PinkHeart from './icons/pink-heart.jsx'
export default function TopComponent(props) {
  const style = {
    cursor: 'pointer',
    
  }
  //const collectionButton = props.collection.some(val => val.id === props.chart.id) ? <span style={style} className='button'><img src={add} alt="add to collection icon"  className="add-btn" /> Remove from collection</span> : <span style={style} className='button'><img src={add} alt="add to collection icon"  className="add-btn" /> Add to collection</span>

  
  return (
    <section className='top'>
          
          <img src={props.chart.picture_medium} alt=" chart image" className="chart-img2" />

          <div className="top-text">
            <h2>{props.chart.title}</h2>
            <p>{props.chart.user.name}</p>
            <p>{props.songs} songs ~ 16 hrs+</p>
            <div className='buttons'>
              <span style={style} className='button' onClick={() => props.play()}><img src={play} alt="play button" className="play-btn2" /> Play all</span>
              {
                props.chart.isCollected
                ?
                <span onClick={() => {props.toggle(props.chart.id, 'collection'); props.remove(props.chart.id, 'collection')}} style={style} className='button'><img src={add} alt="add to collection icon"  className="add-btn" /> Remove from collection</span> 
                :
                 <span onClick={() => {props.toggle(props.chart.id, 'collection'); props.add(props.chart, 'collection')}} style={style} className='button'><img src={add} alt="add to collection icon"  className="add-btn" /> Add to collection</span>


              }



              {/*<span style={style} className='button'><img src={add} alt="add to collection icon"  className="add-btn" /> Add to collection</span>*/}
              {props.chart.isFavorite?
              <span onClick={() => {props.toggle(props.chart.id, 'likes'); props.remove(props.chart.id, 'likes')}} style={style} className='button'><PinkHeart fill='#E5524A'/> {/*<span className='like-text'>Unlike</span>*/}</span>
              :
              <span onClick={() => {props.toggle(props.chart.id, 'likes'); props.add(props.chart, 'likes')}} style={style} className='button'><PinkHeart fill='none'/> <span className='like-text'>Like</span></span>
              }
            </div>

          </div>
        </section>
  )
}
