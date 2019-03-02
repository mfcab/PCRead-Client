import React, {
  Component
} from 'react';
import url from "../common/url"
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  AsyncStorage,
  Fetch,
  DeviceEventEmitter
} from 'react-native';
export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userNameTip: "手机号",
      userName: "",
      userPWTip: "验证码",
      userPW: "",
    };
  }

  static navigationOptions = {
    title: '登录',
  };

  render() {
    return (
      <View style={styles.container}>
          <View style = {styles.inputView}>
              <View style = {styles.inputCellStyle}>
                  <Text style={styles.welcome}>
                  {this.state.userNameTip}
                  </Text>
                  <TextInput style={styles.inputViewStyle}
                       onChangeText = {(text) => {
                          this.setState({userName: text});
                     }}
                      placeholder="请输入手机号"
                  />
              </View>
              <View style = {styles.inputCellStyle}>
                  <Text style={styles.welcome}>
                      {this.state.userPWTip}
                  </Text>
                  <TextInput style={styles.inputViewStyle}
                      secureTextEntry={true}
                       onChangeText = {(text) => {
                         this.setState({userPW: text});
                     }}
                      placeholder="请输入验证码"
                  ></TextInput>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                  <TouchableHighlight
              style={{backgroundColor:'#D6D6D6',height: 30,width: 90,marginRight: 10,borderRadius: 5,justifyContent:'center',alignItems:'center'}}
              activeOpacity={0.5}
              onPress={this.getPhoneCode}>
              <Text style={{color:'gray'}}>获取验证码</Text>
          </TouchableHighlight>
          </View>
              </View>
          </View>
          <TouchableHighlight
              style={{backgroundColor:'#428bca',height: 50,margin: 20,borderRadius: 5,justifyContent:'center',alignItems:'center'}}
              activeOpacity={0.5}
              onPress={this.onClickLogin}>
              <Text style={{color:'black'}}>登陆</Text>
          </TouchableHighlight>
      </View>
    );
  }
  getPhoneCode = () => {
    alert('验证码：123456')
  }
  onClickLogin = () => {
    fetch(url.login, {
        method: "post",
        mode: 'cors',
        body: JSON.stringify({
          Phone: this.state.userName,
          Pwd: this.state.userPW
        })
      }).then(response => response.json())
      .then(data => {
        if (data.status == "-1") {
          Alert.alert("验证码错误")
        } else if (data.status == "0") {
          alert("登陆成功")
          AsyncStorage.setItem("token", data.token, function(error) {
            if (error) {
              alert('存储失败')
            }
          })
        }
        /*        AsyncStorage.getItem("token", function(error, result) {
                  if (error) {
                    alert('读取失败')
                  } else {
                    console.warn(result)
                    alert('读取完成')
                  }
                })*/
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack()
        DeviceEventEmitter.emit('fress');
      })
      .catch(error => console.warn('error is', data));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
  inputView: {
    marginTop: 20,
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  inputCellStyle: {
    flex: 0.5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5
  },
  welcome: {
    fontSize: 14,
    textAlign: 'left',
    margin: 10,
    height: 16.5,
    width: 100,
  },
});