import {
    PLAY_SET,
    PLAY_CLEAR,
    PLAY_SET_PLAYING,
    PLAY_SET_VOLUME,
    PLAY_SET_STATE,
    PLAY_TOGGLE_STATE,
    PLAY_GOTO_NEXT,
    PLAY_GOTO_PREV,
} from '../types';

const initialState = {
    set: false,
    is_playing: false,
    playing: null,
    shuffle: false,
    volume: 100,
    queue: [],
};

Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PLAY_SET:
            return {
                ...state,
                ...action.payload,
                set: true,
                playing: 0,
                is_playing: true,
            };

        case PLAY_SET_PLAYING:
            return {
                ...state,
                playing: action.payload,
                is_playing: true,
            };

        case PLAY_SET_PLAYING:
            return {
                ...state,
                volume: action.payload,
            };

        case PLAY_SET_STATE:
            return {
                ...state,
                is_playing: action.payload,
            };

        case PLAY_TOGGLE_STATE:
            return {
                ...state,
                is_playing: !state.is_playing,
            };

        case PLAY_GOTO_PREV:
            return {
                ...state,
                playing: (state.playing - 1).mod(state.queue.songs.length),
                is_playing: true,
            };

        case PLAY_GOTO_NEXT:
            return {
                ...state,
                playing: (state.playing + 1).mod(state.queue.songs.length),
                is_playing: true,
            };

        case PLAY_CLEAR:
            return initialState;

        default:
            return state;
    }
}
