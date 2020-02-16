import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity,StatusBar,Platform,SafeAreaView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton} from 'react-native-cards';
import call from 'react-native-phone-call';
import { SliderBox } from 'react-native-image-slider-box';
import config from '../Components/Config';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import NaverMapView, { Marker } from "react-native-nmap";
import { ifIphoneX } from 'react-native-iphone-x-helper';
import SendSMS from 'react-native-sms';

MIcon.loadFont();
Icon.loadFont();

const statusbar_height = Platform.OS === 'ios' ? 20 : 0;

const R_color = ['#e6e6e6', '#000000'];
const L_color = ['#e6e6e6', '#ff7b62'];

export default class CardComponent extends React.Component {
  // handler to make a call
  call = () => {
    const args = {
      number: this.props.data.pd_callnum_col,
      prompt: false,
    };
    call(args).catch(console.error);
  };

  sms() {
    SendSMS.send({
        // 메세지 기본 텍스트
        body: `안녕하세요~ 본방사수 어플에서 ${this.props.data.ro_name_col} ${this.props.data.ro_style_col} 매물보고 연락드립니다!`,
        // 수진자 전화번호
        recipients: [this.props.data.pd_callnum_col],
        // 발신완료시 반응 트리거 전송완료, 전송취소, 전송실패
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission:true
    },(completed, cancelled, error) => {
      
      if(completed){
        console.log('SMS Sent Completed');
      }else if(cancelled){
        console.log('SMS Sent Cancelled');
      }else if(error){

        console.log(error);
      }
  });
  }

  state = {
    ModalVisible: false
  }

