import {BASE_URL, GIFFY_API_KEY} from '../constants';

function count(obj) {
  return Object.keys(obj).length;
}

/**
 * This is to handle get requests
 * @param type
 * @param api_name
 * @param parameters
 * @returns {Promise<any>}
 * @constructor
 */
const API_GET = (type, api_name, parameters) => {
  var str = '';
  for (let i = 0; i < count(parameters); i++) {
    var theKey = Object.keys(parameters)[i];
    str = `${str}&${theKey}=${parameters[theKey]}`;
  }
  str = `${str}&api_key=${GIFFY_API_KEY}`;
  str = str.toString().substr(1);

  return fetch(BASE_URL + api_name + '?' + str, {method: 'GET'})
    .then(response => {
      return response.json();
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(error);
    });
};
export default API_GET;
