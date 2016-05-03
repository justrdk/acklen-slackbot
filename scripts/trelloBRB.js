/// <reference path="../../typings/node/node.d.ts"/>
// Configuration:
//   None
//
// Commands:
//   hubot brb and I'm back - move cards to in development list or paused
//
// Author:
//   Juan Jose Guevara, Aida Martinez <juanjose@acklenavenue.com, >
"use strict";
var httpClient = require('request-promise');
var key = "797802d631d9baf29d186424fe55c3c3";
var token = "259861bea77d82e20ddb7bcbfde81cb49c7f04ec4dd62f361a8c35099471c8bb";
var in_development_list_id = "5531389b43906b56da8a6fe2";
var paused_list_id = "553143820a7dd8fa71f33793";
function TrelloBRB(robot) {
    robot.respond(/brb?(.*)/i, function (msg) {
        moveCardsToPausedList(msg);
    });
    robot.respond(/I'm off for the day?(.*)/i, function (msg) {
        moveCardsToPausedList(msg);
    });
    function moveCardsToPausedList(msg) {
        var username = msg.match[1].trim();
        var options = {
            uri: "https://api.trello.com/1/lists/" + in_development_list_id + "/cards?key=" +
                key + "&token=" + token + "&members=true",
            method: "GET"
        };
        httpClient(options).then(function (cards) {
            var parsed_cards = JSON.parse(cards);
            var card_to_move = [];
            msg.send("Looking for your cards");
            for (var i = 0; i < parsed_cards.length; i++) {
                for (var j = 0; j < parsed_cards[i].members.length; j++) {
                    if (parsed_cards[i].members[j].username === username) {
                        card_to_move.push(parsed_cards[i]);
                    }
                }
            }
            if (card_to_move.length === 0) {
                msg.send("you don't have any card on development");
            }
            else {
                msg.send("moving cards to Paused list");
                for (var i = 0; i < card_to_move.length; i++) {
                    msg.send("moving card: " + card_to_move[i].name);
                    httpClient({
                        uri: "https://api.trello.com/1/cards/" + card_to_move[i].id +
                            "/idList?value=" + paused_list_id + "&key=" + key + "&token=" + token,
                        method: "PUT"
                    }).then(function (response) {
                        var card_moved = JSON.parse(response);
                        msg.send("card " + card_moved.name + " moved!");
                    }).catch(function (error) {
                        msg.send("error: " + error);
                    });
                }
            }
        }).catch(function (error) {
            msg.send("error while loading cards on development list");
        });
    }
    ;
    robot.respond(/I'm back?(.*)/i, function (msg) {
        moveCardsToInDevelopmentList(msg);
    });
    robot.respond(/I'm ready for work?(.*)/i, function (msg) {
        moveCardsToInDevelopmentList(msg);
    });
    function moveCardsToInDevelopmentList(msg) {
        var username = msg.match[1].trim();
        httpClient({
            uri: "https://api.trello.com/1/lists/" + paused_list_id + "/cards?key=" + key + "&token=" + token + "&members=true",
            method: "GET"
        }).then(function (response) {
            var cards = JSON.parse(response);
            var card_to_move = [];
            msg.send("Looking for your cards");
            for (var i = 0; i < cards.length; i++) {
                for (var j = 0; j < cards[i].members.length; j++) {
                    if (cards[i].members[j].username === username) {
                        msg.send("cards found");
                        card_to_move.push(cards[i]);
                    }
                }
            }
            if (card_to_move.length === 0) {
                msg.send("you don't have any card on paused");
            }
            else {
                msg.send("moving cards back to In Development list");
                for (var i = 0; i < card_to_move.length; i++) {
                    msg.send("moving card: " + card_to_move[i].name);
                    httpClient({
                        uri: "https://api.trello.com/1/cards/" + card_to_move[i].id +
                            "/idList?value=" + in_development_list_id + "&key=" + key + "&token=" + token,
                        method: "PUT"
                    }).then(function (response) {
                        var card_moved = JSON.parse(response);
                        msg.send("card " + card_moved.name + " moved!");
                    }).catch(function (error) {
                        msg.send("error: " + error);
                    });
                }
            }
        }).catch(function (error) {
            msg.send("error while loading cards on paused list");
        });
    }
    ;
}
module.exports = TrelloBRB;
