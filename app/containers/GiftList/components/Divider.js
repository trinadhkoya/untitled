import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {color} from '../../../utilities';

class Divider extends PureComponent {
  render() {
    const {style} = this.props;
    return <View style={[styles.default, style]} />;
  }
}

Divider.propTypes = {
  style: PropTypes.instanceOf(PropTypes.array),
};

Divider.defaultProps = {
  style: null,
};
const styles = StyleSheet.create({
  default: {
    backgroundColor: color.whitesmoke,
    height: 1,
  },
});

export default Divider;