  render() {
    return (
    <Card style={{width: config.deviceWidth}}>
      
      
      <CardAction style={{borderColor: '#E9E9E9', borderBottomWidth: 1}} separator={true} inColumn={false}>
        <SliderBox sliderBoxHeight={300} parentWidth={config.deviceWidth} circleLoop={true} images={this.props.images}/>
      </CardAction>

      <View style={{paddingVertical:config.deviceHeight*(1/40) , paddingLeft:config.deviceWidth*(1/10), justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:config.deviceWidth*(1/32), fontWeight:'bold', alignSelf:'flex-start', color:'rgba(255,123,98,0.75)', paddingBottom:config.deviceWidth*(1/100)}}>{this.props.table === 1 ? '직거래' : '부동산'}</Text>
        <View style={{flexDirection:'row', alignItems:'flex-end'}}>
          <Text style={{fontSize:config.deviceWidth*(1/20), fontWeight:'bold', color:'#000000', paddingRight:config.deviceWidth*(1/37)}}>{this.props.data.ro_name_col}</Text>
          <Text style={{fontSize:config.deviceWidth*(1/20), fontWeight:'bold', color:'#000000'}}>{this.props.data.ro_style_col}</Text>
        </View>
      </View>


      <View style={{flex:1,flexDirection:'row', alignItems:'center',paddingLeft:config.deviceWidth*(1/10),paddingBottom:config.deviceHeight*(1/60)}}>
        <View style={{justifyContent:'center', alignItems:'flex-start'}}>
          <Text style={[styles.description,{fontWeight:'bold', color:'#000000'}]}>계약조건</Text>
          <Text style={[styles.description,{fontWeight:'bold', color:'#000000'}]}>방 형태</Text>
          <Text style={[styles.description,{fontWeight:'bold', color:'#000000'}]}>금액 </Text>
          <Text style={[styles.description,{fontWeight:'bold', color:'#000000'}]}>보증금 </Text>
          <Text style={[styles.description,{fontWeight:'bold', color:'#000000'}]}>관리비 </Text>
          
        </View>

        <View style={{paddingLeft:config.deviceWidth*(1/20)}}>
          <Text style={styles.description}>{this.props.data.ro_con_col}</Text>
          <Text style={styles.description}>{this.props.data.ro_size_col}</Text>
          <Text style={styles.description}>{this.props.data.ro_price_col}만원</Text>
          <Text style={styles.description}>{this.props.data.ro_deposit_col}만원</Text>
          <Text style={styles.description}>{this.props.data.ro_fee_col}만원</Text>
          
        </View>
      </View>

      <View style={{backgroundColor:'#f2f2f2', height:config.deviceHeight*(1/40), width:config.deviceWidth}} />

      <View style={{paddingLeft:config.deviceWidth*(1/10),paddingVertical:config.deviceHeight*(1/40)}}>
        <Text style={{fontSize:config.deviceWidth*(1/32), fontWeight:'bold', alignSelf:'flex-start', color:'rgba(255,123,98,0.75)', paddingBottom:config.deviceWidth*(1/100)}}>위치</Text>
        <Text style={{fontSize:config.deviceWidth*(1/25), fontWeight:'bold', color:'#000000', paddingRight:config.deviceWidth*(1/37)}}>{this.props.data.ro_loc_col}</Text>
      </View>


      <CardAction separator={true} inColumn={false}>
        <NaverMapView 
          style={{width: '100%', height: 200}}
          center = {{latitude: this.props.data.ro_latitude_col, longitude: this.props.data.ro_longitude_col, zoom:14}}>
          <Marker coordinate={{latitude: this.props.data.ro_latitude_col, longitude: this.props.data.ro_longitude_col}} pinColor="#6600cc"/>
        </NaverMapView>
      </CardAction>




      <CardAction separator={true} inColumn={false} style={{justifyContent:'center', alignItems:'center'}}>
        
        <Modal            
          animationType = {"fade"}  
          transparent = {true}  
          visible = {this.state.ModalVisible}  
          onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
            
            
              
            
              <NaverMapView 
                style={{width:'100%', height:'100%'}}
                center = {{latitude: this.props.data.ro_latitude_col, longitude: this.props.data.ro_longitude_col, zoom:14}}>
                <Marker coordinate={{latitude: this.props.data.ro_latitude_col, longitude: this.props.data.ro_longitude_col}} />
              </NaverMapView>
              <MIcon
                        name="arrow-left-circle"
                        size={config.deviceWidth * (1 / 9)}
                        color={'#3e3938'}
                        style={{position:'absolute', ...Platform.OS === 'ios' ? {...ifIphoneX({paddingTop:50},{paddingTop:20})} : {paddingTop:0} }}
                        onPress={() => this.setState({ModalVisible:false})}/>
            
        </Modal>
        

        <CardButton onPress={() =>{ this.setState({ModalVisible:true}) } } title="위치 크게보기"  color='#3e3938' style={{width:'100%', marginBottom:0, marginTop:0, marginLeft:0, paddingTop:25, paddingBottom:25}} />
      </CardAction>

      <View style={{backgroundColor:'#f2f2f2', height:config.deviceHeight*(1/40), width:config.deviceWidth}} />

      <CardAction separator={true} inColumn={false}>
        <View style={{flexDirection:'column'}}>
          
          <View style={{flexDirection:'column'}}>
            <Text style={[styles.description,{paddingLeft:config.deviceWidth*(1/10),fontWeight:'bold', color:'#000000', fontSize:config.deviceWidth*(1/20), paddingTop:config.deviceHeight*(1/30)}]}>상세설명</Text>
            
            

            <Text style={{paddingLeft:config.deviceWidth*(1/10),paddingTop:config.deviceHeight*(1/40),paddingBottom:config.deviceHeight*(1/80), color:'#000000', fontSize:config.deviceWidth*(1/30), fontWeight:'bold'}}>기본 옵션</Text>
            
            <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'flex-start',paddingLeft:config.deviceWidth*(1/10)}}>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', color: L_color[this.props.data.ro_door_col], fontSize:config.deviceWidth*(1/30)}}>· </Text>
                <Text style={{paddingRight: 16, fontWeight:'bold', color: R_color[this.props.data.ro_door_col], fontSize:config.deviceWidth*(1/30)}}>전자도어락</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', color: L_color[this.props.data.ro_washer_col], fontSize:config.deviceWidth*(1/30)}}>· </Text>
                <Text style={{paddingRight: 16, fontWeight:'bold', color: R_color[this.props.data.ro_washer_col], fontSize:config.deviceWidth*(1/30)}}>세탁기</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', color: L_color[this.props.data.ro_induc_col], fontSize:config.deviceWidth*(1/30)}}>· </Text>
                <Text style={{paddingRight: 16, fontWeight:'bold', color: R_color[this.props.data.ro_induc_col], fontSize:config.deviceWidth*(1/30)}}>인덕션    </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', color: L_color[this.props.data.ro_tv_col], fontSize:config.deviceWidth*(1/30)}}>· </Text>
                <Text style={{paddingRight: 16, fontWeight:'bold', color: R_color[this.props.data.ro_tv_col], fontSize:config.deviceWidth*(1/30)}}>TV</Text>
              </View>
            </View>

