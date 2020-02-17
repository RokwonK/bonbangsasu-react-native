import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, Keyboard, StatusBar, Platform, Alert} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import config from '../Components/Config';
import { Header } from 'react-native-elements'

MIcon.loadFont();

const statusbar_height = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

export default class SaleAddinfoScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            add_info : ""
        };
        

    }

    componentDidMount = () => {
        const info = this.props.navigation.getParam('addinfo', 'some default value');
        this.setState({add_info : info});
    }

    update_add_info = text => {
        this.setState({add_info : text});
    }

    Confirm_info = () => {
        const {
            add_info
        } = this.state;

        for (let i = 0; i < add_info.length; i++) {
            let cha = add_info.charAt(i)
            if (cha === '?' || cha === '>' || cha === '<' ) {
                Alert.alert('특수문자는 사용할 수 없습니다(?,>,<)');
                return;
            }
        }
        this.props.navigation.state.params.change_add_info(
            {
                add_info : add_info
            });
        this.props.navigation.goBack();
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
            <View style={{flex:1, backgroundColor:'#ffffff'}}>
                
                <Header 
                    statusBarProps={{barStyle:'dark-content', translucent:true}}
                    leftComponent={ <MIcon
                        name="arrow-left-circle"
                        size={config.deviceWidth * (1 / 9)}
                        color={'#3e3938'}
                        onPress={() => this.props.navigation.goBack()}/> }
                    centerComponent={{text:'매물 소개 추가', style:{fontWeight: "bold",color: "#000000",fontSize: 18} }}
                    containerStyle={{
                        backgroundColor: '#ffffff',
                        borderBottomWidth:0,
                        justifyContent: 'space-around'}}
                />
                

                
                <View style={{ flex:9,paddingHorizontal: config.deviceWidth*(1/20), paddingVertical:config.deviceHeight*(1/15) }}>
                    <View style={{paddingVertical:config.deviceHeight*(1/50) }}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color:'#3e3938', fontWeight:'bold', fontSize:config.deviceWidth*(1/30)}}>방을 소개해주세요!</Text>
                            <Text style={{color:'#3e3938', fontWeight:'bold', fontSize:config.deviceWidth*(1/30)}}>(300자 이내)</Text>
                            
                        </View>

                        

                            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{alignSelf:'flex-end', fontSize:config.deviceWidth*(1/25), fontWeight:'bold', color:'rgba(255,123,98,0.75)', paddingRight:config.deviceWidth*(75/1000)}}>{(this.state.add_info).length} / 300</Text>
                            </View>

                            <View style={{justifyContent:'center', alignItems:'center', paddingTop:10}}>
                            <TextInput
                                style={{
                                    borderColor:'#ffffff',
                                    borderWidth:1,
                                    borderRadius:15,
                                    paddingLeft:config.deviceWidth*(1/25),
                                    height:config.deviceHeight*(1/3),
                                    width:'85%', fontSize:config.deviceWidth*(1/30),
                                    backgroundColor:'#ffffff',
                                    color:'#3e3938',
                                    justifyContent:'flex-start',
                                    
                                    alignContent:'flex-start',
                                    textAlign:'left',
                                    
                                    shadowColor : 'rgba(0,0,0,0.7)',
                                    shadowOpacity:0.3,
                                    shadowRadius:15,
                                    shadowOffset: {width:1, height:10},
                                    elevation:10}}
                                defaultValue={this.state.add_info}
                                placeholder="소개글을 작성해 주세요"
                                placeholderTextColor='#3e3938'
                                underlineColorAndroid='transparent'
                                onChangeText={this.update_add_info}
                                maxLength={300}
                                multiline={true}
                                
                                />
                            </View>
                        
                    </View>
                    
                </View>

                <View style={{
                    justifyContent:'flex-end',
                    alignItems:'center',
                    position: Platform.OS === 'ios' ? 'relative' : 'absolute',
                    marginTop: Platform.OS === 'ios' ? 0 : config.deviceHeight*(9/10)+statusbar_height
                    }}>
                    <TouchableOpacity
                        style={{
                            justifyContent:'center',
                            alignItems:'center',
                            width:config.deviceWidth,
                            height:config.deviceHeight*(1/10),
                            borderWidth:2,
                            borderColor:'#3e3938',
                            backgroundColor:'#3e3938' }}
                        onPress={ () => this.Confirm_info()}>
                        <Text style={{fontSize:config.deviceWidth*(1/23), fontWeight:'900', color:'#ffffff', paddingBottom:config.deviceHeight*(1/30)}}>등록하기</Text>
                    </TouchableOpacity>
                </View>
                
          </View>
          </TouchableWithoutFeedback>
        )
    }
};

const s = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})