import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, TextInput, Platform, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-root-toast';
import config from '../Components/Config';
import {ButtonGroup, Header} from 'react-native-elements';

Icon.loadFont();
MIcon.loadFont();


const room = [ '원룸', '투룸', '투베이'];
const condition = ['반세', '년세','매매'];

const option1 = ['냉장고','세탁기', '인덕션'];
const option2 = ['가스레인지','전자레인지', '옷장'];
const option3 = ['전자도어락', 'TV','책상'];
const option4 = ['에어컨','심야전기' , '신발장'];
export default class SaleinfoScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            building_name : "",
            room_style : "",
            value_room : -1,
            value_condition: -1,
            deposit : -1,
            room_price : -1,
            fee : -1,
            ro_loc_col : "주소를 검색해 주세요",
            option1 : [],
            option2 : [],
            option3 : [],
            option4 : [],
            full_option : [0,0,0,0,0,0,0,0,0,0,0,0]
        };

    }

    update_building_name = text => {
        this.setState({building_name:text});
    }
    update_room_style = text => {
        this.setState({room_style : text})
    }
    update_room = index => {
        this.setState({value_room:index});
    }
    update_condition = index => {
        this.setState({value_condition:index});
    }
    update_deposit = num => {
        this.setState({deposit : num});
    }
    update_room_price = (num) => {
        this.setState({room_price : num});
    }
    update_fee = (num) => {
        this.setState({fee : num});
    }
    changepost = data => {
        this.setState(data);   
    }
    update_option1 = (arr) => {
        for(i = 0; i < arr.length; i++) {
            this.state.full_option[ arr[i] ] === 1 ? 0 : 1;
        }
        this.setState({full_option : this.state.full_option});
        this.setState({option1 : arr});
    }
    update_option2 = (arr) => {
        for(i = 0; i < arr.length; i++) {
            this.state.full_option[ arr[i]+3 ] === 1 ? 0 : 1;
        }
        this.setState({full_option : this.state.full_option});
        this.setState({option2 : arr});
    }
    update_option3 = (arr) => {
        for(i = 0; i < arr.length; i++) {
            this.state.full_option[ arr[i]+6 ] === 1 ? 0 : 1;
        }
        this.setState({full_option : this.state.full_option});
        this.setState({option3 : arr});
    }
    update_option4 = (arr) => {
        for(i = 0; i < arr.length; i++) {
            this.state.full_option[ arr[i]+9 ] === 1 ? 0 : 1;
        }
        this.setState({full_option : this.state.full_option});
        this.setState({option4 : arr});
    }


    Confirm_info = () => {
        const {
            building_name,
            room_style,
            value_room,
            value_condition,
            deposit,
            room_price,
            fee,
            ro_loc_col,
            full_option
        } = this.state;

        for (let i = 0; i < building_name.length; i++) {
            let cha = building_name.charAt(i)
            if (cha === '?' || cha === '>' || cha === '<' ) {
                Alert.alert('특수문자는 사용할 수 없습니다(?,>,<)');
                return;
            }
        }
        for (let i = 0; i < room_style.length; i++) {
            let cha = room_style.charAt(i)
            if (cha === '?' || cha === '>' || cha === '<' ) {
                Alert.alert('특수문자는 사용할 수 없습니다(?,>,<)');
                return;
            }
        }

        if (building_name !== "" && room_style !== "" && value_room !== -1 && value_condition !== -1 && deposit !== -1 
            && room_price !== -1 && fee !== -1 && ro_loc_col !== "주소를 검색해 주세요") {
                this.props.navigation.state.params.change_necessary(
                    {
                        building_name : building_name,
                        room_style : room_style,
                        room_size : value_room,
                        con : value_condition,
                        room_price : room_price,
                        deposit : deposit,
                        fee : fee,
                        ro_loc_col:ro_loc_col,
                        full_option : full_option
                    });
                this.props.navigation.goBack();
        }
        else {
            Toast.show('정보등록을 완료해주세요', {
                duration: 3000,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });

        }
    }


    render() {
        
        return (
            <ScrollView style={{backgroundColor:'#ffffff'}}>
            <Header 
                statusBarProps={{barStyle:'dark-content', translucent:true}}
                leftComponent={ <MIcon
                    name="arrow-left-circle"
                    size={config.deviceWidth * (1 / 9)}
                    color={'#3e3938'}
                    onPress={() => this.props.navigation.goBack()}/> }
                centerComponent={{text:'매물 정보 등록', style:{fontWeight: "bold",color: "#000000",fontSize: 18} }}
                containerStyle={{
                    backgroundColor: '#ffffff',
                    borderBottomWidth:0,
                    justifyContent: 'space-around'}}
            />

            <View style={{paddingVertical:config.deviceHeight*(1/30)}}/>

            <View style={{ paddingHorizontal: config.deviceWidth*(1/20) }}>

                <View style={{ borderWidth:1, borderRadius:10, borderColor: '#3e3938', paddingVertical:config.deviceWidth*(1/20), margin:config.deviceWidth*(1/80) }}>
                    <View style={{paddingLeft:config.deviceWidth*(1/10), paddingBottom:config.deviceWidth*(1/30)}}>
                        <Text style={{color:'#3e3938', fontWeight:'bold', fontSize:config.deviceWidth*(1/30)}}>건물 이름</Text>
                    </View>

                    <View style={{ justifyContent:'center', alignItems:'center' }}>
                        <TextInput
                            style={{
                                borderColor:'rgba(255,123,98,0.75)',
                                borderRadius:25,
                                paddingLeft:config.deviceWidth*(1/25),
                                height:config.deviceHeight*(1/20),
                                width:'85%',
                                fontSize:config.deviceWidth*(1/30),
                                backgroundColor:'rgba(255,123,98,0.75)',
                                color:'#ffffff',
                                paddingVertical:0}}
                            placeholder='건물 이름 입력'
                            placeholderTextColor='#ffffff'
                            underlineColorAndroid='transparent'
                            onChangeText={this.update_building_name}
                            />
                    </View>
                </View>


                <View style={{ borderWidth:1, borderRadius:10, borderColor: '#3e3938', paddingVertical:config.deviceWidth*(1/20), margin:config.deviceWidth*(1/80) }}>
                    <View style={{paddingLeft:config.deviceWidth*(1/10), paddingBottom:config.deviceWidth*(1/30)}}>
                        <Text style={{color:'#3e3938', fontWeight:'bold', fontSize:config.deviceWidth*(1/30)}}>방 스타일</Text>
                    </View>

                    <View style={{ justifyContent:'center', alignItems:'center' }}>
                        <TextInput
                            style={{
                                borderColor:'rgba(255,123,98,0.75)',
                                borderRadius:25,
                                paddingLeft:config.deviceWidth*(1/25),
                                height:config.deviceHeight*(1/20),
                                width:'85%',
                                fontSize:config.deviceWidth*(1/30),
                                backgroundColor:'rgba(255,123,98,0.75)',
                                color:'#ffffff',
                                textShadowColor :'rgba(255,123,98,0.75)',
                                textDecorationColor:'rgba(255,123,98,0.75)',
                                paddingVertical:0,
                                
                            
                            }}
                            placeholder='방 스타일 입력'
                            placeholderTextColor='#ffffff'
                            underlineColorAndroid='transparent'
                            onChangeText={this.update_room_style}
                            />
                    </View>
                </View>




                <View style={{ borderWidth:1, borderRadius:10, borderColor: '#3e3938', paddingVertical:config.deviceWidth*(1/20), margin:config.deviceWidth*(1/80) }}>

                    <View style={{paddingLeft:config.deviceWidth*(1/10), paddingBottom:config.deviceWidth*(1/30)}}>
                        <Text style={{color:'#3e3938', fontWeight:'bold', fontSize:config.deviceWidth*(1/30)}}>방 개수</Text>
                    </View>

                    <View style={{ justifyContent:'center', alignItems:'center' }}>
                        <ButtonGroup
                            buttons={room}
                            selectedIndex={this.state.value_room} 
                            onPress={ this.update_room }
                            containerStyle={{borderColor:'rgba(255,123,98,0.75)',  borderRadius:25,height:config.deviceHeight*(1/20), width:'85%',  backgroundColor:'#ffffff'}}
                            textStyle={{fontSize: config.deviceWidth*(1/27),color:'#3e3938' }}
                            innerBorderStyle={{color: 'rgba(255,123,98,0.75)'}}
                            selectedButtonStyle={{backgroundColor:'rgba(255,123,98,0.75)'}}
                            selectedTextStyle={{color:'#ffffff', fontWeight:'bold'}} />
                    </View>
                
                </View>

                <View style={{ borderWidth:1, borderRadius:10, borderColor: '#3e3938', paddingVertical:config.deviceWidth*(1/20), margin:config.deviceWidth*(1/80) }}>

                    <View style={{paddingLeft:config.deviceWidth*(1/10), paddingBottom:config.deviceWidth*(1/30)}}>
                        <Text style={{color:'#3e3938', fontWeight:'bold', fontSize:config.deviceWidth*(1/30)}}>계약 조건</Text>
                    </View>

                    <View style={{ justifyContent:'center', alignItems:'center' }}>
                        <ButtonGroup
                            buttons={condition}
                            selectedIndex={this.state.value_condition} 
                            onPress={ this.update_condition }
                            containerStyle={{borderColor:'rgba(255,123,98,0.75)',  borderRadius:25,height:config.deviceHeight*(1/20), width:'85%', backgroundColor:'#ffffff'}}
                            textStyle={{fontSize: config.deviceWidth*(1/27),color:'#3e3938' }}
                            innerBorderStyle={{color: 'rgba(255,123,98,0.75)'}}
                            selectedButtonStyle={{backgroundColor:'rgba(255,123,98,0.75)'}}
                            selectedTextStyle={{color:'#ffffff', fontWeight:'bold'}} />
                    </View>
                
                </View>

                        
                <View style={{borderWidth:1, borderRadius:10, borderColor: '#3e3938', paddingVertical:config.deviceWidth*(1/20), margin:config.deviceWidth*(1/80)}}>
                    <View style={{paddingLeft:config.deviceWidth*(1/10), paddingBottom:config.deviceWidth*(1/30) }}>
                        <Text style={{color:'#3e3938', fontWeight:'bold', fontSize:config.deviceWidth*(1/30)}}>보증금</Text>
                    </View>

                    <View style={{borderColor:'rgba(255,123,98,0.75)',  borderRadius:25, height:config.deviceHeight*(1/20), width:'50%', fontSize:config.deviceWidth*(1/30), backgroundColor:'rgba(255,123,98,0.75)', color:'#ffffff', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'flex-end', marginRight:'7.5%'}}>
                        <TextInput
                            style={{
                                height:config.deviceHeight*(1/25), 
                                width:'60%', 
                                fontSize:config.deviceWidth*(1/30), 
                                color:'#ffffff', 
                                paddingVertical:0}}
                            keyboardType='numeric'
                            maxLength={5}
                            onChangeText={this.update_deposit}
                        />
                        <Text style={{color:'#ffffff'}}>만원</Text>
                    </View>
                </View>


                <View style={{borderWidth:1, borderRadius:10, borderColor: '#3e3938', paddingVertical:config.deviceWidth*(1/20), margin:config.deviceWidth*(1/80)}}>
                    <View style={{paddingLeft:config.deviceWidth*(1/10), paddingBottom:config.deviceWidth*(1/30) }}>
                        <Text style={{color:'#3e3938', fontWeight:'bold', fontSize:config.deviceWidth*(1/30)}}>방 가격</Text>
                    </View>

                    <View style={{borderColor:'rgba(255,123,98,0.75)',  borderRadius:25, height:config.deviceHeight*(1/20), width:'50%', fontSize:config.deviceWidth*(1/30), backgroundColor:'rgba(255,123,98,0.75)', color:'#ffffff', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'flex-end', marginRight:'7.5%'}}>
                        <TextInput
                            style={{height:config.deviceHeight*(1/25), width:'60%', fontSize:config.deviceWidth*(1/30), color:'#ffffff', paddingVertical:0}}
                            keyboardType='numeric'
                            maxLength={5}
                            onChangeText={this.update_room_price}
                        />
                        <Text style={{color:'#ffffff'}}>만원</Text>
                    </View>
                </View>


                <View style={{borderWidth:1, borderRadius:10, borderColor: '#3e3938', paddingVertical:config.deviceWidth*(1/20), margin:config.deviceWidth*(1/80)}}>
                    <View style={{paddingLeft:config.deviceWidth*(1/10), paddingBottom:config.deviceWidth*(1/30) }}>
                        <Text style={{color:'#3e3938', fontWeight:'bold', fontSize:config.deviceWidth*(1/30)}}>관리비</Text>
                    </View>

                    <View style={{borderColor:'rgba(255,123,98,0.75)',  borderRadius:25, height:config.deviceHeight*(1/20), width:'50%', fontSize:config.deviceWidth*(1/30), backgroundColor:'rgba(255,123,98,0.75)', color:'#ffffff', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'flex-end', marginRight:'7.5%'}}>
                        <TextInput
                            style={{height:config.deviceHeight*(1/25), width:'60%', fontSize:config.deviceWidth*(1/30), color:'#ffffff', paddingVertical:0}}
                            keyboardType='numeric'
                            maxLength={5}
                            onChangeText={this.update_fee}
                        />
                        <Text style={{color:'#ffffff'}}>만원</Text>
                    </View>
                </View>

        
                <TouchableOpacity
                    style={{borderWidth:1, borderRadius:10, borderColor: '#3e3938', paddingVertical:config.deviceWidth*(1/20), margin:config.deviceWidth*(1/80)}}
                    onPress={() => this.props.navigation.navigate('Post',{changepost : this.changepost})}>

                    <View style={{flexDirection:'row',paddingLeft:config.deviceWidth*(1/10), paddingBottom:config.deviceWidth*(1/30) }}>
                        <Text style={{color:'#3e3938', fontWeight:'bold', fontSize:config.deviceWidth*(1/30)}}>주소입력</Text>

                        <View style = {{flex:1,flexDirection:'row', justifyContent:'flex-end', alignItems:'center', marginRight:'7.5%'}}>
                            <Text style={{fontSize:config.deviceWidth*(1/30)}}>주소 검색</Text>
                            <Icon name="arrow-right" size={config.deviceWidth*(1/27)} style={{paddingLeft:config.deviceWidth*(1/50)}} color='#3e3938' />
                        </View>
                    </View>

                    <View style={{paddingLeft:config.deviceWidth*(1/10)}}>
                        <Text>{this.state.ro_loc_col}</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ borderWidth:1, borderRadius:10, borderColor: '#3e3938', paddingVertical:config.deviceWidth*(1/20), margin:config.deviceWidth*(1/80) }}>

                    <View style={{paddingLeft:config.deviceWidth*(1/10), paddingBottom:config.deviceWidth*(1/30)}}>
                        <Text style={{color:'#3e3938', fontWeight:'bold', fontSize:config.deviceWidth*(1/30)}}>옵션</Text>
                    </View>

                    <View style={{ justifyContent:'center', alignItems:'center' }}>
                        <ButtonGroup
                            buttons={option1}
                            selectedIndexes = { this.state.option1 }
                            onPress={ this.update_option1 }
                            selectMultiple = {true}
                            containerStyle={{borderColor:'rgba(255,123,98,0.75)', height:config.deviceHeight*(1/20), width:'85%',  backgroundColor:'#ffffff'}}
                            textStyle={{fontSize: config.deviceWidth*(1/27),color:'#3e3938' }}
                            innerBorderStyle={{color: 'rgba(255,123,98,0.75)'}}
                            selectedButtonStyle={{backgroundColor:'rgba(255,123,98,0.75)'}}
                            selectedTextStyle={{color:'#ffffff', fontWeight:'bold'}} />
                        <ButtonGroup
                            buttons={option2}
                            selectedIndexes = { this.state.option2 }
                            onPress={ this.update_option2 }
                            selectMultiple = {true}
                            containerStyle={{borderColor:'rgba(255,123,98,0.75)', height:config.deviceHeight*(1/20), width:'85%',  backgroundColor:'#ffffff'}}
                            textStyle={{fontSize: config.deviceWidth*(1/27),color:'#3e3938' }}
                            innerBorderStyle={{color: 'rgba(255,123,98,0.75)'}}
                            selectedButtonStyle={{backgroundColor:'rgba(255,123,98,0.75)'}}
                            selectedTextStyle={{color:'#ffffff', fontWeight:'bold'}} />
                        <ButtonGroup
                            buttons={option3}
                            selectedIndexes = { this.state.option3 }
                            onPress={ this.update_option3 }
                            selectMultiple = {true}
                            containerStyle={{borderColor:'rgba(255,123,98,0.75)', height:config.deviceHeight*(1/20), width:'85%',  backgroundColor:'#ffffff'}}
                            textStyle={{fontSize: config.deviceWidth*(1/27),color:'#3e3938' }}
                            innerBorderStyle={{color: 'rgba(255,123,98,0.75)'}}
                            selectedButtonStyle={{backgroundColor:'rgba(255,123,98,0.75)'}}
                            selectedTextStyle={{color:'#ffffff', fontWeight:'bold'}} />
                        <ButtonGroup
                            buttons={option4}
                            selectedIndexes = { this.state.option4 }
                            onPress={ this.update_option4 }
                            selectMultiple = {true}
                            containerStyle={{borderColor:'rgba(255,123,98,0.75)', height:config.deviceHeight*(1/20), width:'85%',  backgroundColor:'#ffffff'}}
                            textStyle={{fontSize: config.deviceWidth*(1/27),color:'#3e3938' }}
                            innerBorderStyle={{color: 'rgba(255,123,98,0.75)'}}
                            selectedButtonStyle={{backgroundColor:'rgba(255,123,98,0.75)'}}
                            selectedTextStyle={{color:'#ffffff', fontWeight:'bold'}} />
                    </View>
                    
                
                </View>

                <View style={{paddingVertical:config.deviceHeight*(1/20)}}/>

                <View style={{justifyContent:'flex-end', alignItems:'center'}}>
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

            </ScrollView>
          
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
        width: config.deviceWidth*(5/6),
        height: config.deviceHeight*(1/18),
        paddingTop:0,
        paddingBottom:0,
        textAlign:'center'
    },
    loginbutton : {
        borderRadius: 20,
        backgroundColor: '#3e3938',
        borderWidth: 1,
        borderColor: '#3e3938',
        width: config.deviceWidth*(5/6),
        height: config.deviceHeight*(1/10),
        alignItems : 'center',
        justifyContent : 'center',
        shadowColor : 'rgba(256,256,256,1)',
        shadowOpacity:0.5,
        shadowRadius:15,
        shadowOffset: {width:1, height:15},
        elevation:10
    },
    logintext : {
        fontSize: config.deviceWidth*(1/20),
        fontWeight: 'bold',
        color: '#ffffff',
    }
    
})