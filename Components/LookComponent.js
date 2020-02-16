import React from 'react';
import { StyleSheet, Text,View, Image,TouchableOpacity } from 'react-native';
import call from 'react-native-phone-call';
import { SliderBox } from 'react-native-image-slider-box';
import config from '../Components/Config';

export default class LookComponent extends React.Component {

  render() {
    return (
            <TouchableOpacity style={{flex:1, paddingTop:8, paddingLeft:10, flexDirection:'row', paddingBottom:10,borderWidth:1,borderColor:'#e6e6e6' , backgroundColor:'#ffffff'}}
                onPress={() => this.props.navi( this.props.data.ro_name_col, this.props.data.ro_style_col)}>

              <View style={{flex:1,flexDirection:'column'}}>

                <View style={{flex:1,flexDirection:'column', justifyContent:'center'}}>
                  <Text style={{fontSize:config.deviceWidth*(1/22), fontWeight:'300',color:'#000000',paddingRight:5, fontWeight:'bold'}}>
                    {this.props.data.ro_name_col}
                  </Text>
                  <Text style={{fontSize:config.deviceWidth*(1/27), fontWeight:'300',color:'#000000',paddingRight:5, fontWeight: '500'}}>
                    {this.props.data.ro_style_col}
                  </Text>
                </View>
                
                <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
                    <View style={{paddingRight:5}}>
                        <Text style={{fontSize:config.deviceWidth*(1/33), fontWeight:'300',color:'#bfbfbf',paddingRight:5, fontWeight:'500'}}>
                            계약조건
                        </Text>
                        <Text style={{fontSize:config.deviceWidth*(1/33), fontWeight:'300',color:'#bfbfbf',paddingRight:5, fontWeight: '500'}}>
                            방 형태
                        </Text>
                        <Text style={{fontSize:config.deviceWidth*(1/33), fontWeight:'300',color:'#bfbfbf',paddingRight:5, fontWeight: '500'}}>
                            금   액
                        </Text>
                    </View>

                    <View>
                        <Text style={{fontSize:config.deviceWidth*(1/31), fontWeight:'300',color:'#000000',paddingRight:5, fontWeight:'500'}}>
                             {this.props.data.ro_con_col}
                        </Text>
                        <Text style={{fontSize:config.deviceWidth*(1/31), fontWeight:'300',color:'#000000',paddingRight:5, fontWeight: '500'}}>
                            {this.props.data.ro_size_col}
                        </Text>
                        <Text style={{fontSize:config.deviceWidth*(1/31), fontWeight:'300',color:'#000000',paddingRight:5, fontWeight: '500'}}>
                            {this.props.data.ro_price_col}만원 ...
                        </Text>
                    </View>
                  
                  
                </View>
                
              </View>

              <View style={{flex:1, justifyContent:'center', alignItems:'flex-end', paddingRight:8}}>
                <Image source={{uri : this.props.image}} style={{width:150, height:100}}/>
              </View>

            </TouchableOpacity> 
    );
  }
}