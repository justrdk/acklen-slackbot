/// <reference path="../../typings/node/node.d.ts"/>
// Description:
//   Troll the url sharers
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot any url - meme of spongebob no one cares
// Author:
//   Osman Hernandez

class SlackTroll {
	constructor(private promise: any) {}

	trollAction = (robot: any) => {
		robot.hear(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i, (msg: any) => {
			var promise = this.promise("http://version1.api.memegenerator.net/Instance_Create?username=matador&password=matador&languageCode=en&generatorID=45&imageID=39519&text0=Nobody&text1=cares");

			promise.then((body) => {
				var random: any = Math.floor(Math.random() * 100);

				if (random < 50) {
					var memeData = JSON.parse(body);
					var memeURL = memeData.result.instanceImageUrl;
					msg.reply(memeURL);
				}
			});
		});

		robot.hear(/what an interesting link/i, (msg: any) => {
			var promise = this.promise("http://version1.api.memegenerator.net/Instance_Create?username=matador&password=matador&languageCode=en&generatorID=45&imageID=9488555&text0=So youve decided to share a link&text1=Please tell us more about it");

			promise.then((body) => {
				var memeData = JSON.parse(body);
				var memeURL = memeData.result.instanceImageUrl;
				msg.reply(memeURL);
			});
		});
	}
}

var httpClient = require("request-promise");
var fn = new SlackTroll(httpClient).trollAction;
export = fn
