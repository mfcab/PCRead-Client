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
	AsyncStorage,
	DeviceEventEmitter
} from 'react-native';
import url from "../common/url"
export default class Book extends Component {
	constructor(props) {
		super(props);
	}
	delBook = () => {
		AsyncStorage.getItem('token')
			.then(token => {
				fetch(url.delBook, {
						method: 'Post',
						mode: 'cors',
						headers: {
							"token": token
						},
						body: JSON.stringify({
							BookName: this.props.Name
						})
					})
					.then(response => response.json())
					.then((data) => {
						if (data.status != 0) {
							alert("删除失败")
						} else if (data.status == 0) {
							alert("删除成功")
						}
					})
					.catch(error => console.warn('error is', error));
			})
		DeviceEventEmitter.emit('fress');
	}
	render() {
		return (
			<TouchableOpacity onPress={ () => { this.props.navigate.navigate('Read',{book:this.props.Name,chapter:''})}}
			onLongPress={this.delBook}
			>
			<View style={styles.container}>
				 <Image
        style={styles.icon}
        source={{uri:this.props.Png}}
      />
      <Text style={styles.text}>{this.props.Name}</Text>
			</View>
			</TouchableOpacity>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		width: 90,
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
	},
	icon: {
		height: 120,
		width: 90,
	},
	text: {
		textAlign: 'center',
		color: 'black',
		fontSize: 18
	}
});