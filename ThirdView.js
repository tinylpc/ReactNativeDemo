/**
 * Created by tiny on 17/1/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ListView,
    Dimensions
} from 'react-native';

import PullList from './PullList/PullList';
var pulllist;

export default class extends Component {

    constructor(props) {
        super(props);
        this.dataSource = [{
            id: 0,
            title: 'this is the first.',
        }];
        this.state = {
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
        };
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
        // this.loadMore();
    }

    onPullRelease(resolve) {
        //do something
        setTimeout(() => {
            resolve();
        }, 3000);
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 1}}>
            {pulling ? <Text>当前PullList状态: pulling...</Text> : null}
            {pullok ? <Text>当前PullList状态: pullok......</Text> : null}
            {pullrelease ? <Text>当前PullList状态: pullrelease......</Text> : null}
        </View>;
    }

    render() {
        return (
            <View style={styles.container}>
                <PullList ref={(component) => this.pulllist = component}
                          style={{}}
                          onPullRelease={this.onPullRelease} topIndicatorRender={this.topIndicatorRender}
                          topIndicatorHeight={60}
                          renderHeader={this.renderHeader}
                          dataSource={this.state.list}
                          renderRow={this.renderRow}
                          onEndReached={this.loadMore}
                          onEndReachedThreshold={60}
                          renderFooter={this.renderFooter}
                />
            </View>
        );
    }

    renderHeader() {
        return (
            <View style={{height: 50, backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="small" color='#3398fc'/>
                <Text>这边可以自定义UI</Text>
            </View>
        );
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <View style={{height: 50, backgroundColor: '#fafafa', alignItems: 'center', justifyContent: 'center'}}>
                <Text>{item.title}</Text>
            </View>
        );
    }

    renderFooter() {
        if (this.state.nomore) {
            return null;
        }
        return (
            <View style={{height: 100, backgroundColor: '#339baf'}}>
                <ActivityIndicator />
            </View>
        );
    }

    loadMore() {
        this.dataSource.push({
            id: 0,
            title: 'begin to create data ...',
        });
        for (var i = 0; i < 5; i++) {
            this.dataSource.push({
                id: i + 1,
                title: `this is ${i}`,
            })
        }
        this.dataSource.push({
            id: 6,
            title: 'finish create data ...',
        });
        setTimeout(() => {
            this.setState({
                list: this.state.list.cloneWithRows(this.dataSource)
            });
        }, 1000);
    }

}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
});