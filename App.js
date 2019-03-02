import React, {
  Component
} from 'react';
import {
  Image,
  View,
  Text
} from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import SelfBook from './src/main/SelfBook';
import BookShop from './src/main/BookShop';
import SelfInfo from './src/main/SelfInfo';
import Read from './src/containers/Read';
import Search from './src/containers/Search';
import BookDetail from './src/containers/BookDetail';
import Login from './src/containers/Login';
import Regist from './src/containers/Regist';
import Dire from './src/containers/Dire';
import Rank from './src/containers/Rank';


const Tab = createBottomTabNavigator({
  SelfBook: {
    screen: SelfBook,
    navigationOptions: {
      //tab 的属性
      tabBarLabel: '书架',
      tabBarIcon: ({
        tintColor,
        focused,
      }) => (
        <Icon
                    name={focused ? 'ios-book':'ios-journal'} 
                    size={20}
                    style={{color: tintColor}}/>
      ),

    },
  },
  BookShop: {
    screen: BookShop,
    navigationOptions: {
      tabBarLabel: '书城',
      tabBarIcon: ({
        tintColor,
        focused,
      }) => (
        <Icon
                    name={focused ? 'ios-cart':'ios-basket'} 
                    size={20}
                    style={{color: tintColor}}/>
      ),
    }
  },
  SelfInfo: {
    screen: SelfInfo,
    navigationOptions: {
      tabBarLabel: '账户',
      tabBarIcon: ({
        tintColor,
        focused,
      }) => (
        <Icon
                    name={focused ? 'ios-person':'logo-snapchat'} 
                    size={20}
                    style={{color: tintColor}}/>
      ),
    }
  },
}, {
  //设置TabNavigator的位置
  tabBarPosition: 'bottom',
  //是否在更改标签时显示动画
  animationEnabled: true,
  //是否允许在标签之间进行滑动
  swipeEnabled: true,
  //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
  backBehavior: "none",
  //设置Tab标签的属性
  tabBarOptions: {
    //Android属性
    upperCaseLabel: false, //是否使标签大写，默认为true
    //共有属性
    showIcon: true, //是否显示图标，默认关闭
    showLabel: true, //是否显示label，默认开启
    activeTintColor: '#02B4FF', //label和icon的前景色 活跃状态下（选中）
    inactiveTintColor: '#38373C', //label和icon的前景色 活跃状态下（未选中）
    style: {
      backgroundColor: 'white'
    },
    indicatorStyle: {
      height: 0,
    },
    labelStyle: {
      fontSize: 13,
      marginTop: -5,
      marginBottom: 5,
    },
    iconStyle: {
      marginBottom: 5,
    },
  },
});
/*
 * 初始化StackNavigator
 */
const Apps = createStackNavigator({
  Tab: {
    screen: Tab,
    navigationOptions: ({
      navigation
    }) => ({
      headerTitle: "PC小说",
      headerBackTitle: null,
      headerLeft: (<View style={{width:30}} />),
      headerRight: (<Icon onPress={()=> navigation.navigate('Fuck')}
                    name={'ios-search'} 
                    size={30}
                    />),
      headerStyle: {
        height: 40
      },
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
      }
    })
  },
  Login: {
    screen: Login
  },
  Regist: {
    screen: Regist
  },
  Dire: {
    screen: Dire,
    navigationOptions: {
      header: null,
    }
  },
  Rank: {
    screen: Rank,
    navigationOptions: {
      header: null,
    }
  },
  Read: {
    screen: Read,
    navigationOptions: {
      header: null,
    }
  },
  BookDetail: {
    screen: BookDetail,
    navigationOptions: {
      header: null,
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      header: null,
    }
  }
});
const AppContainer = createAppContainer(Apps);
export default AppContainer;