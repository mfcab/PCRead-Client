import React, {
    Component
} from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    FlatList,
    Modal,
    Image,
    Alert,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import url from "../common/url"
import Icon from 'react-native-vector-icons/Ionicons';
export default class Read extends Component {
    constructor(props) {
        super(props);
        paperColorList = ['rgb(254,248,230)', 'rgb(204,232,227)']
        this.state = {
            modSize: 18,
            visible: false,
            text: ["加载中......", ],
            title: this.props.navigation.state.params.chapter,
            paperColor: paperColorList[1]
        }
    }
    componentWillReceiveProps(nextProps) {
        if ((nextProps.navigation.state.params.book != this.props.navigation.state.params.book) || (nextProps.navigation.state.params.chapter != this.props.navigation.state.params.chapter)) {
            this.fetchText(nextProps.navigation.state.params.book, nextProps.navigation.state.params.chapter)
        }
    }
    componentDidMount() {
        this.fetchText(this.props.navigation.state.params.book, this.props.navigation.state.params.chapter)
    }
    fetchText = (book, chapter) => {
        AsyncStorage.getItem('token')
            .then(token => {
                fetch(url.getPage, {
                        method: 'Post',
                        mode: 'cors',
                        headers: {
                            "token": token
                        },
                        body: JSON.stringify({
                            BookName: book,
                            ChapterName: chapter
                        })
                    })
                    .then(response => response.json())
                    .then((data) => {
                        (data.text !== "") ? this.setState({
                            text: [data.text, ],
                            title: chapter
                        }): this.setState({
                            text: ["加载出错，请稍后重试...", ],
                            title: chapter
                        })
                    })

                    .catch(error => console.warn('error is', error));
            })
    }
    getNextPage = () => {
        AsyncStorage.getItem('token')
            .then(token => {
                let newData = this.state.text;
                if (newData[0] === "加载中......") {} else {
                    fetch(url.getNextPage, {
                            method: 'Post',
                            mode: 'cors',
                            headers: {
                                "token": token
                            },
                            body: JSON.stringify({
                                BookName: this.props.navigation.state.params.book,
                                ChapterName: this.state.title
                            })
                        })
                        .then(response => response.json())
                        .then((data) => {
                            if (data.title !== "") {
                                newData.push(data.text)
                                this.setState({
                                    text: newData,
                                    title: data.title
                                })
                            } else {
                                newData.push("加载出错，请稍后重试...")
                                this.setState({
                                    text: newData,
                                })
                            }
                        })

                        .catch(error => console.warn('error is', error));
                }
            })
    }
    render() {
        return (
            <View style={{backgroundColor:this.state.paperColor,flex:1}}>
			<Modal 
      visible={ this.state.visible } 
      transparent={ true } 
      animationType="none"
      onRequestClose={()=>this.setState({visible:false})} 
      > 
      <View style={{flex:1}}> 
          <View style={[styles.topBox,{backgroundColor:this.state.paperColor}]}>
              <TouchableOpacity
            style={styles.topBack}
            onPress={ () => { this.props.navigation.goBack()}}>
            <Icon
                    name={'ios-arrow-back'} 
                    size={30}
                    />
            </TouchableOpacity><Text style={styles.title}>{this.state.title}</Text>
            </View>
              <TouchableOpacity  style={{flex:1}} onPress={()=>{this.setState({visible:false})}}></TouchableOpacity>
      <View style={{height:60,backgroundColor:this.state.paperColor,justifyContent: 'center',}}>
      <View style={styles.bottomBox}><TouchableOpacity
            style={styles.topBack}
            onPress={ () => { this.setState({visible:false});this.props.navigation.navigate("Dire",{book:this.props.navigation.state.params.book})}}>
            <Icon
                    name={'ios-list'} 
                    size={30}
                    />
            </TouchableOpacity>
      <TouchableOpacity
            style={styles.topBack}
            onPress={() =>
				this.setState({
					modSize: this.state.modSize==20?18:20
				})}>
            <Icon
                    name={'ios-resize'} 
                    size={25}
                    />
            </TouchableOpacity>
      <TouchableOpacity
            style={styles.topBack}
            onPress={ () =>this.setState({
            	paperColor: this.state.paperColor==paperColorList[0]?paperColorList[1]:paperColorList[0]
            })}>
            <Icon
                    name={'md-color-palette'} 
                    size={30}
                    />
            </TouchableOpacity></View>
      </View>
        </View> 
      </Modal>	
      <FlatList
                data={this.state.text}
                keyExtractor={index => index}
                renderItem={({item})=><Text onPress = {
                () => {
                    this.setState({visible:true})
                } 
                } style = {[{fontSize: this.state.modSize}, {color:'black'}]}> 
                {item}
                 </Text>}
        onEndReached = { this.getNextPage}
                onEndReachedThreshold={0.5}
                ItemSeparatorComponent={() => <View style={{height: 1,backgroundColor: "#CED0CE"}}></View>
        }
        /></View >
        );
    }
}
const styles = StyleSheet.create({
    topBox: {
        height: 30,
        flexDirection: 'row',
    },
    topBack: {
        flex: 0.1,
        paddingLeft: 10,


    },
    backImg: {
        marginLeft: 5,
        marginTop: 3,
    },
    title: {
        fontSize: 18,
        color: 'black',
    },
    text: {
        fontSize: 14,
    },
    bottomBox: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'space-between',
    },
    bottomItem1: {
        flex: 0.2,
        height: 20,
        backgroundColor: 'red'
    },
    bottomItem2: {
        flex: 0.2,
        height: 20,
        backgroundColor: 'green'
    },
    bottomItem3: {
        flex: 0.2,
        height: 20,
        backgroundColor: 'yellow'
    }
}); {
    /*<Text onPress = {
                () => {
                    this.setState({visible:true})
                } 
                } style = {[{fontSize: this.state.modSize}, {color:'black'}]}> 
                {item}
                 </Text>*/
}