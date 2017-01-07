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

        this, setTimeout(this._toSecond.bind(this), 5000);
    }

    render() {
        var _this = this;
        return (
            <View>
                <Image style={{width: ScreenWidth, height: ScreenHeight}}
                       source={{uri:'http://bpic.588ku.com/back_pic/03/87/96/9057d3c08d43423.jpg!/fw/650/quality/90/unsharp/true/compress/true'}}
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

