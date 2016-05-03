/// <reference path="../../typings/node/node.d.ts"/>
"use strict";
var ms = require("../helpers/messageSender");
var ts = require("../helpers/trelloService");
var github = require("../helpers/githubService");
var Merge = (function () {
    function Merge(messageSender, tresloService, githubService) {
        var _this = this;
        this.messageSender = messageSender;
        this.tresloService = tresloService;
        this.githubService = githubService;
        this.registerListener = function (robot) {
            robot.respond(/Merge ?(.*)/i, function (msg) {
                var cardName = msg.match[1];
                var values = _this.tresloService.moveCard(cardName, "ready for testing");
                _this.githubService.merge(cardName);
                _this.messageSender.send(msg, cardName + "is in ready for testing");
            });
        };
    }
    return Merge;
}());
var httpClient = require("request-promise");
var MessageSender = ms.MessageSender;
var TrelloService = ts.TrelloService;
var GitHubServices = github.GithubServices;
var fn = new Merge(new MessageSender(), new TrelloService(httpClient), new GitHubServices(httpClient)).registerListener;
module.exports = fn;
