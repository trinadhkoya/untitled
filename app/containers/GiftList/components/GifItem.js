import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Image from 'react-native-image-progress';
import PropTypes from 'prop-types';
import {color, screenWidth} from "../../../utilities";




class GifItem extends Component {
    render() {
        const {item, isSelectedUser, viewStyle} = this.props;
        return (

            <View style={styles.listItemContainer}>
                <View>
                    <Image source={{ uri: item.images.fixed_width_small_still.url}} style={styles.gifImgStyle} />
                </View>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-start',justifyContent:'space-between'}}>
                        {isSelectedUser?<Text style={viewStyle}>👍️</Text>:<Text style={viewStyle}>👎</Text>}
                    </View>
                </View>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: color.whitesmoke,
        marginHorizontal: 10
    },
    gifImgStyle: {
        width: screenWidth()*0.45,
        height: screenWidth()*0.25,
        margin: 10,
        borderRadius: 10,
    },
    selectedButton: {
        backgroundColor: 'lightgray',
    },
    normalButton: {
        backgroundColor: 'white',
    },
    backgroundContainer: {},
    tvGifyCreator:{
        fontSize:14,
        color:color.black
    }

});

GifItem.propTypes = {
    onPressItem: PropTypes.func.isRequired,
    isSelectedUser:PropTypes.bool.isRequired,
    viewStyle:PropTypes.object.isRequired
};

export default GifItem;
