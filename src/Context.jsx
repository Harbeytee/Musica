import React, { createContext, useState, useEffect, useRef} from 'react'

const Context = createContext()
import axios from 'axios'
export default function Provider(props) {
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [tracks, setTracks] = useState([])
    const [likes, setLikes] = useState(JSON.parse(localStorage.getItem('likes')) || [])
    const [collection, setCollection] = useState([])
    const [playlist, setPlaylist] = useState([])
    const [error, setError] = React.useState(null);
    const [music, setMusic] = useState([])
    const [musicTracks, setMusicTracks] = useState([])
    const node = useRef()
    const [display, setDisplay] = useState(false)
    const [popularTracks, setPopularTracks] = useState([])
    const [trackIndex, setTrackIndex] = useState(0);
    const audioSrc = musicTracks[trackIndex]
    const audioRef = useRef(new Audio(audioSrc));
  


   //localStorage.clear()
   
    useEffect(() => {

      localStorage.setItem('likes', JSON.stringify(likes))
      
      }, [likes]
    
    )

    useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist))
    
    
    }, [playlist]

)
    function torf(playlist) {

      if(likes.length !== 0) {
        
        setPlaylist(playlist.map((list) => {
          return {...list, isFavorite: likes.some(like => like.id === list.id) ? true : false}
      }))
        
      }
      else {
        setPlaylist(playlist.map(list => ({...list, isFavorite: false})))
      }
     
      
    }
    
    function hamburger() {
      setDisplay(true)
    }

    const clickOutside = (ref, handler) => {useEffect(() => {
      function listener(e) {
          if(ref.current == e.target /*|| ref.current.contains(e.target)*/) {
              return
          }
          handler(e)
      }
  
    document.addEventListener('mousedown', listener)
  
    return () => { 
        document.removeEventListener('mousedown', listener) 
    }
  
    
    
    }, [ref, handler] )}
  
    clickOutside(node, () => setDisplay(false))
    

    const handleChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    
    
  
 // http://developers.deezer.com/api/editorial/charts
 //https://thingproxy.freeboard.io/fetch/https://api.deezer.com/editorial/0/charts
 
 function toggleLikes(id) {
  const updatedPlaylist = playlist.map(chart => {
      if(chart.id === id) {
          return {...chart, isFavorite: !chart.isFavorite}
          
      }
      return chart
  })
  
  setPlaylist(updatedPlaylist)
  
  
}

function addToLikes(newItem) {
  delete newItem.isFavorite
  setLikes(prevItems => [...prevItems, {...newItem}])
  
}


function removeFromLikes(id) {
  setLikes(prevItems => prevItems.filter(item => item.id !== id))
}

  //usa
 /* useEffect(() => {
    axios.get('https://api.allorigins.win/raw?url=https://api.deezer.com/playlist/1313621735?limit=10')
    .then(res => console.log('res'))
  }, [])*/

  //nigeria
  useEffect(() => {
    axios.get('https://api.allorigins.win/raw?url=https://api.deezer.com/playlist/1362516565?limit=10')
    .then(res => setPopularTracks(res.data.tracks.data))
  }, [])

 useEffect(() => {
  axios.get('https://api.allorigins.win/raw?url=https://api.deezer.com/editorial/0/charts')
  .then (response => {
    
    let res = response.data
    console.log(res)
    torf(res.playlists.data.filter((res, index) => index > 1 && index < 5))
    
    setTracks(res.tracks.data.map(track => {
      return {...track, isFavorite: false}
    }))
   
    setMusic(res.tracks.data)
    setMusicTracks(res.tracks.data.map(music => music.preview))

    
    setLoading(false)
    

  })
  .catch(error => {
      setError(error);
      console.log(error)
    });

  
}, [])

 
  
   
  return (
    <Context.Provider  value={{search, handleChange, playlist, loading, tracks, toggleLikes, addToLikes, removeFromLikes, likes, display, hamburger, node, setLikes, music, musicTracks, setMusic, setMusicTracks, popularTracks, trackIndex, setTrackIndex, audioSrc, audioRef}}>
        {props.children}
    </Context.Provider>
  )
}

export { Context }
