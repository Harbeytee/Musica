export default function musicPlayer() {
    

    const reducer = (state, action ) => {
        switch (action.type) {
            case 'ChangeMusic':
                return {
                    ...state,
                    music: action.data,
                    musicTracks: action.data.map(track => track.preview),
                    trackIndex: action.value
                }
            case 'PopularTracks':
                return {
                    ...state, 
                    popularTracks: action.data
                }
            case 'Tracks':
                return {
                    ...state, 
                    tracks: action.data.map(track => ({...track, isFavorite: false})),
                    music: action.data,
                    musicTracks: action.data.map(music => music.preview),
                    loading: false,
                
                    }
            case 'Playlist':
                return {
                    ...state,
                    playlist: action.data
                  }
            case 'Collection':
                return {
                    ...state,
                    collection: action.data
                    }
            case 'ChangeTrackIndex': 
                  return {
                    ...state,
                    trackIndex: action.index
                  }
            default:
                return state;
        }
        
    }

  return { reducer }
}



