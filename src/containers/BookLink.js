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
} from 'react-native';
import Read from './Read'
export default class BookLink extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<TouchableOpacity onPress={ () => { this.props.navigate.navigate('BookDetail',{header:null,book:this.props.Name}) } }>
			<View style={styles.container}>
				 <Image
        style={styles.icon}
        source={{uri:this.props.Png}}
      />
      <Text style={styles.title}>{this.props.Name}</Text>
      <Text style={styles.text}>{this.props.Author}</Text>
			</View>
			</TouchableOpacity>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		width: 90,
		marginTop: 5,
		marginRight: 20,
	},
	icon: {
		height: 120,
		width: 90,
	},
	title: {
		fontSize: 18,
		color: 'black',
	},
	text: {
		fontSize: 14,
	}
});