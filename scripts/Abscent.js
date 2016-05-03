// Description
//  An Awesome hubot script
//
// Configuration:
//   None
//
// Commands:
//   hubot hello - responds 'Howdy!'
//
// Author:
//   Richard Siwady   <richard@acklenavenue.com>
//   Douglas Guerrero <dguerrero@acklenavenue.com>
"use strict";
var parseDb = require("../helpers/parseDB");
var Abscent = (function () {
    function Abscent(HubotParseDb) {
        var _this = this;
        this.HubotParseDb = HubotParseDb;
        // We should get this from some sort of a DB
        this.commands = ['AFK', 'BRB'];
        this.adjectives = ['for', 'in', 'until', 'back'];
        this.format = ['min', 'hour', 'day'];
        this.hubotAction = function (robot) {
            robot.hear(/.*/i, function (msg) {
                var user = msg.message.user;
                var object = _this.regex.exec(msg.message.text);
                if (object !== null) {
                    var command = {
                        User: user.name,
                        Command: object[1],
                        Time: parseInt(object[3]),
                        Format: object[4]
                    };
                    msg.send(msg, _this.HubotParseDb.saveAbscence(command));
                }
            });
            robot.respond(/abscence help/i, function (msg) {
                msg.send('http://hola.com');
            });
            robot.hear(/(^|\W)@\w+/g, function (msg) {
                for (var i = 0; i < msg.match.length; i++) {
                    var user = msg.match[i];
                    user = user.substring(1, user.length);
                    _this.HubotParseDb.checkIsAbscent(msg, user);
                }
            });
            robot.hear(/\b(Im back|back)\b/g, function (msg) {
                var user = msg.message.user;
                _this.HubotParseDb.userIsBack(user.name);
            });
        };
        this.regex = new RegExp('\\b(' + this.commands.join('|') + ')\\s+(' +
            this.adjectives.join('|') +
            ')\\s+([0-9]+)\\s+(' +
            this.format.join('|') + ')\\b', 'i');
    }
    return Abscent;
}());
var HubotParseDb = parseDb.HubotParseDb;
var fn = new Abscent(new HubotParseDb()).hubotAction;
module.exports = fn;
