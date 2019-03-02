import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import BookClassify from '../containers/BookClassify'


export default class BookShop extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
            <FlatList
  data={[{key: "热门图书"},{key: "奇幻修真"}, {key: "奇幻魔法"},{key: '异术超能'}, {key: '东方传奇'},{key: '未来幻想'}, {key: '灵异鬼怪'}]}
  renderItem={({item}) =><BookClassify {...this.props} name={item.key}></BookClassify>}
/>
        { /*           <BookClassify {...this.props}></BookClassify>*/ }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});