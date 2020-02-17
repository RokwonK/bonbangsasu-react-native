import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    SafeAreaView
  } from "react-native";
  import React, { Component } from "react";
  
  import FeedhoScreen from "./FeedhoScreen";
  import FeedreScreen from "./FeedreScreen";
  import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
  import SwitchSelector from "react-native-switch-selector";
  import config from "../Components/Config";
  import { Header } from 'react-native-elements';
  
  const basicColor = 'rgba(255,123,98,0.75)';
  const textColor = '#3e3938';
  
  export default class MainFeedScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        real_estate: false,
        valueChoiced: 0,
        loaderLoading:true
      };
    }

    _naviga_ho = (real_name, real_style) => {
        this.props.navigation.navigate("Look", {
          name: real_name,
          style: real_style,
          table: 1
        });
    };

    _naviga_re = (real_name, real_style) => {
        this.props.navigation.navigate("Look", {
          name: real_name,
          style: real_style,
          table: 0
        });
      };
  
    choiceSalesType() {
      if (this.state.real_estate) {
        return (
          <View
            style={{
              height: config.deviceHeight*(1/15),
              backgroundColor: "",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingStart: 20
            }}
          >

            

            <TouchableOpacity
              style={{
                borderRadius: 40,
                height: config.deviceHeight*(1/20),
                width: config.deviceWidth*(1/5),
                borderColor: "#3e3938",
                borderWidth: 1.5,
                justifyContent: "center",
                alignItems: "center",
                
                backgroundColor: "#ffffff"
              }}
              onPress={() => {
                this.setState({ real_estate: false });
              }}
            >
              <Text
                style={{ fontSize: config.deviceWidth*(1/37), color: "#3e3938", fontWeight: "bold" }}
              >
                직거래
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 40,
                height: config.deviceHeight*(1/20),
                width: config.deviceWidth*(1/5),
                borderColor: "#ffffff",
                borderWidth: 1.5,
                justifyContent: "center",
                alignItems: "center",
                marginStart: 8,
                backgroundColor: "#3e3938"
              }}
              onPress={() => {
                this.setState({ real_estate: true });
              }}
            >
              <Text
                style={{ fontSize: config.deviceWidth*(1/30), color: "#ffffff", fontWeight: "bold" }}
              >
                부동산
              </Text>
            </TouchableOpacity>
            
            <SwitchSelector
              initial={0}
              onPress={value => this.refs.FeedreScreen.updatePrice(value)}
              textColor={"#3e3938"}
              selectedColor={"#FFFFFF"}
              buttonColor={"#3e3938"}
              borderColor={"#3e3938"}
              borderWidth={0.1}
              style={{
                marginTop: 7,
                width: 115,
                position: "absolute",
                end: 10,
                borderWidth: 1,
                borderRadius: 100,
                fontWeight: "bold"
              }}
              fontSize={10}
              bold
              fontWeight={"bold"}
              height={23}
              options={[
                { label: "가격 ▼", value: 0 },
                { label: "가격 ▲", value: 1 }
              ]}
            />
          </View>
        );
      } else {
        return (
          <View
            style={{
              height: config.deviceHeight*(1/15),
              backgroundColor: "",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingStart: 20
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 40,
                height: config.deviceHeight*(1/20),
                width: config.deviceWidth*(1/5),
                borderColor: "#3e3938",
                borderWidth: 1.5,
                justifyContent: "center",
                alignItems: "center",
                
                backgroundColor: "#3e3938"
              }}
              onPress={() => {
                this.setState({ real_estate: false });
              }}
            >
              <Text style={{ fontSize: config.deviceWidth*(1/30), color: "#fff", fontWeight: "bold" }}>
                직거래
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 40,
                height: config.deviceHeight*(1/20),
                width: config.deviceWidth*(1/5),
                borderColor: "#3e3938",
                borderWidth: 1.5,
                justifyContent: "center",
                alignItems: "center",
                marginStart: 8,
                backgroundColor: "#fff"
              }}
              onPress={() => {
                this.setState({ real_estate: true });
              }}
            >
              <Text
                style={{ fontSize: config.deviceWidth*(1/37), color: "#3e3938", fontWeight: "bold" }}
              >
                부동산
              </Text>
            </TouchableOpacity>
            
            <SwitchSelector
              initial={0}
              onPress={value => this.refs.FeedhoScreen.updatePrice(value)}
              textColor={"#3e3938"}
              selectedColor={"#FFFFFF"}
              buttonColor={"#3e3938"}
              borderColor={"#3e3938"}
              borderWidth={0.1}
              style={{
                marginTop: 7,
                width: 115,
                position: "absolute",
                end: 10,
                borderWidth: 1,
                borderRadius: 100,
                fontWeight: "bold"
              }}
              fontSize={10}
              bold
              fontWeight={"bold"}
              height={23}
              options={[
                { label: "가격 ▼", value: 0 },
                { label: "가격 ▲", value: 1 }
              ]}
            />
          </View>
        );
      }
    }
  
    render() {
      return (
        <View style={{ flex: 1 }}>
          
          <Header 
            statusBarProps={{barStyle:'dark-content', translucent:true}}
            leftComponent={ <MIcon
              name="arrow-left-circle"
              size={config.deviceWidth * (1 / 9)}
              color={textColor}
              onPress={() => this.props.navigation.goBack()}/> }
            centerComponent={{text:'검색결과', style:{fontWeight: "bold",color: "#000000",fontSize: 18} }}
            containerStyle={{
              backgroundColor: '#ffffff',
              borderBottomWidth:0,
              justifyContent: 'space-around'}}
            />
            <Modal
              transparent={true}
              animationType={'none'}
              visible={this.state.loaderLoading}>
              
              <SafeAreaView style={{ width:config.deviceWidth, height:config.deviceHeight, alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0,0.5)'}}>
                <View style={{backgroundColor:'#ffffff', marginHorizontal:config.deviceWidth*(1/30), borderRadius:10}}>
                
                  <Text style={{fontWeight: "bold",color: "#000000",fontSize:config.deviceWidth*(1/20), alignSelf:'center', marginVertical:config.deviceWidth*(1/10), textDecorationLine:'underline'}}>주의사항</Text>
                  
                  <View style={{paddingHorizontal:10}}>
                    <Text style={{color:'#000000', fontSize:config.deviceWidth*(1/30)}}>- 현재 매물이 계약조건 : 년세, 방개수 : 원룸에 많이 포진되어 있습니다.</Text>
                    <Text style={{color:'#000000', fontSize:config.deviceWidth*(1/30)}}>- 검색하실 때 년세 원룸으로 검색하시면 비교적 많은 매물을 보실 수 있습니다.</Text>
                    
                    <View style={{paddingVertical:15}}/>

                    
                    <Text style={{color:'#ff0000', fontSize:config.deviceWidth*(1/25), alignSelf:'center'}}>※중요※</Text>
                    
                    <Text style={{color:'#000000', fontSize:config.deviceWidth*(1/25), fontWeight:'bold', marginBottom:5}}>직거래</Text>
                    <Text style={{color:'#000000', fontSize:config.deviceWidth*(1/30)}}>
                      사용자분들께서 직거래 계약을 하실 때 반드시 집주인 분에게 등기부 등본 및 주민등록증을 확인하시어 부당한 거래 및 적절치 못한 상황이 발생하지 않도록 확인해주시길 부탁드립니다.
                      확인 불찰에 의해 벌어진 피해에 대해 ‘본방사수’는 책임을 지지 않습니다.</Text>
                    <View style={{paddingVertical:8}}/>
                    <Text style={{color:'#000000', fontSize:config.deviceWidth*(1/25), fontWeight:'bold', marginBottom:5}}>부동산</Text>
                    <Text style={{color:'#000000', fontSize:config.deviceWidth*(1/30)}}>
                      사용자분들께서 부동산 매물을 이용하실 때 매물의 위치와 건물명은 부동산으로 나오는 점 양해 부탁드리며, 부동산을 통해 거래가 성사될 시 중개 수수료(복비)가 발생할 수 있음을 미리 알려드립니다.</Text>

                  </View>

                  <View style={{borderTopWidth:1, marginTop:config.deviceWidth*(1/10), backgroundColor:textColor,borderBottomEndRadius:10, borderBottomStartRadius:10}}>
                    <TouchableOpacity 
                      style={{width:'100%',height:config.deviceWidth*(1/6), alignSelf:'center', alignItems:'center', justifyContent:'center'}}
                      onPress={() => this.setState({loaderLoading:false})}>
                        
                        <Text style={{color:'#ffffff', fontSize:config.deviceWidth*(1/25), fontWeight:'bold'}}>확인하였습니다</Text>
                    </TouchableOpacity>
                  </View>

                </View>

              </SafeAreaView>


            </Modal>
          {this.choiceSalesType()}
          {this.state.real_estate ? (
            <FeedreScreen ref="FeedreScreen" naviga={this._naviga_re}/>
          ) : (
            <FeedhoScreen ref="FeedhoScreen" naviga={this._naviga_ho}/>
          )}
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  });