/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/chai-as-promised/chai-as-promised.d.ts" />
/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../helpers/messageSender.ts"/>
/// <reference path="./fakes/fakeResponse.ts"/>
/// <reference path="../../typings/mocha/mocha.d.ts" />
"use strict";
var _this = this;
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;
var Futbol = require('../scripts/futbol');
var rob = require('./fakes/FakeRobot');
var FakeRobot = rob.FakeRobot;
var res = require('./fakes/FakeResponse');
var FakeResponse = res.FakeResponse;
describe("The Futbol Wisdom Hubot Script (integration)", function () {
    beforeEach(function () {
        _this.robot = new FakeRobot();
    });
    it("should respond to la liga standings", function (done) {
        var response = new FakeResponse();
        _this.robot.overhears("la-liga standings", response);
        Futbol(_this.robot);
        expect(response.waitForMessageToBeSent()).to.eventually.contain("Barcelona").notify(done);
    });
    it("should respond to premier league standings", function (done) {
        var response = new FakeResponse();
        _this.robot.overhears("premier-league standings", response);
        Futbol(_this.robot);
        expect(response.waitForMessageToBeSent()).to.eventually.contain("Manchester United").notify(done);
    });
    it("should respond to bundesliga standings", function (done) {
        var response = new FakeResponse();
        _this.robot.overhears("premier-league standings", response);
        Futbol(_this.robot);
        expect(response.waitForMessageToBeSent()).to.eventually.contain("Chelsea").notify(done);
    });
});
