import { useState, useEffect } from 'react'

export default function useHover(val) {
  
const [collection2, setCollection] = useState(val)
  
  
    useEffect(() => {
        setCollection(val)
    }, [val])
    
    const [index, setindex] = useState('')
    function hoverOn(index) {
        //console.log(id)
        
          setCollection(collection2.map(prevC => {
            return {...prevC, hovered:collection2.indexOf(prevC) == index? true : false}
          }))
        
        
    }
    function hoverOff() {
        //console.log()
        setCollection(prev => prev.map(prevC => ({...prevC, hovered: prev.indexOf(prevC)== index? false : false})))
      
    }
  return {collection2, setindex, hoverOn, hoverOff, index}
}
