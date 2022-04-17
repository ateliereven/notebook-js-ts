"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("local-api");
// for distinguishing between development mode and running on the user's machine = 'production':
const isProduction = process.env.NODE_ENV === 'production';
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]') // [] indicates an optional value
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005') //third argument is the default option for port. <> indicates a required value
    .action((filename = 'mynotes.js', options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename)); //the absolute path for the directory the user types in. this is important to avoid creating a new directory by accident
        const file = path_1.default.basename(filename); // extracting just the file name from the relative path the user might type in
        yield (0, local_api_1.serve)(parseInt(options.port), file, dir, !isProduction); //parseInt for parsing the port string into a number
        console.log(`Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`);
    }
    catch (err) {
        // the following is to satisfy typescript type issues with err:
        const hasErrCode = (x) => {
            return x.code;
        };
        if (hasErrCode(err)) {
            if (err.code === 'EADDRINUSE') {
                console.error('Port is in use. Try running on a different port by typing "-p <port number>" manually.');
            }
            else {
                if (err instanceof Error) {
                    console.log('Here is the problem:', err.message);
                }
            }
            // if the server failed to start then force exit the program:
            process.exit(1);
        }
    }
}));
