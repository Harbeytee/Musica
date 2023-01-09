import { useState } from 'react'

export default function useHover(val) {
    const [collection, setCollection] = useState(val)
    const [index, setindex] = useState('')
    function hoverOn(index) {
        //console.log(id)
        
          setCollection(collection.map(prevC => {
            return {...prevC, hovered:collection.indexOf(prevC) == index? true : false}
          }))
        
        
    }
    function hoverOff() {
        //console.log()
        setCollection(prev => prev.map(prevC => ({...prevC, hovered: prev.indexOf(prevC)== index? false : false})))
      
    }
  return {collection, setindex, hoverOn, hoverOff, index}
}
