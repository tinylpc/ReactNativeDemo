'use strict';

import React from 'react';
import StaticContainer from 'react-static-container';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    Button,
    ListView,
    PanResponder,
    Switch,
    ProgressBarAndroid,
    ViewPagerAndroid,
    TouchableNativeFeedback,
    TouchableHighlight,
    BackAndroid,
    DrawerLayoutAndroid,
    TextInput,
    Modal,
    Navigator
} from 'react-native';
import HttpUtils from './react_lib/HttpUtils';
import MyToastTiny from './MyToast';
import {DeviceEventEmitter} from 'react-native';
import MyTellProgress from './react_lib/MyTellProgress';
import MainScreen from './MainScreen';

class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var lastBackPressed;
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6', 'row 7', 'row 8', 'row 9']),
            showHeader: false,
            showFooter: false,
            shouldstart: '',
            switchValue: false,
            modalVisible: false,
        };
    }

    render() {
        let shouldstart = this.state.shouldstart;
        let switchvalue = this.state.switchValue;
        let self = this;
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}
                      onPress={() => self.setState({modalVisible: true})}>I'm in the Drawer!</Text>
            </View>
        );
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <View style={{flex: 1}}>
                    <MyTellProgress
                        style={{
                            width: 300,
                            height: 300,
                            justifyContent: 'center',
                            backgroundColor: '#3355fa'
                        }}  {...this._panResponder.panHandlers}
                        start={shouldstart} tinyPause={function () {
                        alert("1212")
                    }}/>
                    <Text style={{fontSize: 15, position: 'absolute', left: 135, top: 135}}>{shouldstart}</Text>
                    {/*<ViewPagerAndroid style={{width: 300, height: 200, backgroundColor: '#2fca5a'}}*/}
                    {/*initialPage={0} onPageSelected={function (env) {*/}
                    {/*alert(env.nativeEvent.position)*/}
                    {/*}}>*/}
                    {/*<TouchableNativeFeedback onPress={function () {*/}
                    {/*alert('yyyyy')*/}
                    {/*}}>*/}
                    {/*<View style={{width: 100, height: 100, backgroundColor: '#12fac5'}}>*/}
                    {/*<Text onPress={() => alert('tt')}>First1 page</Text>*/}
                    {/*</View>*/}
                    {/*</TouchableNativeFeedback>*/}
                    {/*<View>*/}
                    {/*<Text>Second page</Text>*/}
                    {/*</View>*/}
                    {/*</ViewPagerAndroid>*/}
                    <TextInput multiline={true}></TextInput>
                    <Modal animationType='none'
                           transparent={true}
                           visible={this.state.modalVisible}
                           onShow={() => alert('onShow')}
                           onRequestClose={() => alert('requestCode')}>
                        <View style={{
                            flex: 1,
                            backgroundColor: '#000000',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} opacity={0.6}>
                            <Text style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center'
                            }} onPress={() => self.setState({modalVisible: false})}>11112212</Text>
                        </View>
                    </Modal>
                </View>
            </DrawerLayoutAndroid>
        );
    }

    componentWillMount() {
        // DeviceEventEmitter.addListener('keyboardWillShow', function (e: Event) {
        //     alert(JSON.stringify(e));
        // });
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

                // gestureState.{x,y}0 现在会被设置为0
                this.setState({shouldstart: 'start'});
            },
            onPanResponderMove: (evt, gestureState) => {
                // 最近一次的移动距离为gestureState.move{X,Y}

                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            },
        });
        BackAndroid.addEventListener('hardwareBackPress', () => this._onBackAndroid());
    }

    _onBackAndroid = () => {
        const nav = this.navigator;
        const routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
            nav.pop();
            return true;
        }
        return false;
    };
}

//var headPress = function () {
//    MyToastTiny.showshow("2", (errorMsg) => {
//        alert(errorMsg)
//    }, (successMsg) => {
//        alert(successMsg)
//    });
//
//    ToastAndroid.show("async", ToastAndroid.SHORT);
//}

class MyNavigator extends React.Component {
    render() {
        return (
            <Navigator
                ref={component => this.navigator = component}
                initialRoute={{component: MainScreen}}
                renderScene={this.renderNav}
                configureScene={(route) => ({
                    ...Navigator.SceneConfigs.HorizontalSwipeJump,
                    gestures: false
                })}
            />
        );
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid.bind(this));
    }

    _onBackAndroid() {
        const nav = this.navigator;
        const routers = nav.getCurrentRoutes()
        if (routers.length > 1) {
            nav.pop();
            return true;
        }
        return false;
    };

    renderNav(route, nav) {
        return <route.component navigator={nav}  {...route.params} />;
    }
}

// var styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     hello: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
// });

AppRegistry.registerComponent('HelloWorld', () => MyNavigator);