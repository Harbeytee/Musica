export default function addRemove() {
    const reducer2 = (state, action) => {
        switch (action.type) {
            case 'AddToLikes':
                return {
                    ...state,
                    message:'Added To Likes', 
                    displayMessage: true,
                    likes: [...state.likes, {...action.data}]
                }
            case 'AddToCollection':
                return {
                    ...state,
                    message:'Added To Collection', 
                    displayMessage: true,
                    collection: [...state.collection, {...action.data}]
                }    
            case 'RemoveFromLikes':
                return {
                    ...state, 
                    message:'Removed From Likes', 
                    displayMessage: true,
                    likes: state.likes.filter(item => item.id !== action.id)
                  }   
            case 'RemoveFromCollection':
                return {
                    ...state, 
                    message:'Removed From Collection', 
                    displayMessage: true,
                    likes: state.likes.filter(item => item.id !== action.id)
                    }   
            default:
                break;
        }
    }
  return {reducer2}
}
