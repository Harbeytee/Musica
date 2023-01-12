import React, {useContext, useState} from 'react'
//import collections from './collection'
import spinner from '../assets/spinner.gif'
import play from './images/play.svg'
import useHover from './useHover'
import { Context } from '../Context/Context'
import { Link } from 'react-router-dom'

export default function MyCollection() {
 
  const { collection, state } = useContext(Context)
  const {collection2, setindex, hoverOn, hoverOff} = useHover(collection)
  //<Link style={{textDecoration: 'none', color: '#fff'}} to ={`topchart/${chart.id}`}></Link>
    const cards = collection2.map((card, index) => (
      <Link style={{textDecoration: 'none', color: '#fff'}} to ={`/topchart/${card.id}`} key={index} onMouseOver={() => {setindex(index); hoverOn(index)}} onMouseOut ={() => {setindex(index); hoverOff(index)}} className='card-container'>
          <div  key={index} className='card-img-container' style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.8)),url(${card.picture_medium})`}} >
            
          
          </div>
          
          <div className="third-layer">
            <div className='card'>
                <h2>{card.title}</h2>
                
                <p className='artist-name'>{card.user.name}</p>
                <p style={{marginBottom: card.hovered? '0px' : '-43px', transition: 'all 0.4s ease-out'}} className="hid" >{card.nb_tracks} tracks</p>
                
                
            </div>
            <img style={{animation: card.hovered? 'fadein 0.4s linear' : 'fadeout 0.4s linear', visibility: card.hovered? 'visible' : 'hidden'}} src={play} alt="play icon" className="play" />
            
          </div>
          
          
      </Link>
    ))
    if(state.loading) {
      return ( <div style={{display: 'grid', placeItems: 'center', marginTop: '3rem'}}>
          <img className='spinner2'  src={spinner} alt="" />
        </div>
      )
    }
    if(!state.loading) {
      return (
        <div className='collection-container'>
            {cards}
        </div>
      )
    }
  
  
}
