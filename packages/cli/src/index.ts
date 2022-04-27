#!/usr/bin/env node
import { program } from 'commander';
import { serveCommand } from './commands/serve';

program.addCommand(serveCommand);
//if you want to add additional commands then chain another .addCommand(<new command>)

// telling commander to parse the command line arguments and execute the appropriate command:
program.parse(process.argv)
