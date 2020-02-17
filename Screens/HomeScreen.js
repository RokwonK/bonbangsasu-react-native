import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import config from '../Components/Config';

const basicColor = '#6600CC';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Image style={{height:config.deviceHeight*(1/2),width:config.deviceWidth*(1/2),resizeMode:'contain'}}
          source={require('../Images/login.png')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
    justifyContent:'center',
    alignItems:'center'
  },
  
});
