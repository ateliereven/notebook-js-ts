import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from 'path';
import { createCellsRouter } from "./routes/cells";

export const serve = (port: number, filename: string, dir: string, useProxy: boolean): Promise<void> => {
   const app = express();

   app.use(createCellsRouter(filename, dir));

   if (useProxy) {
      //for developer mode - serve react app via create-react-app on port 3000:
      app.use(createProxyMiddleware({
            target: 'http://localhost:3000',
            ws: true, //enable websocket (used by react)
            logLevel: 'silent', //making sure the proxy middleware does'nt try to log every incoming request
            changeOrigin: true,
         })
      );
   } else {
      //serving up the application when installed on the user's local machine:
      //create absolute path for local-client folder inside node-modules:
      const packagePath = require.resolve('local-client/build/index.html');
      //express.static serves up files from a local folder:
      app.use(express.static(path.dirname(packagePath))); //path.dirname returns the absolute path to the folder without the file name.
   };

   // wrapping the express server inside a returned promise:
   return new Promise<void>((resolve, reject) => {
      app.listen(port, resolve).on('error', reject);
   });
};