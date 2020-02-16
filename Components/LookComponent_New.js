import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import call from "react-native-phone-call";
import config from "../Components/Config";

export default class LookComponent extends React.Component {
  // handler to make a call

  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          paddingTop: 2,
          paddingLeft: 2,
          height:config.deviceWidth*(1/3),
          flexDirection: "row",
          paddingBottom: 2,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          shadowColor: "rgba(0,0,0, 0.3)",
          shadowOffset: { height: 3, width: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 15,
          backgroundColor: "#fff",
          elevation: 8, // Android
          
          //height: 110,
          marginTop: config.deviceWidth*(1/20)
        }}
        onPress={() =>
          this.props.navi(
            this.props.data.ro_name_col,
            this.props.data.ro_style_col
          )
        }
      >
        <Image
          source={{ uri: this.props.image }}
          style={{
            // width: 130,
            flex: 9,
            height: "100%",
            // width: 150,
            // height: 100
            // overflow: "hidden"
            // resizeMode: "cover"
            // backgroundColor: "red"
            // aspectRatio: 1.3
            borderRadius: 15
          }}
        />
        <View style={{ flex: 1 }} />
        <View
          style={{
            flex: 7,
            flexDirection: "column",
            backgroundColor: ""
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignContent: "flex-start",
              justifyContent: "center"
            }}
          >
            <View style={{ flex: 7, backgroundColor: "" }}>
              <Text
                style={{
                  fontSize: 8,
                  fontWeight: "300",
                  color: "#ff7b62",
                  paddingRight: 5,
                  fontWeight: "bold",
                  paddingTop: 15
                }}
              >
                {this.props.num === 0 ? '++직거래' : '++부동산'}
              </Text>
              <Text
                style={{
                  fontSize: config.deviceWidth*(1/30),
                  fontWeight: "300",
                  color: "#3e3938",
                  paddingRight: 5,
                  fontWeight: "500",
                  marginTop: 5,
                  fontWeight: "bold",
                  marginBottom: 5
                }}
              >
                {this.props.data.ro_name_col} / {this.props.data.ro_style_col}
              </Text>

              <View style={{flex:1,flexDirection:'row', alignItems:'center', paddingBottom:5}}>
                    <View style={{paddingRight:5}}>
                        <Text style={{fontSize:config.deviceWidth*(1/35), fontWeight:'300',color:'#bfbfbf',paddingRight:5, fontWeight:'500'}}>
                            계약조건
                        </Text>
                        <Text style={{fontSize:config.deviceWidth*(1/35), fontWeight:'300',color:'#bfbfbf',paddingRight:5, fontWeight: '500'}}>
                            방 형태
                        </Text>
                        <Text style={{fontSize:config.deviceWidth*(1/35), fontWeight:'300',color:'#bfbfbf',paddingRight:5, fontWeight: '500'}}>
                            금   액
                        </Text>
                    </View>

                    <View>
                        <Text style={{fontSize:config.deviceWidth*(1/33), fontWeight:'300',color:'#000000',paddingRight:5, fontWeight:'500'}}>
                             {this.props.data.ro_con_col}
                        </Text>
                        <Text style={{fontSize:config.deviceWidth*(1/33), fontWeight:'300',color:'#000000',paddingRight:5, fontWeight: '500'}}>
                            {this.props.data.ro_size_col}
                        </Text>
                        <Text style={{fontSize:config.deviceWidth*(1/33), fontWeight:'300',color:'#000000',paddingRight:5, fontWeight: '500'}}>
                            {this.props.data.ro_price_col}만원 ...
                        </Text>
                    </View>
                  
                  
                </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1
          }}
        />
      </TouchableOpacity>
    );
  }
}