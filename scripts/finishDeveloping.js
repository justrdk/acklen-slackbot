"use strict";
var ms = require("../helpers/messageSender");
var ts = require("../helpers/trelloService");
var github = require("../helpers/githubService");
var FinishDeveloping = (function () {
    function FinishDeveloping(messageSender, tresloService, githubService) {
        var _this = this;
        this.messageSender = messageSender;
        this.tresloService = tresloService;
        this.githubService = githubService;
        this.registerListener = function (robot) {
            robot.respond(/Finish Developing ?(.*)/i, function (msg) {
                var cardName = msg.match[1];
                var values = _this.tresloService.moveCard(cardName, "ready for code review");
                var pullRequest = _this.githubService.createPullRequest("Code review: " + cardName, cardName, "development", "Merge me, master.");
                pullRequest.then(function (body) {
                    var response = JSON.parse(body);
                    _this.messageSender.send(msg, cardName + "is in ready for code review, check the pull request here: '" + response.html_url + "'");
                });
            });
        };
    }
    return FinishDeveloping;
}());
var httpClient = require("request-promise");
var MessageSender = ms.MessageSender;
var TrelloService = ts.TrelloService;
var GitHubServices = github.GithubServices;
var fn = new FinishDeveloping(new MessageSender(), new TrelloService(httpClient), new GitHubServices(httpClient)).registerListener;
module.exports = fn;
