import React, {Component} from 'react';
import { FlatList ,TouchableOpacity, StyleSheet, Text, View, Dimensions, ScrollView, PermissionsAndroid, Image, Alert, TextInput, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
import Carousel from 'react-native-snap-carousel';
import config from '../Components/Config';
import { Header, Badge, withBadge, Icon } from 'react-native-elements';


MIcon.loadFont();
SIcon.loadFont();
IIcon.loadFont();

const delegate = '대표사진';
const room = [ '원룸', '투룸', '투베이'];
const condition = ['반세', '년세','매매'];
export default class SalePictureScreen extends Component {


    constructor(props) {
        super(props);

        this.state = {
            photo : []
        };

    }

    uploapimage = () => {
        Alert.alert(
            '',
            '가로 사진만 가능합니다',
            [
                {text:'확인', onPress: () => this.realuploadimage() },
                {text:'취소', onPress: () => {return} }
            ],
            {cancelable: true}
        );
    };

    realuploadimage = async () => {
        await ImagePicker.openPicker({
            multiple:true,
            mediaType:'photo',
            writeTempfile: true,
        }).then(images => {
            if(images.length + this.state.photo.length > 7) {
                Alert.alert('사진은 7장 이하만 가능합니다');
                return;
            }
            images.map( image => {
                this.state.photo.push(image);
            });
            //console.log(this.state.photo);
            this.setState({photo : this.state.photo});
        });
    }

    deleteimage = (index) => {
        this.state.photo.splice(index, 1);
        this.setState({photo : this.state.photo});
    }

    imageconfirm = (index) => {
        Alert.alert(
            '',
            '사진을 삭제하시겠습니까?',
            [
                {text:'확인', onPress: () => this.deleteimage(index) },
                {text:'취소', style: 'cancel'}
            ],
            {cancelable: true}
        );
    };

    Confirm_info = () => {
        const {
            photo
        } = this.state;

        if (photo !== []) {
                this.props.navigation.state.params.change_photo(
                    {
                        photo : photo
                    });
                this.props.navigation.goBack();
        }
        else {
            Toast.show('사진을 등록해주세요', {
                duration: 3000,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });

        }
    }

    change_delegate = (index) => {
        Alert.alert(
            '',
            '대표사진으로 지정하시겠습니까?',
            [
                {text:'확인', onPress: () => {
                    let a = this.state.photo[0];
                    this.state.photo[0] = this.state.photo[index];
                    this.state.photo[index] = a;
                    this.setState({photo : this.state.photo});
                }},
                {text:'취소', style: 'cancel'}
            ],
            {cancelable: true}
        );

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
                    centerComponent={{text:'매물 사진 추가', style:{fontWeight: "bold",color: "#000000",fontSize: 18} }}
                    containerStyle={{
                        backgroundColor: '#ffffff',
                        borderBottomWidth:0,
                        justifyContent: 'space-around'}}
                />

                
                <View style={{paddingVertical:config.deviceHeight*(1/50)}}/>


                <View style={{justifyContent:'flex-start', alignItems:'center', flex:3}}>
                    
                    <Text style={{color:'#3e3938', fontSize:config.deviceWidth*(1/30), paddingBottom:config.deviceHeight*(1/50)}}>
                        사진은 7장까지 등록할 수 있습니다.
                    </Text>
                    
                    <TouchableOpacity 
                        style={{borderWidth:2, borderRadius:15, width:'75%', height:config.deviceHeight*(1/5), borderStyle:'dotted', justifyContent:'center', alignItems:'center'}}
                        onPress={() => this.uploapimage()}>
                            <MIcon name="plus-circle" size={config.deviceWidth*(1/12)} color={'#3e3938'} />
                            <Text style={{color:'#3e3938', fontSize:config.deviceWidth*(1/25), fontWeight:'bold'}}>사진 추가</Text>
                    </TouchableOpacity>
                    
                </View>

                <View style={{paddingVertical:config.deviceHeight*(1/40)}}/>

                <View style={{justifyContent:'flex-start', alignItems:'center', flex:4}}>
                {
                    this.state.photo[0] && (
                        
                            <FlatList 
                                horizontal={true}
                                data={this.state.photo}
                                contentContainerStyle={{height:config.deviceHeight*(1/4)}}
                                showsHorizontalScrollIndicator={false}
                                renderItem={ ({item,index}) => {
                                    let BadgeIcon;
                                    if(index === 0) BadgeIcon = withBadge(delegate)(Icon);
                                    else    BadgeIcon = withBadge(index+1)(Icon);

                                    return (
                                    <TouchableOpacity 
                                        style={{paddingHorizontal:20}}
                                        onPress={ () => this.change_delegate(index)}>
                                        <Image source={{uri : item.path}} style={{width:config.deviceWidth*(3/5), marginTop: config.deviceWidth*(1/20) , height:config.deviceHeight*(1/5), borderRadius:15}} />
                                        <BadgeIcon
                                            size={config.deviceWidth*(1/10)}
                                            color={'rgba(255,123,98,1)'}
                                            type='ionicon'
                                            name='ios-close-circle'
                                            containerStyle={{ position: 'absolute', top:-(config.deviceHeight*(1/5))-20, right:-config.deviceWidth*(1/80)}}
                                            onPress={ () => this.imageconfirm(index)} 
                                        />
                                    </TouchableOpacity>
                                    );
                                }}
                            />
                    )
                }
                </View>


                <View style={{justifyContent:'flex-start', alignItems:'center', flex:3}}>
                {
                    this.state.photo[0] && (                    
                    <View>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingBottom:config.deviceHeight*(1/30)}}>
                            <SIcon name="arrow-left" size={config.deviceWidth*(1/15)} color={'#3e3938'} />
                            <Text style={{fontSize:config.deviceWidth*(1/30),paddingHorizontal:config.deviceWidth*(1/20)}}>사진을 넘겨 확인해보세요.</Text>
                            <SIcon name="arrow-right" size={config.deviceWidth*(1/15)} color={'#3e3938'} />
                        </View>
                        
                    </View>
                    )
                }
                </View>

                <View style={{justifyContent:'flex-end', alignItems:'center', flex:1}}>
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