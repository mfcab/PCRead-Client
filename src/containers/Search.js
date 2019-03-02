import React, {
	Component
} from 'react'
import {
	View,
	Image,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from 'react-native'
import url from "../common/url"
import Icon from 'react-native-vector-icons/Ionicons';
export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			book: [{
				Id: 1,
				Name: "查询"
			}]
		}
	}
	search = (event) => {
		fetch(url.search, {
				method: 'Post',
				mode: 'cors',
				body: JSON.stringify({
					BookName: event.nativeEvent.text
				})
			})
			.then(response => response.json())
			.then((data) => {
				if (data != null) {
					this.setState({
						book: data.BookList
					})
				}
			})

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
            <View style={styles.topSearch}>
              <View style={styles.searchSection}>
                <View style={styles.searchImgBox}>
                  <Icon
                    name={'ios-search'} 
                    size={25}
                    />
                </View>
                <TextInput style={styles.searchInput}
                  placeholder="搜索书名" 
                  onSubmitEditing={this.search}
                  />
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop:20}}>
        {this.state.book.map(item=><TouchableOpacity key={item.Id} onPress={()=>this.props.navigate.navigate('BookDetail',{header:null,book:item.Name})}>
        	<Text style={styles.text}>{item.Name}</Text>
        	</TouchableOpacity>)}
        </View>
      </View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	nav: {
		height: 60,
		backgroundColor: '#778899'
	},
	topBox: {
		height: 40,
		marginTop: 10,
		flexDirection: 'row',
	},
	topBack: {
		flex: 0.1,
		marginTop: 5,
		marginLeft: 10,
	},
	topSearch: {
		flex: 0.9
	},
	searchSection: {
		flex: 1,
		marginRight: 20,
		borderRadius: 5,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
	},
	searchImgBox: {
		width: 50,
		marginLeft: 10,
		marginTop: 6,
	},
	searchInput: {
		flex: 0.85,
	},
	text: {
		marginLeft: 20,
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10,
	}
});