import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../Components/Config';
import Toast from 'react-native-root-toast';
import { Header } from 'react-native-elements'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LookComponent_New from "../Components/LookComponent_New";
import IIcon from 'react-native-vector-icons/Ionicons';
import Loader from '../Components/Loader';

MIcon.loadFont();
IIcon.loadFont();

const url = 'https://bonbangsasu.com';

export default class IdentifyScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoading : false,
      pd_callnum_col: "",
      pd_table_col : "",
      pd_hash_col : "",

      sales : [],

      data : [],
      images : [],
      length : 0,
      loaderLoading:false

    }
    this.salesfetch();
  }

  // 서버와 이미지 데이터 통신
  async getImageData(ro_name_col, ro_style_col) {
    try {
      const data = await fetch(`${url}/photo/${ro_name_col}/${ro_style_col}`);
      const processed_data = await data.json();

      return processed_data;
    } catch (err) {
      console.log(err);
    }
  }

  salesfetch = async () => {
    
    this.setState({pd_callnum_col : await AsyncStorage.getItem('pd_callnum_col')});
    this.setState({pd_table_col : await AsyncStorage.getItem('pd_table_col')});
    this.setState({pd_hash_col : await AsyncStorage.getItem('pd_hash_col')});


    let image_list = [];

    try {
      const data = await fetch(`${url}/search/${this.state.pd_table_col}/${this.state.pd_callnum_col}`);
      const processed_data = await data.json();

      // 이미지 데이터 배열화 통신
      for (let i = 0; i < processed_data.length; i++) {
        this.state.data.push(processed_data[i]);
        this.state.images.push(
          await this.getImageData(
            processed_data[i].ro_name_col,
            processed_data[i].ro_style_col
          )
        );
      }

      this.setState({
        data: this.state.data,
        images: this.state.images,
        isLoading: true
      });

      this.setState({ length: this.state.data.length });
    } catch (err) {
      console.log(err);
    }
  }

  deleteconfirm = (index) => {
    Alert.alert(
      '',
      '방을 삭제하시겠습니까?',
      [
          {text:'확인', onPress: () => this.deleteroom(index) },
          {text:'취소', style: 'cancel'}
      ],
      {cancelable: true}
    );

  }


