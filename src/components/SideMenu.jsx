import React, { useState } from 'react'
import Home from '../assets/components/home'
import Collection from '../assets/components/collection'
import Radio from '../assets/components/radio'
import Video from '../assets/components/video'
import Profile from '../assets/components/profile'
import Logout from '../assets/components/logout'
import { Link } from 'react-router-dom'
//import { Context } from '../Context'

export default function SideMenu({node, display}) {
  
  
  const [index, setIndex] = useState(1)

  const sideMenu ={
    transform: window.matchMedia("(max-width: 899px)").matches && display == false ? "translateX(-100%)" : "translateX(0)",
    //boxShadow: display == true? '5px 0px 15px rgba(255, 255, 255, 0.1)' : 'none'
  }
  
  function handleClick(val){
    setIndex(val)
  }


  function setColor(value) {
    if(value == index) {
        return "clicked"
        }
    return "unclicked"
  }

    const textDecoration ={
      textDecoration: 'none'
    }
  
  
  return (
    <ul style={sideMenu} ref={node}className='side-menu'>
      <div className='first'>
        <Link to= '/' style={textDecoration}>
          <li onClick={() => handleClick(1)} className={setColor(1)}>
            <Home fill="#EFEEE0"/>
            
            <p>Home</p>
          </li>
        </Link>
        

        <Link style={{textDecoration: "none"}} to="collection">
          <li onClick={() => handleClick(2)} className={setColor(2)}>
            <Collection fill="#EFEEE0" />
            
            <p>My collections</p>
         </li>
        </Link>

        <li onClick={() => handleClick(3)} className={setColor(3)}>
          <Radio fill="#EFEEE0" />
          
          <p>Radio</p>
        </li>

        <li onClick={() => handleClick(4)} className={setColor(4)}>
          <Video fill ="#EFEEE0" />
          
          <p>Music videos</p>
        </li>
      </div>
      
      <div className='second'>
        <li onClick={() => handleClick(5)} className={setColor(5)}>
          <Profile fill="#EFEEE0" />
          
          <p>Profile</p>
        </li>

        <li onClick={() => handleClick(6)} className={setColor(6)}>
          <Logout fill="#EFEEE0 " />
          {/*fill="#535552" <img src='./icons/logout.svg' className='icon' alt='logout icon'/>*/}
          <p>log out</p>
        </li>
      </div>
      
    </ul>
  )
}
