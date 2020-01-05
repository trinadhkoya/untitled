import React, {PureComponent} from 'react';
import {FlatList, TouchableOpacity, View,Image,Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {doFetchGIFs} from '../../network';
import GifItem from './components/GifItem';
import Divider from './components/Divider';
import styles from './GiftListScreen.styles';
import ProgressBar from './components/ProgressBar';

const pagingData = {};

class GifsListContainer extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            selectedItem: 0,

        };
        this.onEndReachedCalledDuringMomentum = true;
    }

    componentDidMount(): void {
        const {offset} = this.state;
        const {getGIFs} = this.props;
        pagingData.offset = offset;
        getGIFs(pagingData, false);
    }

    _renderItemSeparator = () => {
        return <Divider/>;
    };

    _renderFooter = () => {
        const {isLoading} = this.props;
        if (isLoading) {
            return <ProgressBar/>;
        } else {
            return <View/>;
        }
    };

    _onEndReached = () => {
        const {isLoading, getGIFs, payload} = this.props;
        const {offset} = this.state;
        if (isLoading === false && payload.length % 25 === 0 && payload.length !== 0) {
            pagingData.offset = offset + 25;
            getGIFs(pagingData, true);
            this.setState({offset: offset + 25})
        }
    };

    onPressAction = (rowItem) => {
        console.log('ListItem was selected');
        console.dir(rowItem);
        this.setState({
            selectedItem: rowItem.id
        });
    };

    _renderGridItem = (item) => {

        const isSelectedUser = this.state.selectedItem === item.id;
        const viewStyle = isSelectedUser ? styles.selectedButton : styles.normalButton;

        return(
            <TouchableOpacity  onPress={() => this.onPressAction(item)} >
               <GifItem item={item} onPressItem={null} isSelectedUser={isSelectedUser}  />
            </TouchableOpacity>
        );
    };

    render() {
        const {payload} = this.props;

        return (
            <View style={styles.mainContainer}>
                <FlatList
                    initialNumToRender={3}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                    data={payload}
                    numColumns={2}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => this._renderGridItem(item)}
                    ItemSeparatorComponent={this._renderItemSeparator}
                    legacyImplementation={true}
                    ListFooterComponent={this._renderFooter}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.2}
                />
            </View>
        );
    }
}

GifsListContainer.propTypes = {
    getGIFs: PropTypes.func,
    isLoading: PropTypes.bool,
    payload: PropTypes.instanceOf(Array),
    error: PropTypes.string,
    pagination: PropTypes.shape({
        total_count: PropTypes.number,
        count: PropTypes.number,
        offset: PropTypes.number,
    }),
};

GifsListContainer.defaultProps = {
    getGIFs: () => {
    },
    isLoading: false,
    payload: [],
    error: '',
    pagination: {},
};

const mapStateToProps = state => ({
    isLoading: state.gifs.isLoading,
    payload: state.gifs.gifs,
    error: state.gifs.error,
    pagination: state.gifs.pagination,
});

const mapDispatchToProps = dispatch => ({
    getGIFs: (pagingParam, lazyLoad) =>
        dispatch(doFetchGIFs(pagingParam, lazyLoad)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GifsListContainer);
