import { DIR_SET, DIR_CLEAR } from '../types';

export const set_DIR = (DIR) => (dispatch) => {
    console.log('DIR ARMED!\n'+DIR);
    dispatch({ type: DIR_SET, payload: DIR });
};

export const clear_DIR = () => (dispatch) => {
    console.log('DIR DISARMED!');
    dispatch({ type: DIR_CLEAR });
};