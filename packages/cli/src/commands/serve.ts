import path from "path";
import { Command } from "commander";
import { serve } from 'local-api';

export const serveCommand = new Command()
   .command('serve [filename]') // [] indicates an optional value
   .description('Open a file for editing')
   .option('-p, --port <number>', 'port to run server on', '4005') //third argument is the default option for port. <> indicates a required value
   .action((filename = 'mynotes.js', options: { port: string }) => {
      const dir = path.join(process.cwd(), path.dirname(filename)); //the absolute path for the directory the user types in. this is important to avoid creating a new directory by accident
      const file = path.basename(filename);// extracting just the file name from the relative path the user might type in
      serve(parseInt(options.port), file, dir); //parseInt for parsing the port string into a number
   });