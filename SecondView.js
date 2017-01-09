'use sttrict'
import React from 'react';
import {
    View,
    Text
} from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class SecondView extends React.Component {
    render() {
        return (
            <ScrollableTabView initialPage={1} tabBarUnderlineStyle={{backgroundColor: '#11cab0'}}
                               tabBarActiveTextColor="#991cbf" tabBarInactiveTextColor="#11cfa5">
                <Text tabLabel="React" style={{fontSize: 30}}>1111</Text>
                <Text tabLabel="Flow" style={{fontSize: 40}}>222222</Text>
                <Text tabLabel="Jest" style={{fontSize: 50}}>333333</Text>
            </ScrollableTabView>
        )
    }
}