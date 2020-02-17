import React, { Component } from 'react';
import {Text, TouchableOpacity, TextInput, View, Modal, ActivityIndicator ,Dimensions, Image, StyleSheet,Alert } from 'react-native';
import Toast from 'react-native-root-toast';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage'
import config from '../Components/Config';
import { Header } from 'react-native-elements';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../Components/Loader';

const WINDOW_H = Dimensions.get('screen').height;
const WINDOW_W = Dimensions.get('screen').width;

MIcon.loadFont();
export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            ID: "",
            Password: "",
            pd_callnum_col: "",
            pd_hash_col: "",
            pd_name_col: "",
            pd_table_col: "",
            isLoading : false
        }       
    };

    

    handleID = text => {
        this.setState({ ID: text });
    }
    handlePassword = text => {
        this.setState({ Password: text});
    }

    _createUser = async () => {

        if(this.state.ID === "" || this.state.Password === "") {
            Alert.alert('E-mail / 비밀번호를 확인하세요');
            return;
        }

        this.setState({isLoading:true});
        try {
            await auth().signInWithEmailAndPassword(this.state.ID, this.state.Password);
            
            await AsyncStorage.setItem('user', `${this.state.ID}`);
            const id = await AsyncStorage.getItem('user');

            const name = await firestore().collection(id).get().then(async (snapshot) => {
              snapshot.forEach(doc => {
                this.setState({  pd_name_col : doc.data().pd_name_col});
                this.setState({  pd_callnum_col : doc.data().pd_callnum_col});
                this.setState({  pd_hash_col : doc.data().pd_hash_col});
                this.setState({  pd_table_col : doc.data().pd_table_col});
                });

                await AsyncStorage.setItem('pd_name_col', `${this.state.pd_name_col}`);
                await AsyncStorage.setItem('pd_callnum_col', `${this.state.pd_callnum_col}`);
                await AsyncStorage.setItem('pd_hash_col', `${this.state.pd_hash_col}`);
                await AsyncStorage.setItem('pd_table_col', `${this.state.pd_table_col}`);
        })
        } catch(e) {
            console.log(e);


            this.setState({isLoading:false});

            setTimeout( async () => {
                Alert.alert('E-mail / 비밀번호를 확인하세요');
                await AsyncStorage.removeItem('user');
            }, 100);
            
            return;
        }

        this.setState({isLoading:false});
        this.props.navigation.goBack();
        Toast.show('정상적으로 로그인 되었습니다', {
            duration: 2000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 200,
        })
        this.props.navigation.state.params.changestate({user_log:true});
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
            
            <Loader maintext='로그인 중입니다' load={this.state.isLoading}/>

            <View style={s.container}>
                <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
                    <Image source={require('../Images/login.png')} style={{width:WINDOW_W*(2/5), height:WINDOW_H*(1/10), resizeMode:'contain'}} />
                </View>
                
                <View style={{justifyContent: 'flex-start', alignItems:'center', flex:1}}>
                    <TextInput
                        style={s.input}
                        placeholder='이메일을 입력해주세요.'
                        placeholderTextColor='#3e3938'
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        onChangeText={this.handleID}/>
                    <View style={{paddingBottom:config.deviceHeight*(1/40)}}/>
                    <TextInput 
                        style={s.input}
                        secureTextEntry={true}
                        placeholder='비밀번호를 입력해주세요'
                        underlineColorAndroid='transparent' 
                        placeholderTextColor='#3e3938'
                        autoCapitalize='none'
                        onChangeText={this.handlePassword}/>
                    
                    <View style={{paddingBottom:30}}/>

                </View>   

                <View style={{justifyContent: 'flex-start', alignItems:'center', flex:1}}>
                    <TouchableOpacity
                        style={s.loginbutton}
                        onPress={() => this._createUser() }>
                        <Text style={s.logintext}>확인</Text>
                    </TouchableOpacity>
                </View>

            </View>
          </View>
        )
    }
};

const s = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    input : {
        borderRadius : 20,
        borderColor : '#ff7b62',
        borderWidth: 1,
        width: WINDOW_W*(5/6),
        height: WINDOW_H*(1/18),
        paddingTop:0,
        paddingBottom:0,
        textAlign:'center',
        color:'#3e3938',
    },
    loginbutton : {
        borderRadius: 20,
        backgroundColor: '#3e3938',
        borderWidth: 1,
        borderColor: '#3e3938',
        width: WINDOW_W*(5/6),
        height: WINDOW_H*(1/10),
        alignItems : 'center',
        justifyContent : 'center',
        shadowColor : 'rgba(256,256,256,1)',
        shadowOpacity:0.5,
        shadowRadius:15,
        shadowOffset: {width:1, height:15},
        elevation:10
    },
    logintext : {
        fontSize: WINDOW_W*(1/20),
        fontWeight: 'bold',
        color: '#ffffff',
    }
    
})