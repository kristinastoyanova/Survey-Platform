import FETCH_USER from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false;//if user is not logged in the payload will be empty string which is false
        default:
            return state;
    }
}