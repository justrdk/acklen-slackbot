/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/chai-as-promised/chai-as-promised.d.ts" />
/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../helpers/messageSender.ts"/>
/// <reference path="./fakes/fakeResponse.ts"/>
/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../scripts/startDeveloping.ts" />
"use strict";
var _this = this;
var StartDevelopment = require('../scripts/StartDeveloping');
var rob = require('./fakes/FakeRobot');
var FakeRobot = rob.FakeRobot;
var res = require('./fakes/FakeResponse');
var FakeResponse = res.FakeResponse;
var chai = require('chai');
var expect = chai.expect;
describe("The Start Develop hubot script", function () {
    beforeEach(function () {
        _this.robot = new FakeRobot();
    });
    it("should respond respond with the card name and branch name", function () {
        var cardName = "alberto";
        var resp = new FakeResponse();
        _this.robot.overhears("Start Developing " + cardName, resp);
        StartDevelopment(_this.robot);
        expect(resp.messageSent).to.equal(cardName + " is in developement pull the branch '" + cardName + "'");
    });
});
