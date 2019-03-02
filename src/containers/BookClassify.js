import React, {
	Component
} from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import url from "../common/url"
import Icon from 'react-native-vector-icons/Ionicons';
import BookLink from './BookLink'
export default class BookClassify extends Component {
	constructor(props) {
		super(props);
		const {
			navigate
		} = this.props.navigation;
		this.state = {
			bookList: []
		}
	};
	componentDidMount() {
		fetch(url.getRandBookList, {
				method: 'Post',
				mode: 'cors',
				body: JSON.stringify({
					BookType: this.props.name,
				})
			})
			.then(response => response.json())
			.then((data) => {
				this.setState({
					bookList: data.bookList
				})
			})
			.catch(error => console.warn('error is', error));
	}
	fressBook = () => {
		fetch(url.getRandBookList, {
				method: 'Post',
				mode: 'cors',
				body: JSON.stringify({
					BookType: this.props.name,
				})
			})
			.then(response => response.json())
			.then((data) => {
				this.setState({
					bookList: data.bookList
				})
			})
			.catch(error => console.warn('error is', error));
	}
	render() {
		return (<View style={styles.container}>
			<View style={styles.containerTitle}><Text style={styles.classTitle}>{this.props.name}</Text><Text onPress={()=>this.props.navigation.navigate("Rank",{BookType:this.props.name})}>排行榜</Text></View>
			<View style={styles.booklist}>
      {this.state.bookList.map(item=><BookLink key={item.Id} {...item} navigate={this.props.navigation}></BookLink>)}
      </View><TouchableOpacity onPress={this.fressBook}><View style={styles.fress}><Text>换一换  </Text><Icon
                    name={'ios-sync'} 
                    size={15}
                    /></View></TouchableOpacity></View>);
	}
}
const styles = StyleSheet.create({
	container: {
		marginTop: 5,
		marginLeft: 20,
		marginRight: 20,
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	containerTitle: {
		flexDirection: 'row',
		justifyContent: 'space-between',

	},
	booklist: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},
	classTitle: {
		color: 'black',
		fontSize: 20,
	},
	fress: {
		flexDirection: 'row',
		justifyContent: 'center',

	},
	item: {
		flexWrap: 'wrap',
		flexDirection: 'column',
		borderRadius: 5,
		backgroundColor: 'white',
		marginTop: 8,
		marginLeft: 10,
		marginRight: 10,
	},
	title: {
		color: '#38373C',
		textAlign: 'center',
		marginTop: 15,
		fontSize: 16,
	},
	content: {
		margin: 10,
		color: '#666666',
		alignItems: 'center',
		fontSize: 14,
	}
});