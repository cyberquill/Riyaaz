import { DIR_SET, DIR_CLEAR } from '../types';

const initialState = {
    set: false,
    path: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DIR_SET:
            return {
                ...state,
                set: true,
                path: action.payload,
            };

        case DIR_CLEAR:
            return initialState;

        default:
            return state;
    }
}
