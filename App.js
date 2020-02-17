import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import config from './Components/Config';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import RouteScreen from './Screens/RouteScreen';
import SelectionScreen from './Screens/SelectionScreen';
import MainFeedScreen from './Screens/MainFeedScreen';
import SelectScreen from './Screens/SelectScreen';


import LoginScreen from './Screens/LoginScreen';
import IdentifyScreen from './Screens/IdentifyScreen';
import LookatScreen from './Screens/LookatScreen';

import PostScreen from './Screens/PostScreen';
import RoomcentralScreen from './Screens/RoomcentralScreen';
import SaleinfoScreen from './Screens/SaleinfoScreen';
import SalePictureScreen from './Screens/SalePictureScreen';
import SaleAddinfoScreen from './Screens/SaleAddinfoScreen'


MIcon.loadFont();

const AppNavigator = createStackNavigator(
  {
    Route: {screen: RouteScreen, navigationOptions: ({ navigation }) => ({
      header: null,
    }), },
    Selection: {screen: SelectionScreen , navigationOptions: ({ navigation }) => ({
      header: null
    }), },
    Select: {screen: SelectScreen, navigationOptions: ({ navigation }) => ({
      header: null,
    }), },
    
    Login: {screen: LoginScreen, navigationOptions: ({ navigation }) => ({
      header: null
    }), },
    Roomcentral: {screen: RoomcentralScreen, navigationOptions: ({ navigation }) => ({
      header: null
    }), },
    Saleinfo: {screen: SaleinfoScreen, navigationOptions: ({ navigation }) => ({
      header: null
    }), },
    SalePicture: {screen: SalePictureScreen, navigationOptions: ({ navigation }) => ({
      header: null
    }), },
    SaleAddinfo: {screen: SaleAddinfoScreen, navigationOptions: ({ navigation }) => ({
      header: null
    }), },
    MainFeed: {screen: MainFeedScreen, navigationOptions: ({ navigation }) => ({
      header: null
    }), },
    Look : {screen: LookatScreen, navigationOptions: ({ navigation }) => ({
      header: null
    }), },
    Iden : {screen: IdentifyScreen, navigationOptions: ({ navigation }) => ({
      header: null
    }), },
    Post : {screen: PostScreen, navigationOptions: ({ navigation }) => ({
      header: null
    }), },
    
  },
  {
    initialRouteName: 'Route',
  }
);
export default createAppContainer(AppNavigator);