/*삭제  pd_table_col, pd_callnum_col, ro_name_col, ro_style_col*/
  deleteroom = async (index) => {
    this.setState({loaderLoading : true});

    const data = {
      pd_table_col:this.state.pd_table_col,
      pd_callnum_col:this.state.pd_callnum_col,
      pd_hash_col:this.state.pd_hash_col,
      ro_name_col:this.state.data[index].ro_name_col,
      ro_style_col:this.state.data[index].ro_style_col,
    }


    const realdata = {
      method: 'POST',
      body : JSON.stringify(data),
      headers : {
          //'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    }

    try {
      await fetch(`${url}/delload`,realdata)
    }
    catch(e) {
      this.setState({loaderLoading:false});
      Toast.show('방 삭제 중 오류가 발생했습니다.', {
        duration: 3000,
        position: Toast.positions.BOTTOM,   // 토스트 그림자 설정
        shadow: true,  // 토스트 켜지고 꺼질때 fade 설정
        animation: true,    // 토스트 터치시 사라지는 설정
        hideOnPress: true,
        delay: 0,
      });

      console.log(e);
      return;
    }

    Toast.show('방이 정상적으로 삭제되었습니다!', {
      duration: 3000,
      position: Toast.positions.BOTTOM,   // 토스트 그림자 설정
      shadow: true,  // 토스트 켜지고 꺼질때 fade 설정
      animation: true,    // 토스트 터치시 사라지는 설정
      hideOnPress: true,
      delay: 0,
    });

    this.state.data.splice(index, 1);
    this.setState({data : this.state.data, loaderLoading:false});

  }

  _naviga = (real_name, real_style) => {
    this.props.navigation.navigate("Look", {
      name: real_name,
      style: real_style,
      table: this.state.pd_table_col === "ho_data_tb" ? 1 : 0
    });
  };


  

  render() {
    
      if(this.state.isLoading === true && this.state.data[0]) {
        return(
        <ScrollView>
          <Header 
            statusBarProps={{barStyle:'dark-content', translucent:true}}
            leftComponent={ <MIcon
              name="arrow-left-circle"
              size={config.deviceWidth * (1 / 9)}
              color={'#3e3938'}
              onPress={() => this.props.navigation.goBack()}/> }
            centerComponent={{text:'매물 확인', style:{fontWeight: "bold",color: "#000000",fontSize: 18} }}
            containerStyle={{
                backgroundColor: '#ffffff',
                borderBottomWidth:0,
                justifyContent: 'space-around'}}
          />
          <Loader maintext='매물을 삭제하는 중입니다' load={this.state.loaderLoading}/>

          {
            this.state.data.map( (data,index) => 
            <View style={{paddingTop:config.deviceWidth*(1/27),paddingBottom:config.deviceWidth*(1/40)}}>
              <View style={{flexDirection:'row'}}>
                <View style={{width:'85%'}}>
                  <LookComponent_New
                    data={data}
                    key={index}
                    image={this.state.images[index][0]}
                    navi={this._naviga}
                    num={0}
                  />
                </View>
                
                <View style={{justifyContent:'center', alignItems:'center', width:'20%'}}>
                  <TouchableOpacity
                    style={s.button}
                    onPress={() => this.deleteconfirm(index)}>
                    <IIcon name='ios-close-circle' size={config.deviceWidth*(1/10)} color='#ff7b62'/>
                  </TouchableOpacity>
                </View>
              </View>
            </View> 
            )
          }
        </ScrollView>
        )
      }
      else if(this.state.isLoading === false) {
        return(
          <View style={{flex:1}}>
            <Header 
              statusBarProps={{barStyle:'dark-content', translucent:true}}
              leftComponent={ <MIcon
                name="arrow-left-circle"
                size={config.deviceWidth * (1 / 9)}
                color={'#3e3938'}
                onPress={() => this.props.navigation.goBack()}/> }
              centerComponent={{text:'매물 확인', style:{fontWeight: "bold",color: "#000000",fontSize: 18} }}
              containerStyle={{
                  backgroundColor: '#ffffff',
                  borderBottomWidth:0,
                  justifyContent: 'space-around'}}
            />
            <View style={{flex : 1,justifyContent:'center', alignItems:'center'}}>
              <Image source={require('../Images/searching.gif')} style={{height:config.deviceHeight*(1/2),width:config.deviceWidth*(1/2), resizeMode:'contain'}}/> 
            </View>
          </View>
        )
        
  
      }
      else {
        return (
          <View style={{flex:1}}>
            <Header 
              statusBarProps={{barStyle:'dark-content', translucent:true}}
              leftComponent={ <MIcon
                name="arrow-left-circle"
                size={config.deviceWidth * (1 / 9)}
                color={'#3e3938'}
                onPress={() => this.props.navigation.goBack()}/> }
              centerComponent={{text:'매물 확인', style:{fontWeight: "bold",color: "#000000",fontSize: 18} }}
              containerStyle={{
                  backgroundColor: '#ffffff',
                  borderBottomWidth:0,
                  justifyContent: 'space-around'}}
            />
          <View style={{flex : 1,justifyContent:'center', alignItems:'center'}}>
          <Image source={require('../Images/nosales.png')} style={{height:config.deviceHeight*(1/2),width:config.deviceWidth*(1/2), resizeMode:'contain'}}/> 
          </View>
        </View>
        )
  
      }
    
  }
}

const s = StyleSheet.create({
  button : {
    justifyContent:'center',
    alignItems:'center',
    height:config.deviceWidth*(1/8),
    width:'50%',
    marginLeft:-config.deviceWidth*(1/20),
    marginBottom:-config.deviceWidth*(1/35),
    
    borderColor:'rgba(255,123,98,0.75)',
    borderRadius:10

  }
})