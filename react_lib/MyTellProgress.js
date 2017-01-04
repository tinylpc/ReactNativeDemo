import {PropTypes} from 'react';
import {requireNativeComponent, View} from 'react-native';

const MyTellProgress = requireNativeComponent('MyTellProgress', {

    propTypes: {
        start: PropTypes.string,
        tinyPause:PropTypes.func,
        ...View.propTypes // 包含默认的View的属性
    },
});

export default MyTellProgress;