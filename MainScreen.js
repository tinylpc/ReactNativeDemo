'use strict';
import React from 'react';
import {
    View,
    Image,
    Dimensions
} from 'react-native';
import SecondScreen from './SecondScreen'
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'mainscreen'
        };

        this, setTimeout(this._toSecond.bind(this), 3000);
    }

    render() {
        var _this = this;
        return (
            <View>
                <Image style={{width: ScreenWidth, height: ScreenHeight}}
                       source={require('image!launchscreen')}
                       resizeMode={Image.resizeMode.stretch}></Image>
            </View>
        );
    }

    _toSecond() {
        this.props.navigator.replace({
            component: SecondScreen, params: {
                name: 'lpc'
            }
        });
        // this.props.navigator.push({
        //     component: SecondScreen, params: {
        //         name: 'lpc'
        //     }
        // });
    }
}

