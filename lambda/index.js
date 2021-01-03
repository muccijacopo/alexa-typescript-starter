const skill = require("./build/index");

console.log("skill: ", skill);

exports.handler = skill.handler;
