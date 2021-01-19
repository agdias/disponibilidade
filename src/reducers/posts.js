

export function postsReducer(state={}, action) {
    const { posts } = action
    switch (action.type) {
        case 'ADD_BULK_POSTS':
            return {
                ...state,
                ...posts              
                
            }
        default:
            return state
    }
}