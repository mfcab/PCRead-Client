import React, {
	Component
} from 'react';
import {
	View,
	Text,
	Image,
	Button,
	TouchableOpacity,
	StyleSheet,
	DeviceEventEmitter,
	AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import url from "../common/url"
export default class BookDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			book: {}
		}
	}
	componentDidMount() {
		fetch(url.getBookInfo, {
				method: 'Post',
				mode: 'cors',
				body: JSON.stringify({
					BookName: this.props.navigation.state.params.book,
				})
			})
			.then(response => response.json())
			.then((data) => {
				this.setState({
					book: data.book
				})
			})
			.catch(error => console.warn('error is', error));
	}
	addBook = () => {
		AsyncStorage.getItem('token')
			.then(token => {
				fetch(url.addBook, {
						method: 'Post',
						mode: 'cors',
						headers: {
							"token": token
						},
						body: JSON.stringify({
							BookName: this.state.book.Name
						})
					})
					.then(response => response.json())
					.then((data) => {
						if (data.status != 0) {
							alert("添加失败")
						} else if (data.status == 0) {
							alert("添加成功")
						}
					})

					.catch(error => console.warn('error is', error));
			}).then(() => DeviceEventEmitter.emit('fress'))
			.catch(error => console.warn('error is', error));
	}
	render() {
		return (
			<View style={styles.container} >
        <View style={styles.nav}>
          <View style={styles.topBox}>
              <TouchableOpacity
            style={styles.topBack}
            onPress={ () => { this.props.navigation.goBack()}}>
              <Icon
                    name={'ios-arrow-back'} 
                    size={30}
                    />
            </TouchableOpacity>
            <Text style={styles.text}>作品详情</Text>
          </View>
        </View>
        <View style={styles.prouduce}><Image style={styles.bookImg} source={{uri:this.state.book.Png}} />
        <View style={styles.bookInfo}>
        	<Text style={{fontSize:25,color:'black'}}>{this.state.book.Name}</Text>
        	<Text style={{fontSize:20,color:'#8B1A1A'}}>{this.state.book.Author}</Text>
        	<Text style={{fontSize:16,marginTop:10}}>{this.state.book.Type}</Text>
        	<Text style={{fontSize:16,}}>连载中</Text>
        </View></View>
        <View style={{backgroundColor:'#F8F8FF'}}><View style={{borderBottomWidth:0.5}}><Text style={{fontSize:20,}}>作品简介:</Text></View>
        <Text style={{backgroundColor:'#F8F8FF',height:300,marginBottom:30}}>{this.state.book.Info}</Text></View>
        <View style={styles.buttonlist}><View style={{width:100}}><Button style={{width:200}}
  title="开始阅读"
  color="#EE0000" onPress={() => this.props.navigation.navigate('Read',{book:this.state.book.Name,chapter:''})}></Button></View><View style={{width:100}}><Button style={{width:200}}
  title="加入书架"
  color="#4876FF" onPress={this.addBook}></Button></View><View style={{width:100}}><Button style={{width:200}}
  title="目录"
  color="#4876FF" onPress={()=>this.props.navigation.navigate("Dire",{book:this.state.book.Name})}></Button></View></View>
      </View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F8FF'
	},
	nav: {
		height: 30,
		backgroundColor: '#F8F8FF'
	},
	topBox: {
		flexDirection: 'row',
	},
	topBack: {
		flex: 0.1,
		marginLeft: 5,
		marginRight: 20,
		paddingTop: 3
	},
	text: {
		marginTop: 3,
		fontSize: 20,
		color: 'black'
	},
	prouduce: {
		flexDirection: 'row',
		padding: 5,
		backgroundColor: '#F8F8FF'
	},
	bookImg: {
		height: 120,
		width: 90,
		marginLeft: 20,
		marginRight: 20,
	},
	bookInfo: {
		flexDirection: 'column',
	},
	buttonlist: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	}
});