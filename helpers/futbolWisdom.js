"use strict";
var HubotFutbolWisdom = (function () {
    function HubotFutbolWisdom(promise) {
        this.promise = promise;
    }
    HubotFutbolWisdom.prototype.showHelp = function () {
        var helpMessage = "*Futbol Wisdom Help* \n\n";
        helpMessage += "*premier-league standings* : _Return the actual season standing for England's Premier League_ \n";
        helpMessage += "*premier-league fixtures* : _Return todays fixtures for England's Premier League_ \n";
        helpMessage += "*la-liga standings* : _Return the actual season standing for Spain's La Liga_ \n";
        helpMessage += "*la-liga fixtures* : _Return todays fixtures for Spains's La Liga_ \n";
        helpMessage += "*bundes-liga standings* : _Return the actual season standing for Germany's Bundesliga_ \n";
        helpMessage += "*bundes-liga fixtures* : _Return todays fixtures for Germany's Bundesliga_ \n";
        helpMessage += "*real-madrid fixtures* : _Return todays fixtures for Real Madrid_ \n";
        helpMessage += "*barcelona fixtures* : _Return todays fixtures for FC Barcelona_ \n";
        return helpMessage;
    };
    HubotFutbolWisdom.prototype.showTeamFixtures = function (id) {
        var dateTimeToday = new Date();
        var month = (dateTimeToday.getMonth() + 1) <= 9 ? "0" + (dateTimeToday.getMonth() + 1) : (dateTimeToday.getMonth() + 1);
        var day = (dateTimeToday.getDate()) <= 9 ? "0" + (dateTimeToday.getDate()) : (dateTimeToday.getDate());
        var dateTimeTodayString = dateTimeToday.getFullYear() + "-" + month + "-" + day;
        var urlToGet = "http://api.football-data.org/alpha/teams/" + id + "/fixtures?timeFrameStart=" + dateTimeTodayString + "&timeFrameEnd=" + dateTimeTodayString;
        var options = {
            method: 'GET',
            uri: urlToGet,
            headers: {
                "X-Auth-Token": "ad4d8f3691544a078374593ef45b89f0"
            }
        };
        var promiseFixtures = this.promise(options);
        return promiseFixtures.then(function (body) {
            var fixtures = JSON.parse(body);
            var message = "";
            if (fixtures.fixtures.length > 0) {
                message = "\n` MatchDay ` | ` Home Team                            ` | ` Away Team                            ` | ` Status         ` \n";
                for (var i = 0; i < fixtures.fixtures.length; i++) {
                    var game = fixtures.fixtures[i];
                    var length = 35;
                    var homeTeamNameLength = game.homeTeamName.length;
                    var awayTeamNameLength = game.awayTeamName.length;
                    var newLengthHomeTeam = length - homeTeamNameLength;
                    var newLengthAwayTeam = length - awayTeamNameLength;
                    var matchday = (game.matchday <= 9) ? game.matchday + " " : game.matchday;
                    var newStatusLength = 15 - game.status.length;
                    message += "` " + matchday + "       ` | ` " + game.homeTeamName + " " + game.result.goalsHomeTeam + new Array(newLengthHomeTeam).join(' ') + "` | ` " + game.awayTeamName + " " + game.result.goalsAwayTeam + new Array(newLengthAwayTeam).join(' ') + "` | ` " + game.status + new Array(newStatusLength).join(' ') + " `\n";
                }
                return message;
            }
            else {
                message = "No games for today. Go back to work.";
            }
            return message;
        });
    };
    HubotFutbolWisdom.prototype.showLeagueTable = function (id) {
        var urlToGet = 'http://api.football-data.org/alpha/soccerseasons/' + id + '/leagueTable';
        var options = {
            method: 'GET',
            uri: urlToGet,
            headers: {
                "X-Auth-Token": "ad4d8f3691544a078374593ef45b89f0"
            }
        };
        var promise = this.promise(options);
        return promise.then(function (body) {
            var leagueTable = JSON.parse(body);
            var message = "";
            var team;
            if (leagueTable.standing.length === 0) {
                message = "No league table was found, get back to work!";
            }
            else {
                message = "` Position ` | ` Team Name                                         ` | ` Points  ` \n";
                for (var i = 0; i < leagueTable.standing.length; i++) {
                    team = leagueTable.standing[i];
                    var length = 50;
                    var teamNameLength = team.teamName.length;
                    var newLength = length - teamNameLength;
                    var teamPosition = (team.position <= 9) ? team.position + " " : team.position;
                    message += "` " + teamPosition + "       ` | ` " + team.teamName + new Array(newLength).join(' ') + " ` | ` " + team.points + "pts   `\n";
                }
            }
            return message;
        });
    };
    HubotFutbolWisdom.prototype.showLeagueFixtures = function (id) {
        var dateTimeToday = new Date();
        var month = (dateTimeToday.getMonth() + 1) <= 9 ? "0" + (dateTimeToday.getMonth() + 1) : (dateTimeToday.getMonth() + 1);
        var day = (dateTimeToday.getDate()) <= 9 ? "0" + (dateTimeToday.getDate()) : (dateTimeToday.getDate());
        var dateTimeTodayString = dateTimeToday.getFullYear() + "-" + month + "-" + day;
        var urlToGet = "http://api.football-data.org/alpha/soccerseasons/" + id + "/fixtures?timeFrameStart=" + dateTimeTodayString + "&timeFrameEnd=" + dateTimeTodayString;
        var options = {
            method: 'GET',
            uri: urlToGet,
            headers: {
                "X-Auth-Token": "ad4d8f3691544a078374593ef45b89f0"
            }
        };
        var promiseFixtures = this.promise(options);
        return promiseFixtures.then(function (body) {
            var fixtures = JSON.parse(body);
            var message = "";
            if (fixtures.fixtures.length > 0) {
                message = "\n` MatchDay ` | ` Home Team                            ` | ` Away Team                            ` | ` Status         ` \n";
                for (var i = 0; i < fixtures.fixtures.length; i++) {
                    var game = fixtures.fixtures[i];
                    var length = 35;
                    var homeTeamNameLength = game.homeTeamName.length;
                    var awayTeamNameLength = game.awayTeamName.length;
                    var newLengthHomeTeam = length - homeTeamNameLength;
                    var newLengthAwayTeam = length - awayTeamNameLength;
                    var matchday = (game.matchday <= 9) ? game.matchday + " " : game.matchday;
                    var newStatusLength = 15 - game.status.length;
                    message += "` " + matchday + "       ` | ` " + game.homeTeamName + " " + game.result.goalsHomeTeam + new Array(newLengthHomeTeam).join(' ') + "` | ` " + game.awayTeamName + " " + game.result.goalsAwayTeam + new Array(newLengthAwayTeam).join(' ') + "` | ` " + game.status + new Array(newStatusLength).join(' ') + " `\n";
                }
                return message;
            }
            else {
                message = "No games for today. Go back to work.";
            }
            return message;
        });
    };
    return HubotFutbolWisdom;
}());
exports.HubotFutbolWisdom = HubotFutbolWisdom;
