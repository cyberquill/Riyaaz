import { ERROR } from '../types';

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return action.payload;
            
        default:
            return state;
    }
}
