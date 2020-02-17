import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground,SafeAreaView } from 'react-native';
import MyButton from '../Components/MyButton';
import Toast from 'react-native-root-toast';
import config from '../Components/Config';
import AsyncStorage from '@react-native-community/async-storage';
import {ButtonGroup, Slider, Header} from 'react-native-elements';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

MIcon.loadFont()
// 배경색
const basicColor = 'rgba(255,123,98,0.75)';
const textColor = '#3e3938';

const condition = ['년세', '반세','매매'];
const size = [ '원룸', '투룸', '투베이'];

export default class SelectionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value_condition: -1,
            value_room: -1,
            deposit: -1,
            value_price: 400,
        }
    }

    update_condition = index => {
        this.setState({value_condition:index});
    }

    update_room = index => {
        this.setState({value_room:index});
    }

    _update_deposit = (num) => {
        this.setState({deposit : num});
    }

    
    render() {
        
        return (
            
            <ImageBackground source={require('../Images/SelectionScreen_back.png')} style={{width: config.deviceWidth, height: config.deviceHeight}}>
                <Header
                    statusBarProps={{barStyle:'dark-content',translucent: true,}}
                    leftComponent={<MIcon name="arrow-left-circle" size={config.deviceWidth*(1/10)} color={'#FFFFFF'} onPress={() => this.props.navigation.goBack()} />} 
                    containerStyle={{
                        backgroundColor: textColor,
                        borderBottomWidth:0,
                        justifyContent: 'space-around',
                      }}/>

                <View style={styles.container}>
                    <View style={styles.top}>
                        <Image style={styles.top_ico} source={require('../Images/SelectionScreen_top.png')}/>
                        <Text style={styles.top_text}>원하시는 집을 골라주세요!</Text>
                    </View>
                    
                    <View style={styles.mid}>
                        <View style={styles.mid_content}>
                            <View style={styles.mid_condition}>
                                <Text style={styles.mid_text}>계약 조건</Text>
                                <ButtonGroup
                                    buttons={condition}
                                    selectedIndex={this.state.value_condition} 
                                    onPress={ this.update_condition }
                                    containerStyle={{borderRadius:25, borderColor:basicColor, backgroundColor:'#ffffff', width:'80%', height:config.deviceHeight*(1/17), marginTop:config.deviceHeight*0.015 }}
                                    textStyle={{fontSize: config.deviceWidth*(1/27), color: textColor }}
                                    innerBorderStyle={{width: 1, color: basicColor}}
                                    selectedButtonStyle={{backgroundColor:basicColor}}
                                    selectedTextStyle={{color:'#ffffff', fontWeight:'bold'}} />
                            </View>

                            <View style={styles.mid_room}>
                                <Text style={styles.mid_text}>방개수</Text>
                                <ButtonGroup
                                buttons={size}
                                selectedIndex={this.state.value_room} 
                                onPress={ this.update_room }
                                containerStyle={{borderRadius:25, borderColor:basicColor, backgroundColor:'#ffffff', width:'80%', height:config.deviceHeight*(1/17), marginTop:config.deviceHeight*0.015 }}
                                textStyle={{fontSize: config.deviceWidth*(1/27), color: textColor }}
                                innerBorderStyle={{width: 1, color: basicColor}}
                                selectedButtonStyle={{backgroundColor:basicColor}}
                                selectedTextStyle={{color:'#ffffff', fontWeight:'bold'}} />
                            </View>

                            <View style={styles.mid_price}>
                                <Text style={styles.mid_text}>금액</Text>
                                <Slider
                                    style={{width:'80%'}}
                                    trackStyle={{}}
                                    value={this.state.value_price}
                                    onValueChange={value => this.setState({ value_price:value  })}
                                    minimumTrackTintColor={basicColor}
                                    maximumTrackTintColo={'#b3b3b3'}
                                    minimumValue={400}
                                    maximumValue={800}
                                    step={100}
                                    thumbTintColor={basicColor}
                                />
                                {
                                    this.state.value_price !== -1 ? 
                                        (<Text style={[styles.text,{color:textColor, fontWeight:'bold'}]}>{this.state.value_price}만원 이하</Text>) 
                                        : (<View></View>)
                                }
                            </View>
                        </View>
                    </View>

                    <View style={styles.bottom}>
                        <MyButton
                            title={'매물 검색'}
                            titleColor={'#ffffff'}
                            titleSize={config.deviceWidth*(1/20)}
                            buttonwidth={config.deviceWidth*(5/6)}
                            buttonheight={config.deviceHeight*(1/9)}
                            buttonColor={textColor}
                            
                            onPress={ async () =>
                                {
                                    // 만약 Picker 선택 조건을 모두 완료 했다면
                                    if (this.state.value_condition !== -1 && this.state.value_room !== -1) 
                                        {
                                            await AsyncStorage.setItem('condition', `${ condition[this.state.value_condition] }`);
                                            await AsyncStorage.setItem('room', `${ size[this.state.value_room] }`);
                                            await AsyncStorage.setItem('price', `${ this.state.value_price }`);
                                            // Feed 화면으로 전환, 파라미터로 state값(Picker에서 선택된 값) 전달
                                            this.props.navigation.navigate('MainFeed');
                                        }
                                    // 만약 Picker 선택 조건을 모두 완료하지 않았다면
                                    else {
                                        // react-native-root-toast 사용(Android, iOS 호환)
                                        Toast.show('선택을 완료해주세요!', {
                                            duration: 2500,
                                            position: Toast.positions.BOTTOM,
                                            shadow: false,
                                            animation: true,
                                            hideOnPress: true,
                                            delay: 0,
                            })}}}
                        />
                    </View>
                    
                </View>

            </ImageBackground>
            
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },



    top: {
        flex: 0.7,
        alignItems:'center',
        marginTop : config.deviceHeight*(-0.02),
    },
    top_ico: {
        height:config.deviceHeight*(0.12),
        width:config.deviceWidth*(0.15),
        resizeMode:'contain',
        marginTop : config.deviceHeight*(-0.02),
    },
    top_text: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight:'bold',
    },




    mid: {
        flex: 2.2,
        paddingVertical: config.deviceHeight*(0.01)
    },
    mid_content: {
        flex: 1,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        shadowColor : 'rgba(0,0,0,0.5)',
        shadowOpacity:0.5,
        shadowRadius:15,
        shadowOffset: {width:1, height:10},
        elevation:10,
        backgroundColor: 'white',
        marginHorizontal: config.deviceWidth*(0.07),
        justifyContent: "space-around",
        paddingVertical:config.deviceHeight*(1/40),
    },
    mid_text: {
        color: textColor,
        fontSize: 18,
        fontWeight:'bold',
        
    },
    mid_condition: {
        flex: config.deviceHeight*(0.0004),
        alignItems: "center",
    },
    mid_room: {
        flex: config.deviceHeight*(0.0004),
        alignItems: "center",
    },
    mid_price: {
        flex: config.deviceHeight*(0.0004),
        alignItems: "center",
        
    },

   


    bottom: {
        flex: 1,
        alignItems: 'center',
        paddingTop: config.deviceHeight*(1/30)
    },
 })