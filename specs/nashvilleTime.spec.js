"use strict";
var _this = this;
var NashvilleTime = require('../scripts/NashvilleTime');
var rob = require('./fakes/FakeRobot');
var FakeRobot = rob.FakeRobot;
var res = require('./fakes/FakeResponse');
var FakeResponse = res.FakeResponse;
var chai = require('chai');
var expect = chai.expect;
describe("The Nashville Time Hubot script", function () {
    beforeEach(function () {
        _this.robot = new FakeRobot();
    });
    it("should respond to 'time zone' with a taunt.", function () {
        var resp = new FakeResponse();
        _this.robot.overhears("time zone", resp);
        NashvilleTime(_this.robot);
        expect(resp.messageReplied).to.equal("Only a sith deals in times other than Nashville Time!");
    });
    it("should respond to 'time zone' with a taunt.", function () {
        var resp = new FakeResponse();
        _this.robot.overhears("nashville time", resp);
        resp.setRandomResponse(1);
        NashvilleTime(_this.robot);
        expect(resp.messageReplied).to.equal("http://joshowens.me/content/images/2014/Nov/timezone-meme.jpg");
    });
    it("should respond to 'GriNgo TiMe' with a taunt.", function () {
        var resp = new FakeResponse();
        _this.robot.overhears("GriNgo TiMe", resp);
        resp.setRandomResponse(2);
        NashvilleTime(_this.robot);
        expect(resp.messageReplied).to.equal("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJjN9aW3UM5r2KNc83eh7kjJK0Yd4JOhplskP-WJW1DTLFhqTwjQ");
    });
});
