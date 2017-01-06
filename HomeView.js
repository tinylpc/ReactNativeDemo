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
var screenWidth = Dimensions.get('window').width;
var pager;
var IMGS = [
    'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
    'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
    'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
];

var IMGS2 = [
    'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
    'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
    'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
    'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
    'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
    'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
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
                this._requestSDcardPermission();
            }
            , 5000);
    }

    render() {
        return (
            <View>
                <View style={styles.pager}>
                    <ViewPager ref={component => this.pager = component}
                               initialPage={0}
                               dataSource={this.state.dataSource}
                               renderPage={this._renderPage}
                               isLoop={true}
                               autoPlay={true}/>
                </View>
                <Text>111111</Text>
            </View>
        )
    };

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