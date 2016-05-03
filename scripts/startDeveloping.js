/// <reference path="../../typings/node/node.d.ts"/>
"use strict";
var ms = require("../helpers/messageSender");
var ts = require("../helpers/trelloService");
var github = require("../helpers/githubService");
var StartDeveloping = (function () {
    function StartDeveloping(messageSender, tresloService, githubService) {
        var _this = this;
        this.messageSender = messageSender;
        this.tresloService = tresloService;
        this.githubService = githubService;
        this.registerListener = function (robot) {
            robot.respond(/Start Developing ?(.*)/i, function (msg) {
                var cardName = msg.match[1];
                var values = _this.tresloService.moveCard(cardName, "in dev");
                console.log("entro");
                var result = _this.githubService.createBranch(cardName, "development");
                _this.messageSender.send(msg, cardName + " is in developement pull the branch '" + cardName + "'");
            });
        };
    }
    return StartDeveloping;
}());
var httpClient = require("request-promise");
var MessageSender = ms.MessageSender;
var TrelloService = ts.TrelloService;
var GitHubServices = github.GithubServices;
var fn = new StartDeveloping(new MessageSender(), new TrelloService(httpClient), new GitHubServices(httpClient)).registerListener;
module.exports = fn;
