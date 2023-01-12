import axios from 'axios'
import React, { useContext, useEffect, useState} from 'react'
import { Context } from '../Context/Context'
import play from './images/play.svg'
import useHover from './useHover'
export default function Likes() {
  const { likes, dispatch, audioSrc, audioRef } = useContext(Context)
  const {collection2, setindex, index, hoverOn, hoverOff} = useHover(likes)
  const [result, setResult] = useState([])

   function playAll (id)  {
    
      axios.get(`https://api.allorigins.win/raw?url=https://api.deezer.com/playlist/${id}/tracks`)
      .then(response => {
        let res =  response.data
        setResult(res)
      })
      .catch(error => {
          setError(error);
          console.log(error)
        });

    /*if(result.length > 0){
      audioRef.current.pause()
      dispatch({type: 'ChangeMusic', value: 0, data: result.data})
    
      audioRef.current = new Audio(audioSrc);
    }*/
  }
  const [test, setTest] = useState(false)
  useEffect(() => {
    if(test) {
      audioRef.current.pause()
      dispatch({type: 'ChangeMusic', value: 0, data: result.data})
    
      audioRef.current = new Audio(audioSrc);
    }
    setTest(true)

    console.log(result)
  }, [result])
  

   
  
    const card =likes.length !== 0? collection2.map((like, index) => (
    
      <div key={like.id} onMouseOver={() => {setindex(index); hoverOn(index)}} onMouseOut ={() => {setindex(index); hoverOff(index)}} className='card-container'>
          <div className='card-img-container' style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.8)),url(${like.picture_medium})`}} >
            
          
          </div>
          
          <div className="third-layer">
            <div className='card'>
                <h2>{like.title}</h2>
                
                <p className='artist-name'>{like.user.name}</p>
                <p style={{marginBottom: like.hovered? '0px' : '-43px', transition: 'all 0.4s ease-out'}} className="hid" >2.3m Likes</p>
                
                
            </div>
            <img onClick ={() => playAll(like.id)} style={{animation: like.hovered? 'fadein 0.4s linear' : 'fadeout 0.4s linear', visibility: like.hovered? 'visible' : 'hidden'}} src={play} alt="play icon" className="play" />
            
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
}
