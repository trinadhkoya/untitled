import React, {PureComponent} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {doFetchGIFs} from '../../network';
import GifItem from './components/GifItem';
import Divider from './components/Divider';
import ProgressBar from './components/ProgressBar';
import checkInetConnection from '../../HOCs/checkInetConnection';
import styles from './GiftListScreen.styles';

const pagingData = {};

class GifsListScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {limit: 30, offset: 0};
  }

  componentDidMount(): void {
    const {limit, offset} = this.state;
    const {getGIFs} = this.props;
    pagingData.limit = limit;
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

  _onEndReached = () => {
    const {isLoading, getGIFs, payload} = this.props;
    const {limit, offset} = this.state;
    if (!this.onEndReachedCalledDuringMomentum) {
      if (isLoading === false && payload.length !== 0) {
        console.log('Called');
        getGIFs(pagingData, true);
        this.setState({
          offset: offset + 30,
          limit: limit,
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
          keyExtractor={item => item.id.toString()}
          renderItem={this._renderGridItem}
          ItemSeparatorComponent={this._renderItemSeparator}
          extraData={this.state}
          onEndReachedThreshold={0.7}
          onMomentumScrollEnd={this._onEndReached}
          ListFooterComponent={this._renderFooter}
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
)(checkInetConnection(GifsListScreen));
