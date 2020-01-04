import {Dimensions} from 'react-native';

const reduxHelper = actionName => {
  if (typeof actionName !== 'string') {
    throw new Error('actionName must be a string');
  }
  var actionNameUpper = actionName.toUpperCase();
  var actionRequest = actionNameUpper + '_REQUEST';
  var actionSuccess = actionNameUpper + '_SUCCESS';
  var actionFailure = actionNameUpper + '_FAILURE';
  let actionTypes;
  return (actionTypes = {
    actionRequest: actionRequest,
    actionSuccess: actionSuccess,
    actionFailure: actionFailure,
  });
};

const localAssets = {
  fav_img: require('./assets/images/favourited.png'),
  un_fav_img: require('./assets/images/unfavourited.png'),
};

function screenHeight() {
  return Dimensions.get('window').height;
}

function screenWidth() {
  return Dimensions.get('window').width;
}

const color = {
  white: '#ffffff',
  orange: '#ff8800',
  whitesmoke: '#f4f4f4',
  black: '#000000',
};

export {reduxHelper, screenHeight, screenWidth, color, localAssets};
