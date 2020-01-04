import {TYPES} from '../actionTypes';
import _ from 'lodash';
import {reduxHelper} from '../../utilities';

const defaultState = {
  isLoading: false,
  error: null,
  pagination: {},
  gifs: [],
};

const gifsReducer = (state = defaultState, action) => {
  const {payload, error, lazyLoad} = action;
  switch (action.type) {
    case reduxHelper(TYPES.FETCH_GIFS).actionRequest:
      return {...state, isLoading: true};
    case reduxHelper(TYPES.FETCH_GIFS).actionSuccess:
      if (lazyLoad === true) {
        return {
          ...state,
          isLoading: false,
          gifs: !_.isEmpty(payload.data)
            ? [...state.gifs, ...payload.data]
            : [],
          pagination: !_.isEmpty(payload.pagination)
            ? payload.pagination
            : null,
        };
      } else {
        return {
          ...state,
          isLoading: false,
          gifs: !_.isEmpty(payload.data) ? payload.data : [],
          pagination: !_.isEmpty(payload.pagination)
            ? payload.pagination
            : null,
        };
      }
    case reduxHelper(TYPES.FETCH_GIFS).actionFailure:
      return {...state, isLoading: false, error: error};
    default:
      return state;
  }
};
export default gifsReducer;
