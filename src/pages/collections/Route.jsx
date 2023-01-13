import React, { useState, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Context } from '../../Context/Context'
import Search from '../../components/Search'
export default function CollectionRoute() {
  const [index, setIndex] = useState(1)
  const { hamburger } = useContext(Context)
  const handleClick = (val) => {
    setIndex(val)
  }
  const clickButton = (val) => {
    if( val == index) {
        return "clicked-btn "
    }
    return "unclicked-btn"
  }

  const textDecoration ={
    textDecoration: 'none',
   
   
    
  }

  
//className={clickButton(1)}
  return (
    <>
    <Search background={'#1D2123'} position={'fixed'} hamburger={hamburger}/>
    <div id="collection">
      <header>
        <Link to='/collection/'
          style={textDecoration} 

          onClick={() => handleClick(1)} 

          className={`route-btn ${clickButton(1)}`}>

          My collection

        </Link>

        <Link to="likes"
          style={textDecoration} 

          onClick={() => handleClick(2)} 

          className={`route-btn ${clickButton(2)}`}>

          Likes
        </Link>
      </header>
      <Outlet />
    </div>
    </>
  )
}
