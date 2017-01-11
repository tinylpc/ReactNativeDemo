'use strict';
import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native';
import ViewPager from './ViewPager/ViewPager';
import TinyPermissionAndroid from './TinyPermissionAndroid';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import FacebookTabBar from './FacebookTabBar';
var _facebookTabBar;
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var pager;
var IMGS = [
    'http://2t.5068.com/uploads/allimg/160323/60-1603231G347.jpg',
    'http://image.tianjimedia.com/uploadImages/2013/219/UW4KH582U670.jpg',
    'http://photo.enterdesk.com/2010-12-16/enterdesk.com-CA680984C1DE707177F4DB18C7F5C082.jpg',
];

var IMGS2 = [
    'http://photo.enterdesk.com/2010-3-12/enterdesk.com-36242C8529388B803FF0349DEEB18C9D.JPG',
    'http://photo.enterdesk.com/2010-12-4/enterdesk.com-08C3B65FA30A087D797C364754998679.jpg',
    'http://image.tianjimedia.com/uploadImages/2013/219/H0J6OH3M5790.jpg',
    'http://d.hiphotos.baidu.com/zhidao/pic/item/91529822720e0cf37475ecc80c46f21fbe09aa07.jpg',
    'http://pic.3h3.com/up/2015-1/20151117170929166317.jpg',
    'http://image.tianjimedia.com/uploadImages/2013/219/H0J6OH3M5790.jpg',
    'http://pic.3h3.com/up/2015-1/20151117170929141600.jpg'
];
export default class HomeView extends React.Component {
    constructor(props) {
        super(props)
        var ds = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this.state = {
            dataSource: ds.cloneWithPages(IMGS),
        }

        setTimeout(() => {

                this.setState({
                    dataSource: this.state.dataSource.cloneWithPages(IMGS2),
                }),
                    this.pager.setCurrentPageZero();
                this._facebookTabBar.updatePosition();
            }
            , 5000);

        setTimeout(() => {
            this._requestSDcardPermission();
        }, 10000)
    }

    render() {
        return (
            <View>
                <View style={styles.pager}>
                    <ViewPager ref={component => this.pager = component}
                               initialPage={0}
                               dataSource={this.state.dataSource}
                               renderPage={this._renderPage}
                               horizontal={false}
                               isLoop={true}
                               autoPlay={true}/>
                </View>
                <View style={{height: screenHeight - 300}}>
                    <ScrollableTabView initialPage={0} tabBarUnderlineStyle={{backgroundColor: '#11cab0'}}
                                       tabBarActiveTextColor="#991cbf" tabBarInactiveTextColor="#11cfa5"
                                       renderTabBar={() => <FacebookTabBar
                                           ref={(component) => this._facebookTabBar = component}/>}>
                        <Text tabLabel="React" style={{fontSize: 30}}>1111</Text>
                        <Text tabLabel="Flow" style={{fontSize: 40}}>222222</Text>
                        <Text tabLabel="Jest" style={{fontSize: 50}}>333333</Text>
                        <Text tabLabel="haha" style={{fontSize: 50}}>444444</Text>
                    </ScrollableTabView>
                </View>
            </View>
        )
    };

    renderText() {
        var texts = [];
        for (var i = 0; i < 5; i++) {
            texts.push(
                <Text key={i}>sgfhjsgfhj</Text>
            );
        }
        return texts;
    }

    async _requestSDcardPermission() {
        try {
            var permissions = [];
            permissions[0] = TinyPermissionAndroid.WRITE_EXTERNAL_STORAGE;
            var {
                isGranted
            } =await TinyPermissionAndroid.requestPermission(permissions);
            alert(isGranted)
        } catch (err) {
            alert(err)
        }
    }

    _renderPage(data, pageID) {
        return (
            <Image style={styles.pager}
                   source={{uri: data}}
            />
        );
    }
}

const styles = StyleSheet.create({
    pager: {
        width: screenWidth,
        height: 200,
    },
});