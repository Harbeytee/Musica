import React, {useContext, useState, useEffect} from 'react'
//import collections from './collection'
import spinner from '../../assets/spinner.gif'
import play from '../../assets/collection/play.svg'
import useHover from '../../hooks/useHover'
import { Context } from '../../Context/Context'
import axios from 'axios'


export default function MyCollection() {
 
  const { collection, state, dispatch, audioSrc, audioRef } = useContext(Context)
  const {collection2, setindex, hoverOn, hoverOff} = useHover(collection)
  const [result, setResult] = useState([])
  const [error, setError] = useState('')

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
  

    const cards = collection2.map((card, index) => (
      <div key={index} onMouseOver={() => {setindex(index); hoverOn(index)}} onMouseOut ={() => {setindex(index); hoverOff(index)}} className='card-container'>
          <div  key={index} className='card-img-container' style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.8)),url(${card.picture_medium})`}} >
            
          
          </div>
          
          <div className="third-layer">
            <div className='card'>
                <h2>{card.title}</h2>
                
                <p className='artist-name'>{card.user.name}</p>
                <p style={{marginBottom: card.hovered? '0px' : '-43px', transition: 'all 0.4s ease-out'}} className="hid" >{card.nb_tracks} tracks</p>
                
                
            </div>
            <img onClick={() => playAll(card.id)} style={{animation: card.hovered? 'fadein 0.4s linear' : 'fadeout 0.4s linear', visibility: card.hovered? 'visible' : 'hidden'}} src={play} alt="play icon" className="play" />
            
          </div>
          
          
      </div>
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
