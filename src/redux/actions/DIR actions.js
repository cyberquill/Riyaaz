import { DIR_SET, DIR_CLEAR, PLAYLISTS_CLEAR, PLAY_CLEAR } from '../types';

export const set_DIR = (DIR) => (dispatch) => {
    dispatch({ type: DIR_SET, payload: DIR });
};

export const clear_DIR = () => (dispatch) => {
    dispatch({ type: DIR_CLEAR });
    dispatch({ type: PLAYLISTS_CLEAR });
    dispatch({ type: PLAY_CLEAR });
};