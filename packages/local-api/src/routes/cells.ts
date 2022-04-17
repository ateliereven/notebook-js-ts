import express from 'express';
import fs from 'fs/promises'; // module for saving or loading files of the hard drive
import path from 'path';

interface Cell {
   id: string;
   content: string;
   type: 'text' | 'code';
}
interface IErrType {
  code: string;
}

export const createCellsRouter = (filename: string, dirname: string) => {
   const router = express.Router();
   // body parsing middleware:
   router.use(express.json()); 

   const fullPath = path.join(dirname, filename);

   router.get('/cells', async (req, res) => {
      try {
         // read the file:
         const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
         // parse a list of cells out of it:
         res.send(JSON.parse(result));
      } catch (err) {
         // the following is to satisfy typescript type issues with err:
         const hasErrCode = (x: any): x is IErrType => {
            return x.code;
         };
         if (hasErrCode(err)) {
            // If read throws an error, inspect error. if the file doesn't exist, add code to create file and add default list of cells:
            if (err.code === 'ENOENT') {
               await fs.writeFile(fullPath, '[]', 'utf-8'); // an empty array meand we have no cells in the list
               // send list of cells back to browser:
               res.send([]);
            } else {
               throw err;
            }
         }
      }
   });

   router.post('/cells', async (req, res) => {
      // if the cell storage file doesn't exist, it will be created automatically, no need to check it.
      // take the list of cells from the request object:
      //serialize them
      const { cells }: {cells: Cell[]} = req.body;
      // write cells into the file as plain text:
      await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
      res.send({ status: 'ok' });
   });

   return router;
};