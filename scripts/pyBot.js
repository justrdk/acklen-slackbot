// Description
//  A python interpreter for hubot.
//
// Configuration:
//   None
//
// Commands:
//   py> [python code]
//
// Author:
//   Byron Sommardahl <byron@acklenavenue.com>
var python = require('python').shell;
function PyBot(robot) {
    robot.hear(/py ?(.*)/i, function (msg) {
        var mycallback = function (err, data) {
            if (err) {
                msg.send("Python Error: " + data);
            }
            else {
                msg.send(data);
            }
        };
        var pythonCode = msg.match[1];
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', function (chunk) {
            python(pythonCode, mycallback);
        });
    });
}
module.exports = PyBot;
