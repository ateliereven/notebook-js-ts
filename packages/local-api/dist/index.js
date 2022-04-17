"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const path_1 = __importDefault(require("path"));
const cells_1 = require("./routes/cells");
const serve = (port, filename, dir, useProxy) => {
    const app = (0, express_1.default)();
    if (useProxy) {
        //for developer mode - serve react app via create-react-app on port 3000:
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent',
            changeOrigin: true,
        }));
    }
    else {
        //serving up the application when installed on the user's local machine:
        //create absolute path for local-client folder inside node-modules:
        const packagePath = require.resolve('local-client/build/index.html');
        //express.static serves up files from a local folder:
        app.use(express_1.default.static(path_1.default.dirname(packagePath))); //path.dirname returns the absolute path to the folder without the file name.
    }
    ;
    app.use((0, cells_1.createCellsRouter)(filename, dir));
    // wrapping the express server inside a returned promise:
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
