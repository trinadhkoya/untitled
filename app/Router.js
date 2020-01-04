import React from 'react';
import {Text, View} from 'react-native';
import GifsListScreen from './containers/GiftList/GifsListScreen';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: GifsListScreen,
  Settings: SettingsScreen,
});

export default createAppContainer(TabNavigator);
