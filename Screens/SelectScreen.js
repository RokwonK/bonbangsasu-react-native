import React, {Component} from 'react';
import { SafeAreaView,StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Alert,Image } from 'react-native';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../Components/Config';
import auth from '@react-native-firebase/auth';

import { Header } from 'react-native-elements';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

MIcon.loadFont();

const Screen_W=Dimensions.get('screen').width;
const Screen_H=Dimensions.get('screen').height;
export default class SelectScreen extends Component {

    databaseplus = async() => {
        const id = await AsyncStorage.getItem('user');

        if(id) {
            const name = await AsyncStorage.getItem('pd_name_col');
            this.setState({ id, pd_name_col:name, user_log:true });
            //this.setState({ user_log:true });
            
        }   
    }

    constructor(props) {
        super(props);
        this.state = {
            pd_name_col: "",
            pd_loc_col: "",
            pd_tell_col: "",
            id: "",
            user_log : false
        };
        this.databaseplus();
    }

    changestate = data => {
        this.setState(data);
        this.databaseplus();
    }

    reallogout = async() => {
        if (this.state.id === "") {
            this.pleaselogin();
        }
        else {
            await auth().signOut().then( async () => {
                await AsyncStorage.removeItem('user');
                await AsyncStorage.removeItem('pd_name_col');
                await AsyncStorage.removeItem('pd_callnum_col');
                await AsyncStorage.removeItem('pd_hash_col');
                await AsyncStorage.removeItem('pd_table_col');
            }).catch(() => {
                Alert.alert('logout fail');
                return;
            })
            Toast.show('정상적으로 로그아웃 되었습니다', {
                duration: 3500,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 200,
            });
            this.setState({user_log:false, id:""})
        }
    }

    logout = () => {
        Alert.alert(
            '',
            '로그아웃 하시겠습니까?  ',
            [
                {text:'확인', onPress: () => this.reallogout() },
                {text:'취소', style: 'cancel'}
            ],
            {cancelable: true}
        );
    }

    pleaselogin = () => {
        Toast.show('로그인 후 이용해 주세요', {
            duration: 5000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 200,
        });
    }

    

    render() {
        return (
            <View style={{flex:1, backgroundColor:'#ffffff'}}>
                <Header 
                    statusBarProps={{barStyle:'dark-content', translucent:true}}
                    leftComponent={<MIcon name="arrow-left-circle" size={config.deviceWidth*(1/10)} color={'#3e3938'} onPress={() => this.props.navigation.goBack()} />}
                    containerStyle={{
                        backgroundColor: '#ffffff',
                        borderBottomWidth:0,
                        justifyContent: 'space-around',
                      }}
                    />

                
                <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                    <Image source={require('../Images/login.png')} style={{width:config.deviceWidth*(2/5), height:config.deviceHeight*(1/10), resizeMode:'contain'}} />
                </View>

                
                <View style={{justifyContent:'center', alignItems:'center',flex:2}}>
                    <TouchableOpacity
                        style={s.plus}
                        onPress={() => {this.state.id==="" ? this.pleaselogin() : this.props.navigation.navigate('Roomcentral')}}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                            <Image source={require('../Images/sale_plus.png')} style={{width:config.deviceWidth*(1/5), height:config.deviceHeight*(1/8), marginLeft:config.deviceWidth*(1/40), marginRight:config.deviceWidth*(1/10), resizeMode:'contain'}} />
                            <Text style={{fontSize:config.deviceWidth*(1/27), color:'#3e3938'}}>매물 추가하기</Text>
                        </View>
                    </TouchableOpacity>
                
                    <View style={{paddingBottom:config.deviceWidth*(1/20)}}></View>
                    
                
                    <TouchableOpacity
                        style={s.plus}
                        onPress={() => {this.state.id==="" ? this.pleaselogin() : this.props.navigation.navigate('Iden')}}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                            <Image source={require('../Images/sale_confirm.png')} style={{width:config.deviceWidth*(1/5), height:config.deviceHeight*(1/8), marginLeft:config.deviceWidth*(1/40), marginRight:config.deviceWidth*(1/10), resizeMode:'contain'}} />
                            <Text style={{fontSize:config.deviceWidth*(1/27), color:'#3e3938'}}>내 매물 확인/삭제</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                

                { this.state.user_log ? 
                    (<View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
                        <TouchableOpacity
                            style={{
                            justifyContent:'center',
                            alignItems:'center',
                            width:config.deviceWidth*(2/3),
                            height:config.deviceHeight*(1/15),
                            borderWidth:2,
                            borderRadius:25,
                            borderColor:'#3e3938',
                            backgroundColor:'#3e3938' }}
                            onPress={() => this.logout()}>
                            <Text style={{fontSize:config.deviceWidth*(1/25), fontWeight:'900', color:'#ffffff'}}>로그아웃</Text>
                        </TouchableOpacity>
                    </View>) : 
                    (
                        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                            <TouchableOpacity
                                style={{
                                    justifyContent:'center',
                                    alignItems:'center',
                                    width:config.deviceWidth*(2/3),
                                    height:config.deviceHeight*(1/15),
                                    borderWidth:2,
                                    borderRadius:25,
                                    borderColor:'#3e3938',
                                    backgroundColor:'#3e3938' }}
                                onPress={() => this.props.navigation.navigate('Login', {changestate : this.changestate}) }>
                                <Text style={{fontSize:config.deviceWidth*(1/25), fontWeight:'900', color:'#ffffff'}}>로그인</Text>
                            </TouchableOpacity>
                        </View> )
                }
                


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
        borderRadius:10,
        width: Screen_W*(4/5),
        height:config.deviceHeight*(1/8),
        
        
        shadowColor : 'rgba(0,0,0,1)',
        shadowOpacity:0.2,
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