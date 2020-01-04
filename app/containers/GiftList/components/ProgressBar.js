import React, {PureComponent} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {color} from '../../../utilities';

class ProgressBar extends PureComponent {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={20} color={color.black} />
      </View>
    );
  }
}

ProgressBar.propTypes = {};

export default ProgressBar;
