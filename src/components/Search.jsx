import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../Context/Context'
import musicIcon from  './icons/music-icon.svg'
import searchIcon from  './icons/search-icon.webp'
 function Search({hamburger, background = '#1D2123', position ='fixed', marginLeft = '0'}) {
    const {state, handleChange, handleSubmit} = useContext(Context)
    const { search } = state
    const navigate = useNavigate()
  return (
    
    <div className='search-component' style={{backgroundColor: `${background}`, position: `${position}`, marginLeft: `${marginLeft}`}}>
        <div onClick={hamburger}className='hamburger'>
            <div className='line1'></div>
            <div className='line2'></div>
        </div>
        
        <Link style={{textDecoration: 'none'}} to='/'><img src={musicIcon} className='music-icon' alt="music icon" /></Link>
        <form onSubmit={(e) => handleSubmit(e, navigate('/searchresults'))} className='search-form'>
            <input className='search-bar' 
            type="text" alt="Search bar" 
            value={search} 
            onChange={handleChange} 
            placeholder="Search artists"
            />
            <button className='search-btn'>
                <img src={searchIcon} className='icon search-icon' alt="search icon" />
                </button>
        </form>
    </div>
  )
}



export default Search