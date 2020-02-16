import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
  View
} from 'react-native';
import config from './Config'

export default class Loader extends Component{
    
    
    constructor(props){
        super(props);
    }
  
    render() {
      const {maintext, load} = this.props;
      return (
        <Modal
          transparent={true}
          animationType={'none'}
          visible={load}
        >
          <View style={{width:'100%', height:'100%',alignItems: 'center',justifyContent:'space-around',backgroundColor: 'rgba(0,0,0,0.5)'}}>

            <View 
              style={{
                backgroundColor:'#ffffff', 
                flexDirection:'row', 
                alignItems:'center', 
                justifyContent:'flex-start',
                height:config.deviceHeight*(1/9),
                width:config.deviceWidth*(3/4),
                borderRadius:5}}>

              <ActivityIndicator size={config.deviceWidth*(1/10)} color='#ff7b62' style={{marginLeft:config.deviceWidth*(1/15)}}/>
              <Text style={{marginLeft:config.deviceWidth*(1/15) ,fontSize: config.deviceWidth*(1/27), color:'#000000'}}>{maintext}</Text>
              
            </View>
          </View>

        </Modal>
      )
    }
}