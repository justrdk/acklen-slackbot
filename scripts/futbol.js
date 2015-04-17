/// <reference path="../../typings/node/node.d.ts"/>
// Description:
//   Soccer information
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot premier-league standings - table with teams standings"
//   hubot premier-league fixtures - shows fixtures for current day
//
// Authors:
//   Camilo Aguilar & Osman Hernandez
//   Tester:
//      Carlos Fontecha
var ms = require("../helpers/messageSender");
var fw = require("../helpers/futbolWisdom");
var Futbol = (function () {
    function Futbol(messageSender, hubotFutbolWisdom) {
        var _this = this;
        this.messageSender = messageSender;
        this.hubotFutbolWisdom = hubotFutbolWisdom;
        this.hubotAction = function (robot) {
            robot.respond(/futbol wisdom help/i, function (msg) {
                _this.messageSender.send(msg, _this.hubotFutbolWisdom.showHelp());
            });
            robot.respond(/premier-league standings/i, function (msg) {
                _this.hubotFutbolWisdom.showLeagueTable(354).then(function (table) {
                    _this.messageSender.send(msg, table);
                });
            });
            robot.respond(/la-liga standings/i, function (msg) {
                _this.hubotFutbolWisdom.showLeagueTable(358).then(function (table) {
                    _this.messageSender.send(msg, table);
                });
            });
            robot.respond(/premier-league fixtures/i, function (msg) {
                _this.hubotFutbolWisdom.showLeagueFixtures(354).then(function (fixtures) {
                    _this.messageSender.send(msg, fixtures);
                });
            });
            robot.respond(/real-madrid fixtures/i, function (msg) {
                _this.hubotFutbolWisdom.showTeamFixtures(86).then(function (fixtures) {
                    _this.messageSender.send(msg, fixtures);
                });
            });
            robot.respond(/la-liga fixtures/i, function (msg) {
                _this.hubotFutbolWisdom.showLeagueFixtures(358).then(function (fixtures) {
                    _this.messageSender.send(msg, fixtures);
                });
            });
        };
    }
    return Futbol;
})();
var httpClient = require("request-promise");
var MessageSender = ms.MessageSender;
var HubotFutbolWisdom = fw.HubotFutbolWisdom;
var fn = new Futbol(new MessageSender(), new HubotFutbolWisdom(httpClient)).hubotAction;
module.exports = fn;