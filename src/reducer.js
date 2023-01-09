/*const reducer = (state, action) => {
    switch(action.type) {
        case 'TRACKS':
            localStorage.setItem('tracks', JSON.stringify(action.data.tracks.data.map(track => {
                return {...state, isFavorite: false}
              })))
            
            setTracks(action.data.tracks.data.map(track => 
                {
                    return {...state, isFavorite: false}
            }))
        case 'PLAYLIST':
            localStorage.setItem('playlist', JSON.stringify(action.data.playlists.data.filter((res, index) => index < 3).map(playlist => {
                return {...state, isFavorite: false}
              })))
            setPlaylist(res.data.playlists.data.filter((res, index) => index < 3).map(playlist => {
                return {...state, isFavorite: false}
            }))
    }

}*/

export default reducer