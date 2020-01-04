import React, {PureComponent} from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import {color} from '../../../utilities';

class ProgressBar extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={20} color={color.black} />
        <Text>Loading</Text>
      </View>
    );
  }
}

ProgressBar.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgressBar;
