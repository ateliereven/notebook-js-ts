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
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises")); // module for saving or loading files of the hard drive
const path_1 = __importDefault(require("path"));
const createCellsRouter = (filename, dirname) => {
    const router = express_1.default.Router();
    // body parsing middleware:
    router.use(express_1.default.json());
    const fullPath = path_1.default.join(dirname, filename);
    router.get('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // read the file:
            const result = yield promises_1.default.readFile(fullPath, { encoding: 'utf-8' });
            // parse a list of cells out of it:
            res.send(JSON.parse(result));
        }
        catch (err) {
            // the following is to satisfy typescript type issues with err:
            const hasErrCode = (x) => {
                return x.code;
            };
            if (hasErrCode(err)) {
                // If read throws an error, inspect error. if the file doesn't exist, add code to create file and add default list of cells:
                if (err.code === 'ENOENT') {
                    yield promises_1.default.writeFile(fullPath, '[]', 'utf-8'); // an empty array meand we have no cells in the list
                    // send list of cells back to browser:
                    res.send([]);
                }
                else {
                    throw err;
                }
            }
        }
    }));
    router.post('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // if the cell storage file doesn't exist, it will be created automatically, no need to check it.
        // take the list of cells from the request object:
        //serialize them
        const { cells } = req.body;
        // write cells into the file as plain text:
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        res.send({ status: 'ok' });
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;
