import { reducerCases } from "./Constants"

export const initialState = {
    token: null,
    playlists: [],
    user: null,
    selectedPlayListId: '2D2ee6S1rJMy5Hd7Jh8fla',
    selectedPlayList: null,
    currentlyPlaying: null,
    playerState: false
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
        case reducerCases.SET_PLAYING:
            return { ...state, currentlyPlaying: action.payload }
        case reducerCases.SET_PLAYER_STATE:
            return { ...state, playerState: action.payload }
        case reducerCases.SET_PLAYLIST_ID:
            return { ...state, selectedPlayListId: action.payload }
        default:
            return state
    }
}

export default reducer