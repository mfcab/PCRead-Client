import React, {
  Component
} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  StyleSheet,
  View,
  Text,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'
import url from "../common/url"
export default class SelfInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onload: false,
      name: ""
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(token => {
        fetch(url.getSelfBook, {
            method: "post",
            mode: 'cors',
            headers: {
              "token": token
            },
          }).then(response => response.json())
          .then(data => {
            this.setState({
              onload: true,
              name: data.user
            });
          })
      })
  }
  LoginOut = () => {
    this.setState({
      onload: false
    });
    AsyncStorage.clear(function(error) {
      if (error) {
        alert('退出失败')
      }
    })
  }
  init = () => {
    AsyncStorage.getItem('token')
      .then(token => {
        fetch(url.getSelfBook, {
            method: "post",
            mode: 'cors',
            headers: {
              "token": token
            },
          }).then(response => response.json())
          .then(data => {
            this.setState({
              onload: true,
              name: "GPC"
            });
          })
      })
  }
  render() {
    if (this.state.onload) {
      return (
        <View style={styles.container}>
        <View style={styles.viewUser}>
          <View style={styles.viewUserTop}>
            <Image style={styles.imgUserTitle} source={require('../img/一剑娇仙.jpg')}/>
          </View>
          <Text style={styles.txtName}>{this.state.name}</Text>
          <Text style={styles.txtGF}>关注 0   |   粉丝 0</Text>
          <TouchableOpacity onPress={this.LoginOut}>
          <View style={styles.viewEdit} onPress={this.LoginOut}>
            <Icon name='pencil-square-o' style={styles.iconEdit} size={15}/>
            <Text style={styles.txtEdit}>注销</Text>
          </View></TouchableOpacity>
        </View>
        <View style={styles.viewLove}>
          <View style={styles.viewLoveTop}>
            <Text style={styles.txtCommon}>最近观看</Text>
            <Icon style={styles.iconCommon} name='angle-right' size={20}/>
          </View>
          <View style={styles.viewContent}>
            <Image style={styles.imgLove} source={require('../img/一剑娇仙.jpg')}/>
          </View>
        </View>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Joke",{load:true})}>
        <View style={styles.viewCommon}>
          <Text style={styles.txtCommon}>我的书库</Text>
          <Icon style={styles.iconCommon} name='angle-right' size={20}/>
        </View>
        </TouchableOpacity>
        <View style={styles.viewCommon}>
          <Text style={styles.txtCommon}>PC阅读器0.1</Text>
          <Icon style={styles.iconCommon} name='angle-right' size={20}/>
        </View>
      </View>
      )
    } else {
      return (
        <View style={styles.container}>
        <View style={styles.viewUser2}>
          <View style={styles.viewUserTop}>
            <Image style={styles.imgUserTitle} source={require('../img/userimg.png')}/>
          </View>
          <Text style={styles.txtName}>未登录</Text>
          <View style={styles.viewEdit}>
          <Text style={styles.txtEdit} onPress={()=>this.props.navigation.navigate('Login', {
    refresh:()=>{
        this.init();
    }
})}>登陆</Text>
          </View>
          <View style={styles.viewEdit}>
            <Text style={styles.txtEdit} onPress={()=>this.props.navigation.navigate('Regist')}>注册</Text>
          </View>
        </View>
        <View style={styles.viewLove2}>
          <View style={styles.viewLoveTop}>
            <Text style={styles.txtCommon}>最近观看</Text>
            <Icon style={styles.iconCommon} name='angle-right' size={20}/>
          </View>
        </View>
        <View style={styles.viewCommon}>
          <Text style={styles.txtCommon}>我的书库</Text>
          <Icon style={styles.iconCommon} name='angle-right' size={20}/>
        </View>
        <View style={styles.viewCommon}>
          <Text style={styles.txtCommon}>PC阅读器0.1</Text>
          <Icon style={styles.iconCommon} name='angle-right' size={20}/>
        </View>
      </View>
      )
    }
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0'
  },
  viewUser: {
    height: 220,
    backgroundColor: '#388E8E'
  },
  viewUserTop: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgUserTitle: {
    height: 80,
    width: 80,
    borderRadius: 40
  },
  txtName: {
    alignSelf: 'center'
  },
  txtGF: {
    alignSelf: 'center',
    marginTop: 10
  },
  viewEdit: {
    width: 150,
    marginTop: 20,
    height: 30,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  txtEdit: {
    marginLeft: 5,
    alignSelf: 'center',
    color: '#7997C7'
  },
  iconEdit: {
    color: '#7997C7',
    marginTop: 5
  },
  viewLove: {
    height: 150,
    borderBottomWidth: 10,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#ffffff'
  },
  viewLoveTop: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtCommon: {
    marginLeft: 15,
    flex: 1
  },
  iconCommon: {
    marginRight: 10
  },
  imgLove: {
    height: 90,
    width: 90,
    margin: 10,
    marginTop: 0
  },
  viewCommon: {
    height: 50,
    borderBottomWidth: 10,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  viewLove2: {
    height: 60,
    borderBottomWidth: 10,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#ffffff'
  },
  viewUser2: {
    height: 250,
    backgroundColor: '#388E8E'
  },
})