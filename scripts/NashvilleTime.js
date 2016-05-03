"use strict";
/// <reference path="../../typings/node/node.d.ts"/>
// Description
//  Mention anything about time zone, nashville time, or honduran time and you get taunted.
//
// Configuration:
//   None
//
// Commands:
//   time zone|Nashville Time|Honduran time|Honduras time|gringo time
//
// Author:
//   Byron Sommardahl <byron@acklenavenue.com>
function NashvilleTime(robot) {
    var taunts = [
        "Only a sith deals in times other than Nashville Time!",
        "http://joshowens.me/content/images/2014/Nov/timezone-meme.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJjN9aW3UM5r2KNc83eh7kjJK0Yd4JOhplskP-WJW1DTLFhqTwjQ",
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQu5Oxk-y5MmZVquRbeSzzngH6990LSh-K08D0BUcKUjvKNncsW",
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTmkNuEnmaC0nxr5CRb0gIGe0yggqUjZVvtCkiBszZNmZ9cvZ5QNg",
        "http://s2.quickmeme.com/img/9c/9cedc5066c87efc1c09dffe668c6adf919500a34b9cb337a3afff7aa1622f6fc.jpg",
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRy_LBFGoYQitLY2edYmRUnkljWMVtondEHrFObnbOfYs8IBsvQ_g"
    ];
    robot.hear(/time zone|Nashville Time|Honduran time|Honduras time|gringo time/i, function (msg) {
        msg.reply(msg.random(taunts));
    });
}
module.exports = NashvilleTime;
