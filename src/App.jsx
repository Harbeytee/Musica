import React from 'react'
import Constant from './components/Constant'
import Provider from './Context/Context'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home/Home'
//import TopCharts from './home/TopCharts'
import CollectionRoute from './collections/Route'
import MyCollection from './collections/MyCollection'
import Likes from './collections/Likes'
import ChartDetail from './home/ViewChart/ChartDetail'
import SearchResults from './SearchResults/SearchResults'
import './App.scss'

function App() {
  

  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Constant />}>
            <Route index element={<Home />} />
            <Route path="topchart/:id" element={<ChartDetail />} />
            <Route path="collection" element ={<CollectionRoute />}>
              <Route index element={<MyCollection />} />
              <Route path='likes' element={<Likes />} />
              
            </Route>
            <Route path='searchresults/' element={<SearchResults />} />
            

          </Route>
        </Routes>
      </Router>
      
    </Provider>
    
  )
}

export default React.memo(App)
