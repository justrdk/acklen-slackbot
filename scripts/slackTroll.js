// Description:
//   Troll the url sharers
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot any url - meme of spongebob no one cares
// Author:
//   Osman Hernandez
"use strict";
var SlackTroll = (function () {
    function SlackTroll(promise) {
        var _this = this;
        this.promise = promise;
        this.trollAction = function (robot) {
            robot.hear(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i, function (msg) {
                var promise = _this.promise("http://version1.api.memegenerator.net/Instance_Create?username=matador&password=matador&languageCode=en&generatorID=45&imageID=39519&text0=Nobody&text1=cares");
                promise.then(function (body) {
                    var random = Math.floor(Math.random() * 100);
                    if (random < 95) {
                        var memeData = JSON.parse(body);
                        var memeURL = memeData.result.instanceImageUrl;
                        msg.reply(memeURL);
                    }
                });
            });
            robot.respond(/what an interesting link right?/i, function (msg) {
                var promise = _this.promise("http://version1.api.memegenerator.net/Instance_Create?username=matador&password=matador&languageCode=en&generatorID=45&imageID=9488555&text0=So youve decided to share a link&text1=Please tell us more about it");
                promise.then(function (body) {
                    var memeData = JSON.parse(body);
                    var memeURL = memeData.result.instanceImageUrl;
                    msg.reply(memeURL);
                });
            });
            robot.hear(/awkward moment/i, function (msg) {
                var promise = _this.promise("http://version1.api.memegenerator.net/Instance_Create?username=matador&password=matador&languageCode=en&generatorID=45&imageID=11226761&text0=Well&text1=This is awkward");
                promise.then(function (body) {
                    var memeData = JSON.parse(body);
                    var memeURL = memeData.result.instanceImageUrl;
                    msg.reply(memeURL);
                });
            });
        };
    }
    return SlackTroll;
}());
var httpClient = require("request-promise");
var fn = new SlackTroll(httpClient).trollAction;
module.exports = fn;
