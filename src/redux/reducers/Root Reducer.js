import { combineReducers } from 'redux';
import DIR_Reducer from './DIR Reducer';
import ERROR_Reducer from './ERROR Reducer';
import PLAYLIST_Reducer from './PLAYLIST Reducer';
import PLAY_Reducer from './PLAY Reducer';

export default combineReducers({
    ERROR: ERROR_Reducer,
    DIR: DIR_Reducer,
    PLAY: PLAY_Reducer,
    PLAYLIST: PLAYLIST_Reducer,
});