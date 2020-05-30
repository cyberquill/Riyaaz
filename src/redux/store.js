import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import rootReducer from './reducers/Root Reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};


const pReducer = persistReducer(persistConfig, rootReducer);
const initialState = {};
const middleware_arr = applyMiddleware(thunk);
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
const middlewares = compose(middleware_arr, devTools);


export const store = createStore(pReducer, initialState, middlewares);
export const persistor = persistStore(store);
