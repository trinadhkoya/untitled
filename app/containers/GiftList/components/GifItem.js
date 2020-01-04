import React, {PureComponent} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {screenWidth} from '../../../utilities';

class GifItem extends PureComponent {
  render() {
    const {item} = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.gifImgStyle}
          source={{
            uri: item.images.preview_webp.url,
          }}
        />
        <Text>{item.url}</Text>
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
  gifImgStyle: {width: screenWidth(), height: 100},
  backgroundContainer: {
    width: screenWidth(),
    height: null,
  },
});

GifItem.propTypes = {};

export default GifItem;
