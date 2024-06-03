import {combineReducers} from 'redux';
//importing parameters
import {CHANGE_VIEWPORT, startingViewPort} from '../constants';

const reduceMapViewport = (state = startingViewPort, action) => {
    switch (action.type) {
        case CHANGE_VIEWPORT:
            return {...state, ...action.payload};

        default: 
            return state;
    }
}

export default combineReducers({
        mapViewport: reduceMapViewport,
    });