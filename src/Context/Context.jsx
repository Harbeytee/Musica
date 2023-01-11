import React, { createContext, useState, useEffect, useRef, useReducer} from 'react'
import musicPlayer from './MusicPlayer'
const Context = createContext()
import axios from 'axios'
export default function Provider(props) {
    const [state, setState] = useState({
      search: '',
      loading: true,
      likes: JSON.parse(localStorage.getItem('likes')) || [],
      error: null,
      display: false,
      message: '', //done
      displayMessage: false, //done


    })

    const musicState = {
      tracks: [],
      playlist: [],
      music: [],
      musicTracks: [],
      popularTracks: [],
      trackIndex: 0,
      collection: [],
    }

    const { message, likes } = state
    const { reducer } = musicPlayer()
    const [finalMusicState, dispatch] = useReducer(reducer, musicState)
    const { musicTracks, trackIndex, playlist} = finalMusicState
    //const [search, setSearch] = useState("")
    //const [loading, setLoading] = useState(true)
    //const [tracks, setTracks] = useState([])
    //const [likes, setLikes] = useState(JSON.parse(localStorage.getItem('likes')) || [])
    //const [collection, setCollection] = useState([])
    //const [playlist, setPlaylist] = useState([])
    const [error, setError] = React.useState(null);
    //const [music, setMusic] = useState([])
    //const [musicTracks, setMusicTracks] = useState([])
    const node = useRef()
    //const [display, setDisplay] = useState(false)
    //const [popularTracks, setPopularTracks] = useState([])
    //const [trackIndex, setTrackIndex] = useState(0);
    const audioSrc = musicTracks[trackIndex]
    const audioRef = useRef(new Audio(audioSrc));
    //const [message, setMessage] = useState('')
    //const [displayMessage, setDisplayMessage] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => {
        setState(prev =>(
          {...prev, displayMessage: false}
          ))
        
      }, 2000)
      return () => clearTimeout(timer)
}, [message])

   localStorage.clear()
   
    useEffect(() => {

      localStorage.setItem('likes', JSON.stringify(likes))
      
      }, [likes]
    
    )

    function torf(playlist) {

      if(likes.length !== 0) {
        dispatch({
          type:'Playlist', 
          data: playlist.map((list) => ({...list, isFavorite: likes.some(like => like.id === list.id) ? true : false}))
        })
        /*setState(prev => (
          {
            ...prev,
            playlist: playlist.map((list) => ({...list, isFavorite: likes.some(like => like.id === list.id) ? true : false}))
          }
        ))*/

        /*setPlaylist(playlist.map((list) => {
          return {...list, isFavorite: likes.some(like => like.id === list.id) ? true : false}
      }))*/
        
      }
      else {
        dispatch({
          type:'Playlist', 
          data: playlist.map(list => ({...list, isFavorite: false}))
        })
        /*setState(prev => (
          {...prev,
            playlist: playlist.map(list => ({...list, isFavorite: false}))
        }))*/
       
       /* setPlaylist(playlist.map(list => ({...list, isFavorite: false})))*/
      }
     
      
    }
    
    function hamburger() {
      setState(prev =>({...prev, display: true}))
      //setDisplay(true)
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
  
    clickOutside(node, () => setState(prev => ({...prev, display: false})))    //setDisplay(false))
    

    const handleChange = (e) => {
        e.preventDefault()
        setState(prev =>(
          {...prev, search: e.target.value}
          ))
        //setSearch(e.target.value)
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
  dispatch({type: 'Playlist', data: updatedPlaylist })
  //setState(prev => ({...prev, playlist:updatedPlaylist}))
  //setPlaylist(updatedPlaylist)
  
  
}

function addToLikes(newItem) {
  delete newItem.isFavorite
 
  //setLikes(prevItems => [...prevItems, {...newItem}])
  //setMessage('Added To Likes')
  setState(prev =>(
    {...prev, 
      message:'Added To Likes', 
      displayMessage: true,
      likes: [...likes, {...newItem}]
    }
    ))
  //setDisplayMessage(true)
  
}


function removeFromLikes(id) {
  //setLikes(prevItems => prevItems.filter(item => item.id !== id))
  //setMessage('Removed From Likes')
  //setDisplayMessage(true)
  setState(prev =>(
    {...prev, 
      message:'Removed From Likes', 
      displayMessage: true,
      likes: likes.filter(item => item.id !== id)
    }
    ))
}
useEffect(() => {
  console.log(finalMusicState)
}, [finalMusicState])
  //usa
 /* useEffect(() => {
    axios.get('https://api.allorigins.win/raw?url=https://api.deezer.com/playlist/1313621735?limit=10')
    .then(res => console.log('res'))
  }, [])*/

  //nigeria
  useEffect(() => {
    axios.get('https://api.allorigins.win/raw?url=https://api.deezer.com/playlist/1362516565?limit=10')
    .then(res => dispatch({type: 'PopularTracks', data: res.data.tracks.data})/*setState(prev => ({...prev, popularTracks:res.data.tracks.data}))*/)
  }, [])

 useEffect(() => {
  axios.get('https://api.allorigins.win/raw?url=https://api.deezer.com/editorial/0/charts')
  .then (response => {
    
    let res = response.data
    console.log(res)
    torf(res.playlists.data.filter((res, index) => index > 1 && index < 5))
    dispatch({type: 'Tracks', data: res.tracks.data})
    setState(prev => ({...prev, loading:false}))
    /*setState(prev =>(
      {...prev, 
        tracks: res.tracks.data.map(track => ({...track, isFavorite: false})),
        music: res.tracks.data,
        musicTracks: res.tracks.data.map(music => music.preview),
        loading: false,

      }
    ))*/
    
    /*setTracks(res.tracks.data.map(track => {
      return {...track, isFavorite: false}
    }))*/
   
    /*setMusic(res.tracks.data)
    setMusicTracks(res.tracks.data.map(music => music.preview))

    setState(prev =>(
      {...prev, loading: false}
      ))*/
    //setLoading(false)
    

  })
  .catch(error => {
      setError(error);
      console.log(error)
    });

  
}, [])

 
  
   
  return (
    <Context.Provider  value={{handleChange, /*playlist, /*loading,*/ /*tracks*/ 
    toggleLikes, addToLikes, removeFromLikes, likes, /*display,*/ hamburger, node, 
    /*setLikes, /*music, musicTracks, setMusic, setMusicTracks, popularTracks, /*trackIndex, 
    setTrackIndex,*/ audioSrc, audioRef, state, setState, dispatch, finalMusicState}}>
        {props.children}
    </Context.Provider>
  )
}

export { Context }
