import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import config from './Config'

export default class MyButton extends Component{
    static defaultProps = {
        title: 'untitled',
        titleSize: 20,
        buttonColor: '#ffffff',
        onPress: () => null,
      }
    
      constructor(props){
        super(props);
      }
  
    render() {
      const {title, titleSize, buttonColor, titleColor} = this.props;
      return (
        <TouchableOpacity 
          style={[styles.button, {backgroundColor:buttonColor}]}
          onPress={this.props.onPress}>
            <Text style={[
              styles.title,
              {color: titleColor, fontSize: titleSize, fontWeight:'bold'}
            ]}>{title}</Text>
        </TouchableOpacity>
      )
    }
  }
  
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'white',
      width: config.deviceWidth*(5/6),
      height: config.deviceHeight*(1/8),
      marginVertical: 10,
      //shadowColor : 'rgba(256,256,256,1)',
      //shadowOpacity:0.5,
      //shadowRadius:15,
      //shadowOffset: {width:1, height:15},
      elevation:10
    },
    title: {
      fontSize: 20,
    },
  });