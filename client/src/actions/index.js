import axios from 'axios';
import FETCH_USER from './types';

export const fetchUser = () =>
    //ReduxThunk will automatically call functions inside action creators with dispatch
    //(dispatch) => {
    //    axios
    //    .get('/api/current_user')
    //    .then(res => dispatch({type: FETCH_USER, payload: res}));
    //
    //};

async dispatch => {
        const res = await axios.get('/api/current_user');
        dispatch({type: FETCH_USER, payload: res.data});
};

export const handleToken = (token) => async dispatch => {
        const res = await axios.post('/api/stripe', token);
        dispatch({type: FETCH_USER, payload: res.data});
}