            <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'flex-start', paddingTop:config.deviceHeight*(1/80),paddingLeft:config.deviceWidth*(1/10)}}>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', color: L_color[this.props.data.ro_micro_col], fontSize:config.deviceWidth*(1/30)}}>· </Text>
                <Text style={{paddingRight: 16, fontWeight:'bold', color: R_color[this.props.data.ro_micro_col], fontSize:config.deviceWidth*(1/30)}}>전자레인지</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', color: L_color[this.props.data.ro_shoe_col], fontSize:config.deviceWidth*(1/30)}}>· </Text>
                <Text style={{paddingRight: 16, fontWeight:'bold', color: R_color[this.props.data.ro_shoe_col], fontSize:config.deviceWidth*(1/30)}}>신발장</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', color: L_color[this.props.data.ro_refri_col], fontSize:config.deviceWidth*(1/30)}}>· </Text>
                <Text style={{paddingRight: 16, fontWeight:'bold', color: R_color[this.props.data.ro_refri_col], fontSize:config.deviceWidth*(1/30)}}>냉장고    </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', color: L_color[this.props.data.ro_closet_col], fontSize:config.deviceWidth*(1/30)}}>· </Text>
                <Text style={{paddingRight: 16, fontWeight:'bold', color: R_color[this.props.data.ro_closet_col], fontSize:config.deviceWidth*(1/30)}}>옷장</Text>
              </View>
            </View>
            
            <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'flex-start', paddingTop:config.deviceHeight*(1/80),paddingLeft:config.deviceWidth*(1/10)}}>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', color: L_color[this.props.data.ro_gas_col], fontSize:config.deviceWidth*(1/30)}}>· </Text>
                <Text style={{paddingRight: 16, fontWeight:'bold', color: R_color[this.props.data.ro_gas_col], fontSize:config.deviceWidth*(1/30)}}>가스레인지</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', color: L_color[this.props.data.ro_air_col], fontSize:config.deviceWidth*(1/30)}}>· </Text>
                <Text style={{paddingRight: 16, fontWeight:'bold', color: R_color[this.props.data.ro_air_col], fontSize:config.deviceWidth*(1/30)}}>에어컨</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', color: L_color[this.props.data.ro_elec_col], fontSize:config.deviceWidth*(1/30)}}>· </Text>
                <Text style={{paddingRight: 16, fontWeight:'bold', color: R_color[this.props.data.ro_elec_col], fontSize:config.deviceWidth*(1/30)}}>심야전기</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold', color: L_color[this.props.data.ro_desk_col], fontSize:config.deviceWidth*(1/30)}}>· </Text>
                <Text style={{paddingRight: 16, fontWeight:'bold', color: R_color[this.props.data.ro_desk_col], fontSize:config.deviceWidth*(1/30)}}>책상</Text>
              </View>
            </View>
          </View>

          <View style={{flex:1, width:config.deviceWidth*(1*0.8), borderColor: '#e0e0eb', borderTopWidth:2, marginLeft:config.deviceWidth*(1/10), marginTop:config.deviceHeight*(1/40), paddingBottom:config.deviceHeight*(1/30)}}>
            <Text style={{flex:1, fontWeight:'bold', color:'#000000', fontSize:config.deviceWidth*(1/30), marginTop:config.deviceHeight*(1/40), paddingBottom:config.deviceHeight*(1/80)}}>방 소개</Text>
            <View style={{flex:1, flexDirection:'row',alignItems:'flex-start', justifyContent:'flex-start', paddingBottom:config.deviceHeight*(1/80)}}>
              <Text style={{fontWeight:'bold', color: '#ff7b62', fontSize:config.deviceWidth*(1/30)}}>· </Text>
              <Text style={{fontWeight:'bold', color: '#3e3938', fontSize:config.deviceWidth*(1/30)}}>{this.props.data.ro_detail_col}</Text>
            </View>
          </View>

        </View>
      </CardAction>
            

      <CardAction separator={true} inColumn={true} style={{paddingLeft:config.deviceWidth*(1/10),paddingVertical: config.deviceHeight*(1/40)}}>
        <Text style={styles.ownerText1}>{`${this.props.data.pd_name_col}`}</Text>
        <Text style={styles.ownerText2}>{`${this.props.data.pd_callnum_col}`}</Text>
      </CardAction>


      <CardAction separator={true} inColumn={false} style={{height: config.deviceHeight*(1*0.13),justifyContent:'center', alignItems:'center', backgroundColor:'#3e3938', paddingBottom: config.deviceHeight*(0.03),marginBottom: config.deviceHeight*(-0.02)}}>
        <TouchableOpacity 
          style={{width:'100%', height: config.deviceHeight*(1*0.13), alignItems:'center', justifyContent:'center'}}
          onPress={() => { this.call(); }}>
          <Text style={styles.buttonText1}>전화하기</Text>
        </TouchableOpacity>
        
      </CardAction>
    </Card>);
  }
}

const styles = StyleSheet.create({
  description: {
    paddingBottom: config.deviceHeight*(1/80),
    fontSize:config.deviceWidth*(1/30),
    color: '#3e3938',
  },
  ownerText1: {
    color: "#3e3938",
    fontWeight:'bold',
    fontSize: config.deviceWidth*(1/20),
  },
  ownerText2: {
    paddingTop: config.deviceHeight*(1/700),
    color: "#3e3938",
    fontWeight:'bold',
    fontSize: config.deviceWidth*(1/25),
  },
  buttonText1: {
    color: "#FFFFFF",
    fontWeight:'bold',
    fontSize: config.deviceWidth*(1/23),
    paddingHorizontal: config.deviceWidth*(1/7),
    marginBottom: config.deviceHeight*(1/60),
    
  },
  /*
  buttonText2: {
    color: "#FFFFFF",
    fontWeight:'bold',
    fontSize: config.deviceWidth*(1/23),
    paddingHorizontal: config.deviceWidth*(1/7),
    marginBottom: config.deviceHeight*(1/60),
    borderLeftWidth:0.5,
    borderColor:'#ff7b62',
  }
  
  */
});