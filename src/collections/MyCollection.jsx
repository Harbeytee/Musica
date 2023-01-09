import React from 'react'
import collections from './collection'
import play from './images/play.svg'
import useHover from './useHover'

export default function MyCollection() {
  const {collection, setindex, hoverOn, hoverOff} = useHover(collections)
  /*const [collection, setCollection] = useState(collections)
  //console.log(collection)
  const [index, setindex] = useState('')
  //const [hovered, setHovered] = useState(false)
  useEffect(() => {
    console.log('changed')
   console.log(collection)
  }, [collection])
  
  function hoverOn(index) {
    //console.log(id)
    
      setCollection(collection.map(prevC => {
        return {...prevC, hovered:collection.indexOf(prevC) == index? true : false}
      }))
    
    
  }
  //console.log('coll')
  //if(index !== '') { console.log(() => hoverOn(index)) }
  function hoverOff() {
      //console.log()
      setCollection(prev => prev.map(prevC => ({...prevC, hovered: prev.indexOf(prevC)== index? false : false})))
    
  }
  /*useEffect(() => {
    //console.log(hovered)
  }, [hovered])*/
  //hoverOff() 
  //(index) => setCollection(prev => {...prev, hovered: false})

    const cards = collection.map((card, index) => (
      <div key={index} onMouseOver={() => {setindex(index); hoverOn(index)}} onMouseOut ={() => {setindex(index); hoverOff(index)}} className='card-container'>
          <div  key={index} className='card-img-container' style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.8)),url(${card.img})`}} >
            
          
          </div>
          
          <div className="third-layer">
            <div className='card'>
                <h2>Limits</h2>
                
                <p className='artist-name'>John watts</p>
                <p style={{marginBottom: card.hovered? '0px' : '-43px', transition: 'all 0.4s ease-out'}} className="hid" >2.3m Likes</p>
                
                
            </div>
            <img style={{animation: card.hovered? 'fadein 0.4s linear' : 'fadeout 0.4s linear', visibility: card.hovered? 'visible' : 'hidden'}} src={play} alt="play icon" className="play" />
            
          </div>
          
          
      </div>
    ))

  return (
    <div className='collection-container'>
        {cards}
    </div>
  )
}
