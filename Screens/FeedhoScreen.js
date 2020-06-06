import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import LookComponent_New from "../Components/LookComponent_New";
import React from "react";
import config from "../Components/Config";
import Loader from "../Components/Loader";

const { url } = config;

export default class FeedhoScreen extends React.Component {
  // SelectionScreen의 navigation.parameter로 넘어온값 초기화
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.condition = "";
    this.room = "";
    this.price = "";
    this.state = {
      // db에서 받아온 json 데이터 배열
      data: [],
      isLoading: false,
      isEmptyData: false,
      images: [],
      count: null,
      length: 0,

      // 낮은 가격순, 높은 가격순 select버튼 값 (0: 낮은가격순, 1: 높은가격순)
      sorting_price: 0,
      loaderLoading : false
    };
  }

  // 서버와 이미지 데이터 통신
  async getImageData(ro_name_col, ro_style_col) {
    try {
      const data = await fetch(`${url}/photo/${ro_name_col}/${ro_style_col}`);
      const processed_data = await data.json();

      return processed_data;
    } catch (err) {
      console.log(err);
    }
  }

  // 서버와 DB 데이터 통신
  async getData() {
    let image_list = [];
    try {
      let data = await fetch(
        `${url}/feed/1/${this.state.sorting_price}/'${this.condition}'/'${this.room}'/${this.price}/${this.state.length}`
      );
      let processed_data = await data.json();

      // 이미지 데이터 배열화 통신
      for (let i = 0; i < processed_data.length; i++) {
        this.state.data.push(processed_data[i]);
        this.state.images.push(
          await this.getImageData(
            processed_data[i].ro_name_col,
            processed_data[i].ro_style_col
          )
        );
      }

      this.setState({
        data: this.state.data,
        images: this.state.images,
        isEmptyData: false,
        isLoading: true
      });

      // 매물이 없을시 예외 처리
      if (this.state.data[0] === undefined) {
        this.setState({
          isEmptyData: true
        });
      }

      this.setState({ length: this.state.data.length });
    } catch (err) {
      console.log(1);
    }
  }

  // 첫 컴포넌트 마운트 이후 서버와 통신
  componentDidMount = async () => {
    // 세 개 동시에

    this.condition = await AsyncStorage.getItem("condition");
    this.room = await AsyncStorage.getItem("room");
    this.price = await AsyncStorage.getItem("price");

    const realdata = await fetch(
      `${url}/count/1/'${this.condition}'/'${this.room}'/${this.price}`
    );
    const data = await realdata.json();

    this.setState({ count: data[0].ro_count_col });

    this.getData();
  };
  

  // state, props값 업데이트시 서버와 통신
  componentDidUpdate = (prevProps, prevState) => {
    if (
      JSON.stringify(this.state.sorting_price) !==
      JSON.stringify(prevState.sorting_price)
    ) {
      //this.setState({data : [], images: [], isLoading:false, length: 0})
      this.getData();
    }
    
  }

  // SwitchSelector의 onPress callback함수(parameters : value(SwitchSelector.Item의 value))
  updatePrice = value => {
    if (value !== this.state.sorting_price) {
      if (value === 0) {
        this.setState({ sorting_price: 0 });
        this.setState({ data: [], images: [], isLoading: false, length: 0 });
      } else {
        this.setState({ sorting_price: 1 });
        this.setState({ data: [], images: [], isLoading: false, length: 0 });
      }
    }
  };

  

  render() {
    if (this.state.isLoading === false) {
      return (
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: "center",
            backgroundColor: "#ffffff",
            flex:1
          }}
        >
            <View style={{flex:1}}/>
            <Image
              source={require("../Images/searching.gif")}
              style={{
                width: config.deviceWidth*(1/2),
                resizeMode: "contain"
              }}
            />
            <View style={{flex:1}}/>
        </View>
      );
    } else if (this.state.isEmptyData === true) {
      return (
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: "#ffffff",
            flex:1
          }}
        >
            <View style={{flex:1}}/>
            <Image
              source={require("../Images/nosales.png")}
              style={{
                width: config.deviceWidth * (1 / 2),
                resizeMode: "contain"
              }}
            />
            <View style={{flex:1}}/>
            
            
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              paddingStart: 7,
              paddingEnd: 7,
              width: "100%"
            }}
          >
            <Loader maintext='매물을 받아오는 중입니다' load={this.state.loaderLoading}/>
            {this.state.data.map((data, index) => (
              <LookComponent_New
                data={data}
                key={index}
                image={this.state.images[index][0]}
                navi={this.props.naviga}
                num={0}
              />
            ))}

            <View style={{ paddingBottom: 7 }} />
            {this.state.data.length < this.state.count ? (
              <TouchableOpacity
                style={{
                  color: "#6600cc",
                  marginVertical: 20,
                  flex: 1,
                  borderColor: "#3e3938",
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '70%',
                  height: 50,
                  flex: 1,
                  alignItems: "center",
                  alignContent: "center",
                  backgroundColor: ""
                }}
                onPress={async () => {
                  this.setState({loaderLoading:true});
                  await this.getData();
                  this.setState({loaderLoading:false});
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: config.deviceWidth*(1/30), color: "#000" ,fontWeight:'bold'}}>더보기 </Text>
                  <Text style={{ fontSize: config.deviceWidth*(1/30), color: "#ff7b62" ,fontWeight:'bold'}}>+</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={{ paddingBottom: 2 }} />
            )}
            <View style={{ paddingBottom: 7 }} />
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  header: {
    height: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingStart: 20
  },
  switch1: {
    flex: 1
  },
  switch2: {
    flex: 1
  }
});