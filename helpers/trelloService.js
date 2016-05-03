"use strict";
/// <reference path="../../typings/node/node.d.ts"/>
var _ = require("underscore");
var TrelloService = (function () {
    function TrelloService(httpClient) {
        this.httpClient = httpClient;
        this.boardId = "55314f6bf10520a36ce9250f";
        this.backlogId = "55314f7433029f1cf32811d6";
        this.onDeckId = "55314f87531e125bd4569ef0";
        this.inDev = "55314fc1b6dd68995271f7ab";
        this.readyForCodeReview = "55314fad4752513188e28090";
        this.readyForTesting = "55314ff25c4112b46c0eb65f";
        this.key = "762756329d379eab41f982807ca3b6a4";
        this.token = "c6f88e572ad30472b9b29b74801a5b8f32b74cb4dae112dda505097a14870f1c";
    }
    TrelloService.prototype.moveCard = function (cardName, listName) {
        var _this = this;
        var cardsInBacklogPromise = this.httpClient("https://api.trello.com/1/boards/55314f6bf10520a36ce9250f/cards?key=762756329d379eab41f982807ca3b6a4&token=c6f88e572ad30472b9b29b74801a5b8f32b74cb4dae112dda505097a14870f1c");
        cardsInBacklogPromise.then(function (body) {
            var card = _.find(JSON.parse(body), function (item) {
                return item.name === cardName;
            });
            var listid = _this.getListId(listName);
            var options = {
                uri: "https://api.trello.com/1/cards/" + card.id + "?idList=" + listid + "&key=762756329d379eab41f982807ca3b6a4&token=c6f88e572ad30472b9b29b74801a5b8f32b74cb4dae112dda505097a14870f1c",
                method: 'PUT'
            };
            _this.httpClient(options).then(function (body) {
                return { url: card.shortUrl, name: card.name };
            }).catch(function (error) {
                throw new Error("Cant move the card: " + error);
            });
        }).catch(function (error) {
            throw new Error("Cant move the card: " + error);
        });
    };
    TrelloService.prototype.getListId = function (listName) {
        if (listName.toLowerCase() === "on deck")
            return this.onDeckId;
        if (listName.toLowerCase() === "backlog")
            return this.backlogId;
        if (listName.toLowerCase() === "in dev")
            return this.inDev;
        if (listName.toLowerCase() === "ready for code review")
            return this.readyForCodeReview;
        if (listName.toLowerCase() === "ready for testing")
            return this.readyForTesting;
    };
    return TrelloService;
}());
exports.TrelloService = TrelloService;
