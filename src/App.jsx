import React from 'react'
import Constant from './components/Constant'
import Provider from './Context/Context'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
//import TopCharts from './home/TopCharts'
import CollectionRoute from './pages/collections/Route'
import MyCollection from './pages/collections/MyCollection'
import Likes from './pages/collections/Likes'
import ChartDetail from './pages/home/ViewChart/ChartDetail'
import SearchResults from './pages/SearchResults/SearchResults'
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
