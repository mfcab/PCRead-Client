import React, {
	Component
} from 'react'
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	NavigatorIOS,
	Image,
	Alert,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import url from "../common/url"
import Icon from 'react-native-vector-icons/Ionicons';
export default class Rank extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BookType: this.props.navigation.state.params.bookType,
			List: []
		}
	}
	componentDidMount() {
		fetch(url.getBookList, {
				method: 'Post',
				mode: 'cors',
				body: JSON.stringify({
					BookType: this.props.navigation.state.params.BookType,
				})
			})
			.then(response => response.json())
			.then((data) => {
				this.setState({
					List: data.bookList
				})
			})
			.catch(error => console.warn('error is', error));
	}
	changeOrder = () => {
		newList = this.state.List.reverse()
		this.setState({
			List: newList
		})
	}
	render() {
		return (
			<View style={styles.scene}>
        <View style={styles.nav}>
            <TouchableOpacity
              style={[styles.button,{marginLeft: 10}]} onPress={ () => { this.props.navigation.goBack()}}>
              <Icon
                    name={'ios-arrow-back'} 
                    size={30}
                    />
            </TouchableOpacity>
            <Text style={styles.titleText}>排行榜</Text>
          <View style={[styles.button]}>
            <TouchableOpacity onPress={this.changeOrder}
              style={styles.button}>
 <Icon
                    name={'ios-swap'} 
                    size={30}
                    />
            </TouchableOpacity>
          </View>
        </View>
       <FlatList style={{paddingLeft:20,paddingRight:20}}
           data={this.state.List}
           keyExtractor={index => index}
           renderItem={({item,index}) =><TouchableOpacity 
           onPress={()=>{
           	this.props.navigation.navigate("BookDetail",{book:item.Name})
           }}
           style={{height:50,fontSize:20,justifyContent:'center'}}><Text>{index+1}   {item.Name}   {item.Author}</Text></TouchableOpacity>} 
		ItemSeparatorComponent = {
			() => <View style={{height: 1,backgroundColor: "#CED0CE"}}></View>
		}
           /> 
		</View>
		);
	}
}
const styles = StyleSheet.create({
	scene: {
		flex: 1,
	},
	nav: {
		height: 40,
		backgroundColor: '#DD3F42',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	button: {
		width: 30,
		height: 30,
	},
	titleText: {
		fontSize: 18,
		textAlign: 'center',
		color: '#ffffff',
	},
	item: {
		height: 60,
		borderColor: '#A5A5A5',
	},
	row: {
		flexDirection: 'row',
	},
	rightImg: {
		marginTop: 20
	}
})