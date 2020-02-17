import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MyButton from "../Components/MyButton";
import React from "react";
import config from "../Components/Config";
import SplashScreen from 'react-native-splash-screen'

const textColor = "#3e3938";

export default class RouteScreen extends React.Component {
  constructor(props) {
    super(props);

    
  }

  componentDidMount = () => {
    setTimeout(() => {
      SplashScreen.hide();
      
    }, 1000);

    //this.checkExit();
  };
  /*
  checkExit() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      Alert.alert(
        "앱을 종료하시겠습니까?",
        "",
        [
          {
            text: "아니오",
            style: "cancel"
          },
          { text: "예", onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
      );
      return true;
    });
  }*/

  _pickscreen = async () => {
    this.props.navigation.navigate("Select");
  };

  render() {
    return (
        
          <View style={{ flex: 1 }}>
            <View style={styles.introduce}>
              <Image
                style={{
                  height: config.deviceHeight * 0.3,
                  width: config.deviceWidth * 0.3,
                  resizeMode: "contain",
                  
                  
                }}
                source={require("../Images/login.png")}
              />
              <Text style={styles.intro_text1}>내가 본 방</Text>
              <Text style={styles.intro_text1}>너로 정했다!</Text>
            </View>

            <View style={styles.empty}></View>

            <View style={styles.button}>
              <MyButton
                title={"방 구하기"}
                titleSize={25}
                buttonColor={textColor}
                titleColor={"#FFFFFF"}
                onPress={() => this.props.navigation.navigate("Selection")}
              />
              <MyButton
                title={"방 내놓기"}
                titleSize={25}
                buttonColor={textColor}
                titleColor={"#FFFFFF"}
                onPress={() => this._pickscreen()}
              />
              <View stlye={{ padding: config.deviceHeight * 0.07 }} />
            </View>
          </View>
      
    );
  }
}

const styles = StyleSheet.create({
  introduce: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: config.deviceHeight * 0.1
  },
  intro_text1: {
    color: textColor,
    fontSize: config.deviceWidth*(1/20),
    fontWeight: "bold"
  },
  empty: {
    flex: 0.5
  },
  button: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: config.deviceHeight*(1/20)
  }
});