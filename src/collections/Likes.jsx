import React, { useContext, useEffect, useState} from 'react'
import { Context } from '../Context/Context'
import play from './images/play.svg'
import useHover from './useHover'
export default function Likes() {
  //const [hover, setHover] = useState(false)
  /*useEffect(() => {
    console.log(hover)
  }, [hover])*/
  {/*onMouseOver ={/*() => setHover(true)} onMouseOut ={() => setHover(false)*/
  const { likes, setLikes } = useContext(Context)
  const {collection, setindex, index, hoverOn, hoverOff} = useHover(likes)
  
  useEffect(() => {
    console.log(index)
  }, [index])
  

   
  
    const card =likes.length !== 0? collection.map((like, index) => (
    
      <div key={like.id} onMouseOver={() => {setindex(index); hoverOn(index)}} onMouseOut ={() => {setindex(index); hoverOff(index)}} className='card-container'>
          <div className='card-img-container' style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.8)),url(${like.picture_medium})`}} >
            
          
          </div>
          
          <div className="third-layer">
            <div className='card'>
                <h2>{like.title}</h2>
                
                <p className='artist-name'>{like.user.name}</p>
                <p style={{marginBottom: like.hovered? '0px' : '-43px', transition: 'all 0.4s ease-out'}} className="hid" >2.3m Likes</p>
                
                
            </div>
            <img style={{animation: like.hovered? 'fadein 0.4s linear' : 'fadeout 0.4s linear', visibility: like.hovered? 'visible' : 'hidden'}} src={play} alt="play icon" className="play" />
            
          </div>
          
          
      </div>

    
  )): 0

  return (
    <div className='collection-container'>
      {
      card == 0?
      <p>No likes yet</p>
      :
      card
      }
    </div>
  )
}}
