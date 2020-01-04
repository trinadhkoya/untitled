/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';
import GifsListScreen from './app/containers/GiftList/GifsListScreen';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import appReducer from './app/redux/reducer';

let store = createStore(appReducer, applyMiddleware(thunk));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <GifsListScreen />
      </Provider>
    );
  }
}

export default App;
