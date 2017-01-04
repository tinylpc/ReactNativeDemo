'use strict';
import React, {
    Component
}from 'react'

class HttpUtils extends React.Component {
    static get(url, callback) {
        fetch(url).then((response) => response.text()).then((responseText) => {
            callback(responseText);
        }).done();
    }


    static post(url, callback, callback2) {
        fetch(url, fetchOptions).then((response) =>
            response.text()
        ).then((responseText) =>
            callback(responseText)
        ).catch((error) => {
            callback2(error)
        }).done();
    }
}

// let data = "_ct=1482142482980&password=123456&t=10&_c=99&v=41801&_sdk=6.0.1&mobile=15026546213&_model=Xiaomi+MI+3W&from=0&udid=91ede05c-c900-3754-9bf9-65c079483f41&_n=2";
let data = {
    '_ct': '1482142482980',
    'password': '123456',
    't': '10',
    '_c': '99',
    'v': '41801',
    '_sdk': '6.0.1',
    'mobile': '15026546213',
    '_model': 'xiaomi',
    'from': '0',
    'udid': '91ede05c-c900-3754-9bf9-65c079483f41',
    '_n': '2'
}
var fetchOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: "_ct=1482142908954&password=123456&t=10&_c=99&v=41801&_sdk=6.0.1&mobile=15026546213&_model=Xiaomi+MI+3W&from=0&udid=91ede05c-c900-3754-9bf9-65c079483f41&_n=2"
};

module.exports = HttpUtils;