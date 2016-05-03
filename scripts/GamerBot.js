/// <reference path="../../typings/node/node.d.ts"/>
"use strict";
// Description:
//   Chuck Norris awesomeness
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot chuck norris -- random Chuck Norris awesomeness
//   hubot chuck norris <name> -- let's see how <name> would do as Chuck Norris
//
// Author: 
//   dlinsin
//
// Ported by:
//   Byron Sommardahl <byron@acklenavenue.com>
var ms = require("../helpers/messageSender");
var imp = require("../helpers/GamerBotHelper");
var GamerBot = (function () {
    function GamerBot(messageSender, impersonator) {
        var _this = this;
        this.messageSender = messageSender;
        this.impersonator = impersonator;
        this.registerListener = function (robot) {
            robot.respond(/steam?(.*)/i, function (msg) {
                var name = msg.match[1];
                _this.impersonator.steam(name).then(function (joke) {
                    _this.messageSender.send(msg, joke);
                });
            });
        };
    }
    return GamerBot;
}());
var httpClient = require("request-promise");
var MessageSender = ms.MessageSender;
var GamerBotHelper = imp.GamerBotHelper;
var fn = new GamerBot(new MessageSender(), new GamerBotHelper(httpClient)).registerListener;
module.exports = fn;
