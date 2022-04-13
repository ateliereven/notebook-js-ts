"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const serve_1 = require("./commands/serve");
commander_1.program.addCommand(serve_1.serveCommand);
//if you want to add additional commands then chain another .addCommand(<new command>)
// telling commander to parse the command line arguments and execute the appropriate command:
commander_1.program.parse(process.argv);
