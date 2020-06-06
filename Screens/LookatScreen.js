import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native';
import CardComponent from "../Components/CardComponent";
import config from '../Components/Config';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header } from 'react-native-elements'

MIcon.loadFont();

const { url } = config;
export default class LookatScreen extends React.Component{
  static navigationOptions = {
    header:null
  }

constructor(props) {
  super(props);

  this.name = "";
  this.style = "";
  this.table = null;

  this.state = {
    // db에서 받아온 json 데이터 배열
    data: [],
    isLoading: false,
    images: [],
  }
}

// 서버와 이미지 데이터 통신
async getImageData() {
  try {
    const data = await fetch(`${url}/photos/${this.name}/${this.style}`);
    const processed_data = await data.json();
    return processed_data;
  } catch (err) {
    console.log(err);
  }
}

// 서버와 DB 데이터 통신
async getData() {

  let image_list = [];
  try {
    const data = await fetch(`${url}/lookat/${this.table}/'${this.name}'/'${this.style}'`);
    const processed_data = await data.json();

    // 이미지 데이터 배열화 통신
    image_list.push( await this.getImageData() );
    console.log(processed_data);

    this.setState({
      data: processed_data,
      images: image_list,
      isLoading: true
    })

  } catch (err) {
    console.log(err);
  }
}

// 첫 컴포넌트 마운트 이후 서버와 통신
componentDidMount = async () => {
  this.name =  await this.props.navigation.getParam('name', 'default value');
  this.style = await this.props.navigation.getParam('style', 'default value');
  this.table = await this.props.navigation.getParam('table', 'NO-ID');

  this.getData();
}

_naviga = (long, lat) => {
  this.props.navigation.navigate('Map', {latitude:lat, longitude:long});
}

render() {
  
  return (
    this.state.isLoading ? (
    <View style={{paddingBottom:config.deviceHeight*(1/9)}}>
      <Header 
        statusBarProps={{barStyle:'dark-content', translucent:true}}
        leftComponent={ <MIcon
          name="arrow-left-circle"
          size={config.deviceWidth * (1 / 9)}
          color={'#3e3938'}
          onPress={() => this.props.navigation.goBack()}/> }
          centerComponent={{text:'매물 정보', style:{fontWeight: "bold",color: "#000000",fontSize: 18} }}
          containerStyle={{
          backgroundColor: '#ffffff',
          borderBottomWidth:0,
          justifyContent: 'space-around'}}
      />
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        paddingStart: 7,
        paddingEnd: 7,
        width: "100%"
      }}>
        
      


      <CardComponent
        data={this.state.data[0]}
        images={this.state.images[0]}
        navi={this._naviga}
        table={this.table} />
      


    </ScrollView>
    </View>
    ) : 
    (
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <View stlye={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <View style={{flex:1}} />
          <Image source={require('../Images/searching.gif')} style={{height:config.deviceHeight*(1/2),width:config.deviceWidth*(1/2), resizeMode:'contain'}}/> 
          <View style={{flex:1}} />
        </View>
      </View>
    )


    );
  }
}
