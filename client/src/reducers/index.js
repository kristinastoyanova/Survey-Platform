import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer  from './surveysReducer';

export default combineReducers({
    auth: authReducer,
    form : reduxForm, //need to be called form
    surveys: surveysReducer
})