import {combineReducers} from 'redux';
import gifsReducer from './gifsReducer';

const appReducer = combineReducers({
  gifs: gifsReducer,
});

export default appReducer;
