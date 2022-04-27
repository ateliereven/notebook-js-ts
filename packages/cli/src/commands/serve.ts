import path from "path";
import { Command } from "commander";
import { serve } from '@notebook-js-ts/local-api';

interface IErrType {
  code: string;
}

// for distinguishing between development mode and running on the user's machine = 'production':
const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
   .command('serve [filename]') // [] indicates an optional value
   .description('Open a file for editing')
   .option('-p, --port <number>', 'port to run server on', '4005') //third argument is the default option for port. <> indicates a required value
   .action(async (filename = 'mynotes.js', options: { port: string }) => {
      try {
         const dir = path.join(process.cwd(), path.dirname(filename)); //the absolute path for the directory the user types in. this is important to avoid creating a new directory by accident
         const file = path.basename(filename);// extracting just the file name from the relative path the user might type in
         await serve(parseInt(options.port), file, dir, !isProduction); //parseInt for parsing the port string into a number
         console.log(`Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`)
      } catch (err) {
         // the following is to satisfy typescript type issues with err:
         const hasErrCode = (x: any): x is IErrType => {
             return x.code;
        };
         if (hasErrCode(err)) {
            if (err.code === 'EADDRINUSE') {
               console.error('Port is in use. Try running on a different port by typing "-p <port number>" manually.')
            } else {
               if (err instanceof Error) {
                  console.log('Here is the problem:', err.message);
               }
            }
            // if the server failed to start then force exit the program:
            process.exit(1);
         }
         
      }

   });