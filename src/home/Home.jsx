import React, {useContext} from 'react'
import likes from './images/likes.webp'
import heart from './images/heart.svg'
import TopCharts from './TopCharts'
import vector from './images/topcharts/vector.svg'
import vectormobile from './images/topcharts/vectormobile.svg'
import NewReleases from './NewReleases'
import Popular from './Popular'
import { Context } from '../Context/Context'
import Search from '../components/Search'
export default function Home() {
  const {hamburger, loading} = useContext(Context)
  const style = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around'
  }
  return (
    <>
    <Search background={'#1D2123'} position={'fixed'} hamburger={hamburger}/>
    <div className="home">
      <section style={{alignItems: loading? 'flex-start': 'center'}} className='first-section'>
        <article>
          <img src={vector} alt="" className="vector" />
          <img src={vectormobile} alt="" className="vector-mobile" />
            <p className='first-text'>Curated playlist</p>
            <div style={style}>
              <h2>R & B Hits</h2>
              <p className='text'>All mine, Lie again, Petty call me everyday,<br />
                Out of time, No love, Bad habit,<br />
                and so much more
              </p>
              <div className='vertical'>
                <img src={likes} alt="likes" className="likes" />
                <img src={heart} alt="heart icon" className="heart" />
                <span>33k Likes</span>
              </div>

            </div>
          
          
        </article>
        <TopCharts />
      
        
      </section>

      
      <NewReleases />
      <Popular />
      

      <section className='third-section'>

      </section>

    </div>
    </>
  )
}
