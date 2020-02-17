import React, { Component } from 'react';
import { SafeAreaView,StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Alert,Image } from 'react-native';

import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../Components/Config';
import Loader from '../Components/Loader';

import { Header } from 'react-native-elements';
import ImageResizer from 'react-native-image-resizer';

MIcon.loadFont();
IIcon.loadFont();


const Screen_W=Dimensions.get('screen').width;
const Screen_H=Dimensions.get('screen').height;

const room = [ '원룸', '투룸', '투베이'];
const condition = ['반세', '년세','매매'];


const option = ['냉장고','세탁기', '인덕션', '가스레인지','전자레인지', '옷장', '전자도어락', 'TV','책상', '에어컨','심야전기' , '신발장'];

const url = 'https://bonbangsasu.com';

export default class RoomcentralScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            building_name : "",
            room_style : "",
            con : -1,
            room_size : -1,
            room_price : -1,
            ro_loc_col: "",
            deposit : -1,
            fee : -1,

            photo : [],
            add_info : "",

            pd_name_col : "",
            pd_callnum_col : "",
            pd_hash_col : "",
            pd_table_col : "",

            full_option : [],

            isLoading : false
        };
        
        this.receive_something();
    }
    
    receive_something = async () =>{
        const name = await AsyncStorage.getItem('pd_name_col');
        const callnum = await AsyncStorage.getItem  ('pd_callnum_col');
        const hash = await AsyncStorage.getItem('pd_hash_col');
        const table = await AsyncStorage.getItem('pd_table_col');
        this.setState({  pd_name_col : name});
        this.setState({  pd_callnum_col : callnum});
        this.setState({  pd_hash_col : hash});
        this.setState({  pd_table_col : table});
    }

    change_necessary = data => {
        this.setState(data);
    }
    change_photo = data => {
        this.setState(data);
    }
    change_add_info = data => {
        this.setState(data);
    }

    
    full_upload = async () => {
        const {
            building_name,
            room_style,
            con,    
            room_size,
            room_price,
            deposit,
            fee,
            ro_loc_col,
            pd_name_col,
            pd_callnum_col,
            pd_hash_col,
            pd_table_col,

            full_option,

            add_info,
            
            
        } = this.state;

        if (building_name !== "" && room_style !== "" && con !== "" && room_size !== "" && 
            room_price !== -1 && deposit !== -1 && fee !== -1 && ro_loc_col!="") {

            this.setState({isLoading:true});
            
            const data = {
                ro_name_col : building_name,
                ro_style_col : room_style,
                ro_con_col : condition[con],
                ro_size_col : room[room_size],
                ro_price_col : room_price,
                ro_deposit_col : deposit,
                ro_fee_col : fee,
                ro_loc_col : ro_loc_col,
                pd_name_col : pd_name_col,
                pd_callnum_col : pd_callnum_col,
                pd_hash_col : pd_hash_col,
                pd_table_col : pd_table_col,

                ro_detail_col : add_info,

                ro_refri_col : full_option[0],
                ro_washer_col : full_option[1],
                ro_induc_col : full_option[2],
                ro_gas_col : full_option[3],
                ro_micro_col : full_option[4],
                ro_closet_col : full_option[5],
                ro_door_col : full_option[6],
                ro_tv_col : full_option[7],
                ro_desk_col : full_option[8],
                ro_air_col : full_option[9],
                ro_elec_col : full_option[10],
                ro_shoe_col : full_option[11]
            }

            const realdata = {
                method: 'POST',
                body : JSON.stringify(data),
                headers : {
                    //'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            
            try{
                await fetch(`${url}/upload/information`,realdata).then(res => console.log(res))
            }
            catch(e) {
                console.log(e);

                this.setState({isLoading:false});

                setTimeout(() => {
                    Toast.show('\n 오류가 발생했습니다 \n', {
                        duration: 3000,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                }, 100);


                return;
            }

            const Loadstate = await this.full_image_upload();

            this.setState({isLoading:false});

            setTimeout(() => {
                if(Loadstate === true) {
                    this.props.navigation.goBack();
                }
                else {
                    Alert.alert('사진전송에 실패했습니다');
                }
            }, 100);

        }
        else {
            Alert.alert('정보를 모두 입력하세요');
        }
    }

    pick_image = (picture) => {
        const name = picture.path.split('/');
        const realname = name[name.length-1];

        return ({
            name : realname,
            type:'image/jpg',
            uri: picture.uri
        });
    }



    full_image_upload = async () => {

        let formdata = new FormData();
        formdata.append("ro_name_col", this.state.building_name);
        formdata.append("ro_style_col", this.state.room_style);

        if (this.state.photo.length == 0) {
            formdata.append('photo', { name : 'nophoto.jpg', type: 'image/jpg', uri: 'https://bonbangsasu.com/nophoto.jpg' }) 
        }
        else {

            for (i = 0; i < this.state.photo.length; i++) {
                this.state.photo[i] = await ImageResizer.createResizedImage(this.state.photo[i].path, 1500, 800, 'JPEG', 100);
            }

            for(i = 0; i < this.state.photo.length; i++) {
                formdata.append ('photo', this.pick_image(this.state.photo[i]) );
            }
        }
        
        const realdata = {
            method: 'POST',
            body : formdata
        }

        try {
            await fetch(`${url}/upload/photo`, realdata).then(res => console.log(res));
        }
        catch(e) {
            console.log(e);
            Toast.show('\n 오류가 발생했습니다 \n', {
                duration: 3000,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            return false;
        }

        Toast.show('방이 정상적으로 등록되었습니다!', {
            duration: 3000,
            position: Toast.positions.BOTTOM,   // 토스트 그림자 설정
            shadow: true,  // 토스트 켜지고 꺼질때 fade 설정
            animation: true,    // 토스트 터치시 사라지는 설정
            hideOnPress: true,
            delay: 0,
        });

        return true;
    }
    
    render() {
        return (
            <View style={{flex:1, backgroundColor:'#ffffff'}}>
                <Header 
                    statusBarProps={{barStyle:'dark-content', translucent:true}}
                    leftComponent={ <MIcon
                        name="arrow-left-circle"
                        size={config.deviceWidth * (1 / 9)}
                        color={'#3e3938'}
                        onPress={() => this.props.navigation.goBack()}/> }
                    centerComponent={{text:'매물 추가하기', style:{fontWeight: "bold",color: "#000000",fontSize: 18} }}
                    containerStyle={{
                        backgroundColor: '#ffffff',
                        borderBottomWidth:0,
                        justifyContent: 'space-around'}}
                />

                <Loader maintext='매물 등록 중입니다' load={this.state.isLoading}/>

                <View style={{justifyContent: 'center', alignItems:'center', flex:9}}>
                    <TouchableOpacity
                        style={s.plus}
                        onPress={() => {
                            this.state.room_price !== -1 ? 
                                Alert.alert(
                                    '',
                                    '정보를 재입력 하시겠습니까?',
                                    [
                                        {text:'확인', onPress: () => this.props.navigation.navigate('Saleinfo',{change_necessary : this.change_necessary}) },
                                        {text:'취소', style: 'cancel'}
                                    ],
                                    {cancelable: true}
                                )
                                :
                                this.props.navigation.navigate('Saleinfo',{change_necessary : this.change_necessary})
                            }}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                            <Image source={require('../Images/content_info.png')} style={{width:'23%', height:config.deviceHeight*(1/9), marginLeft:config.deviceWidth*(1/30), marginRight:config.deviceWidth*(1/17), resizeMode:'contain'}} />
                            <Text style={{fontSize:config.deviceWidth*(1/23), color:'#3e3938', fontWeight:'900', paddingRight:config.deviceWidth*(1/35)}}>매물 정보 등록</Text>
                            <Text style={{fontSize:config.deviceWidth*(1/35), color:'#ff7b62'}}>(필수)</Text>
                            {this.state.room_price !== -1 ?
                                <IIcon name='md-checkmark-circle' size={config.deviceWidth*(1/11)} color='#ff7b62' style={{paddingLeft:config.deviceWidth*(1/35)}}/>
                                :
                                <MIcon name="chevron-right" size={config.deviceWidth*(1/11)} color='#3e3938' style={{paddingLeft:config.deviceWidth*(1/35)}}/>
                            }   

                        </View>
                    </TouchableOpacity>

                    <View style={{paddingBottom:config.deviceWidth*(1/13)}}></View>

                    <TouchableOpacity
                        style={s.plus}
                        onPress={() => {
                            this.state.photo[0] ? 
                                Alert.alert(
                                    '',
                                    '사진을 다시 추가 하시겠습니까?',
                                    [
                                        {text:'확인', onPress: () => this.props.navigation.navigate('SalePicture',{change_photo : this.change_photo}) },
                                        {text:'취소', style: 'cancel'}
                                    ],
                                    {cancelable: true}
                                )
                                :
                                this.props.navigation.navigate('SalePicture',{change_photo : this.change_photo})
                            }}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                            <Image source={require('../Images/picture_info.png')} style={{width:'23%', height:config.deviceHeight*(1/9), marginLeft:config.deviceWidth*(1/30), marginRight:config.deviceWidth*(1/17), resizeMode:'contain'}} />
                            <Text style={{fontSize:config.deviceWidth*(1/23), color:'#3e3938', paddingRight:config.deviceWidth*(1/35)}}>매물 사진 추가</Text>
                            <Text style={{fontSize:config.deviceWidth*(1/35), color:'#9e9c9b'}}>(선택)</Text>
                            {this.state.photo[0] ?
                                <IIcon name='md-checkmark-circle' size={config.deviceWidth*(1/11)} color='#ff7b62' style={{paddingLeft:config.deviceWidth*(1/35)}}/>
                                :
                                <MIcon name="chevron-right" size={config.deviceWidth*(1/11)} color='#3e3938' style={{paddingLeft:config.deviceWidth*(1/35)}}/>
                            }   
                        </View>
                    </TouchableOpacity>

                    <View style={{paddingBottom:config.deviceWidth*(1/13)}}></View>

                    <TouchableOpacity
                        style={s.plus}
                        onPress={() => {this.props.navigation.navigate('SaleAddinfo',{change_add_info : this.change_add_info, addinfo : this.state.add_info })}}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                            <Image source={require('../Images/add_info.png')} style={{width:'23%', height:config.deviceHeight*(1/9), marginLeft:config.deviceWidth*(1/30), marginRight:config.deviceWidth*(1/17), resizeMode:'contain'}} />
                            <Text style={{fontSize:config.deviceWidth*(1/23), color:'#3e3938', paddingRight:config.deviceWidth*(1/35)}}>매물 소개 추가</Text>
                            <Text style={{fontSize:config.deviceWidth*(1/35), color:'#9e9c9b'}}>(선택)</Text>
                            {this.state.add_info !== "" ?
                                <IIcon name='md-checkmark-circle' size={config.deviceWidth*(1/11)} color='#ff7b62' style={{paddingLeft:config.deviceWidth*(1/35)}}/>
                                :
                                <MIcon name="chevron-right" size={config.deviceWidth*(1/11)} color='#3e3938' style={{paddingLeft:config.deviceWidth*(1/35)}}/>
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                

                
                <View style={{justifyContent: 'flex-end', alignItems:'center', flex:2.5}}>

                    {
                        this.state.room_price === -1 ? 
                        (
                            <View
                                style={{
                                justifyContent:'center',
                                alignItems:'center',
                                width:config.deviceWidth,
                                height:config.deviceHeight*(1/10),
                                borderWidth:2,
                                borderColor:'#737373',
                                backgroundColor:'#737373' }}>
                                <Text style={{fontSize:config.deviceWidth*(1/23), fontWeight:'900', color:'#ffffff', paddingBottom:config.deviceHeight*(1/30)}}>등록하기</Text>
                            </View>
                        )
                        :
                        (
                            <TouchableOpacity
                                style={{
                                justifyContent:'center',
                                alignItems:'center',
                                width:config.deviceWidth,
                                height:config.deviceHeight*(1/10),
                                borderWidth:2,
                                borderColor:'#3e3938',
                                backgroundColor:'#3e3938' }}
                                onPress={() => this.full_upload()}>
                                <Text style={{fontSize:config.deviceWidth*(1/23), fontWeight:'900', color:'#ffffff', paddingBottom:config.deviceHeight*(1/30)}}>등록하기</Text>
                            </TouchableOpacity>
                        )
                    }
                    
                </View>
            </View>
    )
  }
}

const s = StyleSheet.create({
    plus : {
        flexDirection : 'row',
        borderColor: '#002200',
        backgroundColor: '#ffffff',
        borderWidth : 1,
        borderColor: '#ffffff',
        borderRadius:20,
        width: Screen_W*(5/6),
        height: Screen_H*(1/8),
        
        shadowColor : 'rgba(0,0,0,0.7)',
        shadowOpacity:0.4,
        shadowRadius:15,
        shadowOffset: {width:2, height:2},
        elevation:5
    },
    info : {
        fontSize: 10,
        fontWeight: '400',
        color: '#000000',
    }

})