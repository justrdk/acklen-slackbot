/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
"use strict";
var rsvp = require('es6-promise');
var Promise = rsvp.Promise;
var FakeResponse = (function () {
    function FakeResponse() {
        var _this = this;
        this.messageSent = "none";
        this.messageReplied = "none";
        this.sendPromise = new Promise(function (resolve, reject) {
            _this.sendResolve = resolve;
        });
        this.reply = function (msg) {
            _this.messageReplied = msg;
        };
        this.send = function (msg) {
            _this.messageSent = msg;
            _this.sendResolve(msg);
        };
        this.waitForMessageToBeSent = function () {
            return _this.sendPromise;
        };
        this.match = [];
        this.registerMatches = function (matches) {
            _this.match = matches;
        };
        this.randomResponseIndex = 0;
        this.random = function (arr) {
            return arr[_this.randomResponseIndex];
        };
        this.setRandomResponse = function (index) {
            _this.randomResponseIndex = index;
        };
    }
    return FakeResponse;
}());
exports.FakeResponse = FakeResponse;
