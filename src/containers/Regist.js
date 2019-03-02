import React, {
  Component
} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  Fetch,
} from 'react-native';
import url from "../common/url"
export default class Regist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userNameTip: "手机号",
      userName: "",
      userPWTip: "验证码",
      userPW: ""
    };
  }

  static navigationOptions = {
    title: '注册',
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
              onPress={this.onClickRegist}>
              <Text style={{color:'black'}}>注册</Text>
          </TouchableHighlight>
      </View>
    );
  }
  getPhoneCode = () => {
    alert('验证码：123456')
  }

  onClickRegist = () => {
    fetch(url.register, {
        method: "post",
        mode: 'cors',
        body: JSON.stringify({
          Phone: this.state.userName,
          Pwd: this.state.userPW
        })
      }).then(response => response.json())
      .then(data => {
        if (data.status == "-1") {
          alert(data.err)
        } else if (data.status == "0") {
          alert('注册完成，请登陆')
          this.props.navigation.navigate('Login', )
        }
      })
      .catch(error => console.warn('error is', error));
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