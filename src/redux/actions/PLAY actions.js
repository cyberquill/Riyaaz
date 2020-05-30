import {
    PLAY_CLEAR,
    PLAY_SET_PLAYING,
    PLAY_SET_VOLUME,
    PLAY_SET_STATE,
    PLAY_TOGGLE_STATE,
    PLAY_GOTO_NEXT,
    PLAY_GOTO_PREV,
} from '../types';

export const clear_queue = () => (dispatch, getState) => {
    dispatch({ type: PLAY_CLEAR });
};

export const set_playing = (selected) => (dispatch, getState) => {
    dispatch({ type: PLAY_SET_PLAYING, payload: selected });
};

export const set_volume = (volume) => (dispatch, getState) => {
    dispatch({ type: PLAY_SET_VOLUME, payload: volume });
};

export const set_playing_state = (is_playing) => (dispatch, getState) => {
    dispatch({ type: PLAY_SET_STATE, payload: is_playing });
};

export const toggle_playing_state = () => (dispatch, getState) => {
    dispatch({ type: PLAY_TOGGLE_STATE });
};

export const goto_prev = () => (dispatch, getState) => {
    dispatch({ type: PLAY_GOTO_PREV });
};

export const goto_next = () => (dispatch, getState) => {
    dispatch({ type: PLAY_GOTO_NEXT });
};
