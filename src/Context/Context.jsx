import React, { createContext, useState, useEffect, useRef, useReducer} from 'react'
import musicPlayer from './MusicPlayer'
const Context = createContext()
import axios from 'axios'


export default function Provider(props) {
  //old proxy https://api.allorigins.win/raw?url=

  const [myCollection, setMyCollection] = useState(JSON.parse(localStorage.getItem('myCollection')) || [])
    const [state, setState] = useState({
      search: '',
      searching: false,
      searchResults: [],
      loading: true,
      error: null,
      display: false,
      message: '', 
      displayMessage: false,
      likes: JSON.parse(localStorage.getItem('likes')) || [],
      
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

    const { message, likes, search, displayMessage} = state
    const { reducer } = musicPlayer()
        const [finalMusicState, dispatch] = useReducer(reducer, musicState)
    
    const { musicTracks, trackIndex, playlist, collection} = finalMusicState
    const node = useRef()
    const audioSrc = musicTracks[trackIndex]
    const audioRef = useRef(new Audio(audioSrc));

    useEffect(() => {
      
        const timer = setTimeout(() => {
          setState(prev =>(
            {...prev, displayMessage: false}
            ))
          
        }, 2000)
        return () => clearTimeout(timer)
      
      
      
}, [message, displayMessage])

   
   //localStorage.clear()
    useEffect(() => {
        localStorage.setItem('myCollection', JSON.stringify(myCollection))
      
      }, [myCollection])
    
    useEffect(() => {
      
      localStorage.setItem('likes', JSON.stringify(likes))
      
      }, [likes])
    

    function torf(val, type) {
      if(type === 'playlist') {
          if(likes.length !== 0 || myCollection.length != 0) {
        dispatch({
          type:'Playlist', 
          data: val.map((list) => 
            ({...list,
            //isCollected: true, 
            isFavorite: likes.some(like => like.id === list.id) ? true : false}))
        })
        
      }
        else {
          dispatch({
            type:'Playlist', 
            data: val.map(list => ({...list, /*isCollected: true*/ isFavorite: false}))
          })
        
        }
      }
    else if (type === 'collection') {
        
        if(myCollection.length > 0) {
           
          dispatch({
            type: 'Collection', 
             data: [...myCollection, 
              ...val.map(list => ({...list, isCollected: myCollection.some(collection => collection.id === list.id) ? true : false}))]
           })
          
        
        }
        else if(myCollection.length ===  0) {
         
          dispatch({
            type: 'Collection', 
             data: val.map(list => ({...list, isCollected: false}))
           })
         
        }
      }
    }
    
    function hamburger() {
      setState(prev =>({...prev, display: true}))
     
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
        
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      if(state.search.trim().split(/\s+/g).join('').length == 0) {
        setState(prev => ({
          ...prev,
          message: 'Search must not be empty!',
          displayMessage: true,
          
        }))
      }
      else {
        
        setState(prev => ({
          ...prev,
          searching: true,
          search: '',
          displayMessage: false
        }))
        
        axios.get(`https://corsproxy.io/?https://api.deezer.com/search?q=${search}`)
        .then(res => {
          console.log(res)
          if(res.data.error || res.data.data.length == 0) {
            setState(prev => ({
              ...prev,
              message: 'Not Found',
              displayMessage: true,
              searching: false
            }))
            

          }
          else {
            setState(prev => ({
              ...prev,
              searching: false,
              searchResults: res.data.data
            }))
          }
          
        })
        .catch(error => {
          console.log(error)
          setState(prev => ({
            ...prev,
            message: 'Not Found',
            displayMessage: true,
            searching: false
          }))
        })
     }
    }

 // http://developers.deezer.com/api/editorial/charts
 //https://thingproxy.freeboard.io/fetch/https://api.deezer.com/editorial/0/charts
 
 function toggleLikes(id, type) {
    if(type === 'likes') {
      const updatedPlaylist = playlist.map(chart => {
        if(chart.id === id) {
            return {...chart, isFavorite: !chart.isFavorite}
            
        }
        return chart
    })
    
    dispatch({type: 'Playlist', data: updatedPlaylist })
  }

  else if(type === 'collection') {

    const updatedPlaylist = playlist.map(chart => {
      if(chart.id === id) {
          return {...chart, isCollected: !chart.isCollected}
          
      }
      return chart
    })
    dispatch({type: 'Playlist', data: updatedPlaylist })
      
  }
  
}

function add(newItem, type) {
  delete newItem.isFavorite

  if(type === 'likes') {
  setState(prev =>(
    {...prev, 
      message:'Added To Likes', 
      displayMessage: true,
      likes: [...likes, newItem]
    }
    ))
    
  }
  else if(type === 'collection') {
    setState(prev =>(
      {...prev, 
        message:'Added To Collection', 
        displayMessage: true,
        
      }
      ))
      dispatch({type: 'Collection', data: [newItem, ...collection] })
    setMyCollection(prev => [...prev, {...newItem}])
    
  }
  
}

function remove(id, type) {
  if(type === 'likes') {
  setState(prev =>(
    {...prev, 
      message:'Removed From Likes', 
      displayMessage: true,
      likes: likes.filter(item => item.id !== id)
    }
    ))
  }
  else if(type === 'collection') {
    setState(prev =>(
      {...prev, 
        message:'Removed From Collection', 
        displayMessage: true,
        //collection: collection.filter(item => item.id !== id)
      }
      ))
      dispatch({type: 'Collection', data: collection.filter(item => item.id !== id)})
    setMyCollection(prev => prev.filter(item => item.id !== id))
  }
}


  //usa
 /* useEffect(() => {
    axios.get('https://corsproxy.io/?https://api.deezer.com/playlist/1313621735?limit=10')
    .then(res => console.log('res'))
  }, [])*/

  //nigeria
 /* useEffect(() => {
    axios.get('https://corsproxy.io/?https://api.deezer.com/playlist/1362516565?limit=10')
    .then(res => dispatch({type: 'PopularTracks', data: res.data.tracks.data}))
  }, [])*/

 useEffect(() => {
  axios.get('https://corsproxy.io/?https://api.deezer.com/editorial/0/charts')
  .then (response => {
    
    let res = response.data
    
    torf(res.playlists.data.filter((res, index) => index >= 2 && index <= 4), 'playlist')
    torf(res.playlists.data.filter((res, index) => index >= 5 && index <= 9), 'collection')
    dispatch({type: 'Tracks', data: res.tracks.data})
    setState(prev => ({...prev, loading:false}))
    
    
  })
  .catch(error => {
    setState(prev =>({...prev, error: error}))
    console.log(state.error)
  });

  axios.get('https://corsproxy.io/?https://api.deezer.com/playlist/1362516565?limit=10')
  .then(res => dispatch({type: 'PopularTracks', data: res.data.tracks.data}))
  .catch(error => {
    setState(prev =>({...prev, error: error}))
    console.log(state.error)
  });
  
}, [])

 
  
   
  return (
    <Context.Provider  value={{handleChange,
    toggleLikes, add, remove, likes, hamburger, node,
    audioSrc, audioRef, state, dispatch, finalMusicState, collection, handleSubmit}}>
        {props.children}
    </Context.Provider>
  )
}

export { Context }
