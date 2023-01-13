import React, {useContext} from 'react'
import Search from '../../components/Search.jsx'
import { Context } from '../../Context/Context.jsx'
import spinner from '../../assets/spinner.gif'
import { useNavigate } from 'react-router-dom'
import convert from '../../hooks/useConvert.js'
import './searchResults.scss'
import useHover from '../collections/useHover.js'
import play from '../../assets/collection/play.svg'
import { useEffect } from 'react'
export default function SearchResults() {
    const { state, hamburger, dispatch } = useContext(Context)
    //const { convert }  = useConvert()
    //const [index, setindex] = useState('')
    const {collection2, setindex, hoverOn, hoverOff} = useHover(state.searchResults)
    const navigate = useNavigate()
    useEffect(() => {
        if(state.searching === false && state.searchResults.length === 0 ) {
            navigate('/')
        }
    }, [state.searchResults, state.searching])
    
    useEffect(() => {
        console.log(state.searchResults)
        console.log(state.searching)
    }, [state.searchResults, state.searching])
    return (
        <div>
            <Search hamburger={hamburger}/>
            {
            state.searchResults === undefined || state.searchResults.length == 0 || state.searching
            ?
            <div style={{backgrounColor: 'white', display: 'grid', placeItems: 'center', paddingTop: '5rem'}}>
                <img className='spinner2'  src={spinner} alt="" />
            </div>
            :
            <div style={{animation: 'fadein 0.3s linear'}} className="grid-2">
                <div className="adventure-grid">
                    {collection2.map((card, index) => (
                    <div style={{color: 'white'}} key={card.id} onMouseOver={() => {setindex(index); hoverOn(index)}} onMouseOut ={() => {setindex(index); hoverOff(index)}} className='card-container' >
                        <div className='card-img-container' style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.8)),url(${card.album.cover_medium})`}} >
                        
                        
                        </div>
                        
                        <div className="third-layer">
                        <div className='card'>
                            <h2>{card.title}</h2>
                            
                            <p className='artist-name'>{card.artist.name}</p>
                            <p style={{marginBottom: card.hovered? '0px' : '-43.5px', transition: 'all 0.4s ease-out'}} className="hid" >{convert(card.duration)}</p>
                            
                            
                        </div>
                        <img onClick={() => dispatch({type: 'ChangeMusic', data: collection2, value: index})} 
                        style={{animation: card.hovered? 'fadein 0.4s linear' : 'fadeout 0.4s linear', visibility: card.hovered? 'visible' : 'hidden'}} src={play} alt="play icon" className="play" />
                        
                        </div>
                    
                    
                    </div>
                    ))}
                </div>
            </div>
        }
        </div>
    )
}

