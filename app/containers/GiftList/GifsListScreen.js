import React, {PureComponent} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {doFetchGIFs} from '../../network';
import GifItem from './components/GifItem';
import Divider from './components/Divider';
import ProgressBar from './components/ProgressBar';
import styles from './GiftListScreen.styles';
import _ from 'lodash';
const pagingData = {};

class GifsListScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {offset: 0};
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount(): void {
    const {offset} = this.state;
    const {getGIFs} = this.props;
    pagingData.offset = offset;
    getGIFs(pagingData, false);
  }

  _renderItemSeparator = () => {
    return <Divider />;
  };

  _renderFooter = () => {
    const {isLoading} = this.props;
    if (isLoading) {
      return <ProgressBar />;
    } else {
      return <View />;
    }
  };

  _onEndReached = ({distanceFromEnd}) => {
    const {isLoading, getGIFs, payload} = this.props;
    const {offset} = this.state;
    if (!this.onEndReachedCalledDuringMomentum) {
      if (
        isLoading === false &&
        payload.length % 25 === 0 &&
        payload.length !== 0
      ) {
        pagingData.offset = offset + 25;
        getGIFs(pagingData, true);
        this.setState({
          offset: offset + 25,
        });
      }
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  _renderGridItem = ({item}) => {
    return <GifItem item={item} />;
  };

  render() {
    const {isLoading, payload} = this.props;

    if (isLoading) {
      return <ProgressBar />;
    }

    return (
      <View style={styles.mainContainer}>
        <FlatList
          initialNumToRender={3}
          contentContainerStyle={{paddingHorizontal: 5}}
          showsVerticalScrollIndicator={false}
          data={payload}
          keyExtractor={item => item.id + ''}
          renderItem={this._renderGridItem}
          ItemSeparatorComponent={this._renderItemSeparator}
          extraData={this.state}
          legacyImplementation={true}
          ListFooterComponent={this._renderFooter}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.7}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
        />
      </View>
    );
  }
}

GifsListScreen.propTypes = {
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

GifsListScreen.defaultProps = {
  getGIFs: () => {},
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
)(GifsListScreen);
