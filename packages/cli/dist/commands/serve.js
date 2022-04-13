"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("local-api");
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]') // [] indicates an optional value
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005') //third argument is the default option for port. <> indicates a required value
    .action((filename = 'mynotes.js', options) => {
    const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename)); //the absolute path for the directory the user types in. this is important to avoid creating a new directory by accident
    const file = path_1.default.basename(filename); // extracting just the file name from the relative path the user might type in
    (0, local_api_1.serve)(parseInt(options.port), file, dir); //parseInt for parsing the port string into a number
});
