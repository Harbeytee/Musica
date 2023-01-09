import React, {useRef, useEffect, useState, useContext} from 'react'
import { Context } from '../Context'
import SideMenu from './SideMenu'
import Search from './Search'
import PlayMusic from './PlayMusic'
//import './_components.scss'

import { Outlet } from 'react-router-dom'

export default function Constant() {
  

  const {display, node} = useContext(Context)

  
  
 

  return (
    <>
        
        <SideMenu node={node} display={display}/>
        <PlayMusic />
        <Outlet />
    </>
  )
}
