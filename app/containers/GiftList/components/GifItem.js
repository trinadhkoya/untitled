import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import Image from 'react-native-image-progress';

class GifItem extends PureComponent {
  render() {
    const {item} = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.gifImgStyle}
          source={{
            uri: item.images.fixed_width_small_still.url,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    margin: 10,
  },
  gifImgStyle: {width: 100, height: 100},
  backgroundContainer: {
    width: null,
    height: null,
  },
});

GifItem.propTypes = {};

export default GifItem;
