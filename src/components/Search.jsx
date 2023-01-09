import React from 'react'
import { useContext } from 'react'
import { Context } from '../Context'
import musicIcon from  './icons/music-icon.svg'
import searchIcon from  './icons/search-icon.svg'
 function Search({hamburger, background, position, marginLeft = '0'}) {
    const {search, handleChange} = useContext(Context)

  return (
    
    <div className='search-component' style={{backgroundColor: `${background}`, position: `${position}`, marginLeft: `${marginLeft}`}}>
        <div onClick={hamburger}className='hamburger'>
            <div className='line1'></div>
            <div className='line2'></div>
        </div>
        
        <img src={musicIcon} className='music-icon' alt="music icon" />
        <form className='search-form'>
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