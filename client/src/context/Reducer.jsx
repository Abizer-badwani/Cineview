
const userReducer = (state, action) => {

    switch (action.type) {
        case 'AUTH':
            return { ...state, ...action.payload }
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

const filterReducer = (state, action) => {

    switch (action.type) {
        case 'CATEGORY':
            return { ...state, categoryId: action.payload }
        case "RATE":
            return { ...state, rating: action.payload }
        case "SEARCH":
            return { ...state, searchQuery: action.payload }
        case 'RESET':
            return {...state, categoryId: 1, rating: 0, searchQuery: ''}
        default:
            return state
    }
}

const movieReducer = (state, action) => {
    switch (action.type) {
        case 'GET_ALL':
            return [...action.payload]
        default:
            return state
    }
}

const adminReducer = (state, action) => {
    switch (action.type) {
        case 'ADMIN_LOGIN':
            return {...action.payload}
        default:
            return state
        
    }
}

export {userReducer, filterReducer, movieReducer, adminReducer}