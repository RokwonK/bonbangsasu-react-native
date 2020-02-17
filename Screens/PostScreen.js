import React, { Component } from 'react';
import { View } from 'react-native';
import Postcode from 'react-native-daum-postcode';
import config from '../Components/Config';
import { Header } from 'react-native-elements'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

MIcon.loadFont();

export default class PostScreen extends Component{
    
    
    render() {
        return(
            <View style={{width:'100%', height:'100%'}}>
                <Header 
                    statusBarProps={{barStyle:'dark-content', translucent:true}}
                    leftComponent={ <MIcon
                        name="arrow-left-circle"
                        size={config.deviceWidth * (1 / 9)}
                        color={'#3e3938'}
                        onPress={() => this.props.navigation.goBack()}/> }
                    centerComponent={{text:'주소 검색', style:{fontWeight: "bold",color: "#000000",fontSize: 18} }}
                    containerStyle={{
                        backgroundColor: '#ffffff',
                        borderBottomWidth:0,
                        justifyContent: 'space-around'}}
                />
                <Postcode
                    style={{ flex:1 }}
                    jsOptions={{ animated: true}}
                    onSelected={(data) => {
                        this.props.navigation.state.params.changepost({ro_loc_col:data.roadAddress});
                        this.props.navigation.goBack();
                    }}
                />
            </View>
    )};
  
  
};