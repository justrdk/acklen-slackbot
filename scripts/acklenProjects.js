/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/underscore/underscore.d.ts"/>
// Description
//  A Hubot script written in TypeScript to show information about acklen avenue project
//
// Configuration:
//   None
//
// Commands:
//   hubot create project note ProjectWall
// Author:
//   Rene Rosa <realpasro09@hotmail.com>
//   Frank Rodriguez <frankhn0801@gmail.com>
"use strict";
//module Acklen {
//
//  export class Project{
//    constructor ()
//  }
//}
var fs = require('fs');
var _ = require('underscore');
var mongodb = require('mongodb').MongoClient;
var uri = 'mongodb://notesbot:ackl3n@ds041651.mongolab.com:41651/notesbot';
var projects = [];
var Project = (function () {
    function Project(robot) {
    }
    Project.prototype.createNotes = function (msg) {
        var projectName = msg.match[1];
        mongodb.connect(uri, function (err, db) {
            if (err) {
                console.log('Error: Unable to connect to database');
            }
            db.collection('notes').findOne({ "Note Name": { $regex: new RegExp(projectName, "i") } }, function (errFind, document) {
                if (document === null) {
                    db.collection('notes').insert({ "Note Name": projectName }, function (errIns) {
                        msg.reply('Great!, ' + projectName + ' notes created successfully');
                    });
                }
                else {
                    msg.reply('ooops looks like you already create this note');
                }
            });
        });
    };
    Project.prototype.addNote = function (msg) {
        var variableName = msg.match[1];
        var projectName = msg.match[2];
        var value = msg.match[3];
        mongodb.connect(uri, function (err, db) {
            if (err) {
                console.log('Error: Unable to connect to database');
            }
            db.collection('notes').findOne({ "Note Name": { $regex: new RegExp(projectName, "i") } }, function (errFind, document) {
                if (document === null) {
                    msg.reply("Hey fellow " + projectName +
                        " is not added as a project note, you can create a new" +
                        " note project with the command: create notes for [NoteName]");
                }
                else {
                    var newNote = {};
                    newNote[variableName] = value;
                    db.collection('notes').update({ "Note Name": { $regex: new RegExp(projectName, "i") } }, { $set: newNote }, function (errUpdate) {
                        msg.reply('Note ' + variableName + ' added to ' + projectName);
                    });
                }
            });
        });
    };
    Project.prototype.listNotesDetail = function (msg) {
        var projectName = msg.match[1];
        mongodb.connect(uri, function (err, db) {
            if (err) {
                console.log('Error: Unable to connect to database');
            }
            db.collection('notes').findOne({ "Note Name": { $regex: new RegExp(projectName, "i") } }, function (errFind, document) {
                if (document === null) {
                    msg.reply("_ok yo got me :grin: !, I don't have information about this note_");
                }
                else {
                    var response = '';
                    var properties = Object.keys(document);
                    for (var key in properties) {
                        var propertyName = properties[key];
                        response += "*" + properties[key] + ":* _" + document[propertyName] + "_ \n";
                    }
                    msg.reply(response);
                }
            });
        });
    };
    Project.prototype.listAll = function (msg) {
        mongodb.connect(uri, function (err, db) {
            if (err) {
                console.log('Error: Unable to connect to database');
            }
            db.collection('notes').find(function (errFind, documents) {
                var response = '';
                documents.toArray(function (errFind, notes) {
                    if (notes.length > 0) {
                        for (var note in notes) {
                            response += "*" + parseInt(note) + 1 + ".* _" + notes[note]["Note Name"] + "_ \n";
                        }
                        response += "_If you want to see the detail of each note project just try:_ \n";
                        response += "_[NoteName]_ notes detail";
                        msg.send(response);
                    }
                    else {
                        msg.send("there aren't notes, try adding one with the command: create notes for _[NoteName]_");
                    }
                });
            });
        });
    };
    Project.prototype.deleteNote = function (msg) {
        var projectName = msg.match[1];
        mongodb.connect(uri, function (err, db) {
            if (err) {
                console.log('Error: Unable to connect to database');
            }
            db.collection('notes').findOne({ "Note Name": { $regex: new RegExp(projectName, "i") } }, function (errFind, document) {
                if (document === null) {
                    msg.reply("this notes does not exist!");
                }
                else {
                    db.collection('notes').remove({ "Note Name": { $regex: new RegExp(projectName, "i") } }, 1, function (err) {
                        msg.reply("Note " + projectName + " removed successfully");
                    });
                }
            });
        });
    };
    Project.prototype.editNotes = function (msg) {
        var property = msg.match[1];
        var projectName = msg.match[2];
        var newValue = msg.match[3];
        mongodb.connect(uri, function (err, db) {
            if (err) {
                console.log('Error: Unable to connect to database');
            }
            db.collection('notes').findOne({ "Note Name": { $regex: new RegExp(projectName, "i") } }, function (errFind, document) {
                if (document === null) {
                    msg.reply("ok yo got me :grin: !, I don't have information about this note");
                }
                else {
                    if (document[property] === undefined) {
                        msg.reply("Note " + property + " does not exist in " + projectName + "!");
                    }
                    else {
                        var editedNote = {};
                        editedNote[property] = newValue;
                        db.collection('notes').update({ "Note Name": { $regex: new RegExp(projectName, "i") } }, { $set: editedNote }, function (err) {
                            msg.reply("You have edited note " + property + " in " + projectName);
                        });
                    }
                }
            });
        });
    };
    Project.prototype.help = function (msg) {
        var response = '';
        response += "*Hi Fellow, these are the available commands for notes script:* \n";
        response += "*1.* create notes for _[NoteName]_ \n";
        response += "*2.* add _[NoteNameDetail]_ in _[NoteName]_ with _[NoteValueDetail]_ \n";
        response += "*3.* _[NoteName]_ notes detail \n";
        response += "*4.* edit _[NoteNameDetail]_ in _[NoteName]_ with _[NoteValueDetail]_ \n";
        response += "*5.* delete note _[NoteName]_ \n";
        response += "*6.* list all notes";
        msg.reply(response);
    };
    return Project;
}());
function AcklenProjects(robot) {
    var project = new Project(robot);
    robot.respond(/create notes for (.*)/i, function (msg) {
        project.createNotes(msg);
    });
    robot.respond(/add (.*) in (.*) with (.*)/i, function (msg) {
        project.addNote(msg);
    });
    robot.respond(/list all notes/i, function (msg) {
        project.listAll(msg);
    });
    robot.respond(/(.*) notes detail/i, function (msg) {
        project.listNotesDetail(msg);
    });
    robot.respond(/edit (.*) in (.*) with (.*)/i, function (msg) {
        project.editNotes(msg);
    });
    robot.respond(/delete note (.*)/i, function (msg) {
        project.deleteNote(msg);
    });
    robot.respond(/notes help/i, function (msg) {
        project.help(msg);
    });
}
module.exports = AcklenProjects;
