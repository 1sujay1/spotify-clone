import { reducerCases } from "./Constants"

export const initialState = {
    token: null,
    playlists: [],
    user: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN:
            return { ...state, token: action.payload }
        case reducerCases.SET_PLAYLISTS:
            return { ...state, playlists: action.payload }
        case reducerCases.SET_USER:
            return { ...state, user: action.payload }
        default:
            return state
    }
}

export default reducer