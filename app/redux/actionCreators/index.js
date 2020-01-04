import {TYPES} from '../actionTypes';
import {reduxHelper} from '../../utilities';

export const onRequestGifs = () => ({
  type: reduxHelper(TYPES.FETCH_GIFS).actionRequest,
});

export const onSuccessGIFs = data => ({
  type: reduxHelper(TYPES.FETCH_GIFS).actionSuccess,
  payload: data,
});

export const onFailureGIFs = error => ({
  type: reduxHelper(TYPES.FETCH_GIFS).actionFailure,
  error: error,
});
