'use strict';
import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
var home = '首页';
var doc = '医生';
var community = '社区医院';
var sickbag = '锦囊';
var me = '我';
import HomeView from './HomeView'
export default class SecondScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'jjj',
            selectedTab: home,
        }
    }

    render() {
        var that = this;
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === home}
                    title={home}
                    titleStyle={{color: '#a8a39e'}}
                    selectedTitleStyle={{color: '#fc6a74'}}
                    renderIcon={() => <Image style={{width: 24, height: 24}} source={require('image!tabhomenor')}/>}
                    renderSelectedIcon={() => <Image
                        style={{width: 24, height: 24}} source={require('image!tabhomehl')}/>}
                    badgeText=""
                    onPress={() => this.setState({selectedTab: home})}>
                    {<HomeView/>}
                </TabNavigator.Item >

                <TabNavigator.Item
                    selected={this.state.selectedTab === doc}
                    title={doc}
                    titleStyle={{color: '#a8a39e'}}
                    selectedTitleStyle={{color: '#fc6a74'}}
                    renderIcon={() => <Image style={{width: 24, height: 24}} source={require('image!tabdocnor')}/>}
                    renderSelectedIcon={() => <Image style={{
                        width: 24,
                        height: 24
                    }} source={require('image!tabdochl')}/>}
                    onPress={() => this.setState({selectedTab: doc})}>
                    <View>
                        <Text>22222</Text>
                    </View>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === community}
                    title={community}
                    titleStyle={{color: '#a8a39e'}}
                    selectedTitleStyle={{color: '#fc6a74'}}
                    renderIcon={() => <Image style={{width: 24, height: 24}} source={require('image!tabnearbynor')}/>}
                    renderSelectedIcon={() => <Image style={{
                        width: 24,
                        height: 24
                    }} source={require('image!tabnearbyhl')}/>}
                    onPress={() => this.setState({selectedTab: community})}>
                    <View>
                        <Text>22222</Text>
                    </View>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === sickbag}
                    title={sickbag}
                    titleStyle={{color: '#a8a39e'}}
                    selectedTitleStyle={{color: '#fc6a74'}}
                    renderIcon={() => <Image style={{width: 24, height: 24}} source={require('image!tabacepacknor')}/>}
                    renderSelectedIcon={() => <Image style={{
                        width: 24,
                        height: 24
                    }} source={require('image!tabacepackhl')}/>}
                    onPress={() => this.setState({selectedTab: sickbag})}>
                    <View>
                        <Text>22222</Text>
                    </View>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === me}
                    title={me}
                    titleStyle={{color: '#a8a39e'}}
                    selectedTitleStyle={{color: '#fc6a74'}}
                    renderIcon={() => <Image style={{width: 24, height: 24}} source={require('image!tabpersonalnor')}/>}
                    renderSelectedIcon={() => <Image style={{
                        width: 24,
                        height: 24
                    }} source={require('image!tabpersonalhl')}/>}
                    onPress={() => this.setState({selectedTab: me})}>
                    <View>
                        <Text>22222</Text>
                    </View>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}