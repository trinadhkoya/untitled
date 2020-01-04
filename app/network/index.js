import {
  onFailureGIFs,
  onRequestGifs,
  onSuccessGIFs,
} from '../redux/actionCreators';
import API_GET from './APIClient';
import {BASE_URL, TRENDING_HANLDE} from '../constants';

/**
 * List out all the trending API's
 * @param req
 * @returns {function(...[*]=)}
 */
const doFetchGIFs = req => async dispatch => {
  dispatch(onRequestGifs());

  try {
    await API_GET(BASE_URL, TRENDING_HANLDE, req)
      .then(res => {
        console.log(res);
        dispatch(onSuccessGIFs(res));
      })
      .catch(err => {
        dispatch(onFailureGIFs(err));
      });
  } catch (e) {
    console.log(e);
    dispatch(onFailureGIFs(e.toString()));
  }
};

export {doFetchGIFs};
