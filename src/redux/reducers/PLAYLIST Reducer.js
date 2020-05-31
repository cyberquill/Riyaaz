import {
    PLAYLISTS_LOAD,
    PLAYLISTS_SAMPLE,
    PLAYLISTS_VISITED,
    PLAYLISTS_UPDATE,
    PLAYLISTS_CLEAR,
} from '../types';

const initialState = {
    K: null,
    Np: null,
    gamma: null,
    nSession: 0,
    cluster: [],
    playlist: [],
    display: [],
    visited: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PLAYLISTS_LOAD:
            return {
                ...state,
                ...action.payload,
            };

        case PLAYLISTS_SAMPLE:
            return {
                ...state,
                display: action.payload,
            };

        case PLAYLISTS_VISITED:
            const { visited } = state;
            visited[action.payload] = 1;
            return {
                ...state,
                visited,
            };

        case PLAYLISTS_UPDATE:
            return {
                ...state,
                ...action.payload,
                nSession: state.nSession+1,
            };

        case PLAYLISTS_CLEAR:
            return initialState;

        default:
            return state;
    }
}
