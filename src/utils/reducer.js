import { reducerCases } from "./Constants"

export const initialState = {
    token: null,
    playlists: [],
    user: null,
    selectedPlayListId: '2D2ee6S1rJMy5Hd7Jh8fla',
    selectedPlayList: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN:
            return { ...state, token: action.payload }
        case reducerCases.SET_PLAYLISTS:
            return { ...state, playlists: action.payload }
        case reducerCases.SET_USER:
            return { ...state, user: action.payload }
        case reducerCases.SET_PLAYLIST:
            return { ...state, selectedPlayList: action.payload }
        default:
            return state
    }
}

export default reducer