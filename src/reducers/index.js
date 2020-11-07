import { combineReducers } from "redux";
import userReducer from './user.reducer';
import postReducer from './post.reducer';
import messageReducer from './message.reducer';
import braintreeReducer from './braintree.reducer';

const allReducers = combineReducers({
    userReducer,
    postReducer,
    messageReducer,
    braintreeReducer
});

export default allReducers;
