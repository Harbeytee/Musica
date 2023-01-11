import React, {useRef, useEffect, useState, useContext} from 'react'
import { Context } from '../Context/Context'
import SideMenu from './SideMenu'
import Search from './Search'
import PlayMusic from './PlayMusic'
//import './_components.scss'

import { Outlet } from 'react-router-dom'

export default function Constant() {
  

  const {node, state} = useContext(Context)

  const {displayMessage, message, display} = state
  const style = {
    display: 'grid',
    placeItems: 'center'
  }
  return (
    <>
      {
        displayMessage && <div style={style}><p className='message'>{message}</p></div>
      }
        
        <SideMenu node={node} display={display}/>
        <PlayMusic />
        <Outlet />
    </>
  )
}
