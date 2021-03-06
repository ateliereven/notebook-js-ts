import { Dispatch } from "redux";
import axios from "axios";
import { ActionType } from "../action-types";
import {
   Action,
   MoveCellAction,
   DeleteCellAction,
   UpdateCellAction,
   InsertCellAfterAction,
} from "../actions";
import { Cell, CellTypes } from "../cell";
import { Direction } from "../direction";
import { LanguageLoader } from "../language-loader";
import bundle from "../../bundler";
import { RootState } from "../reducers";

export const updateCell = (id: string, content: string): UpdateCellAction => {
   return {
      type: ActionType.UPDATE_CELL,
      payload: {
         id,
         content
      }
   };
 };

export const deleteCell = (id: string): DeleteCellAction => {
   return {
      type: ActionType.DELETE_CELL,
      payload: id
   };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
   return {
      type: ActionType.MOVE_CELL,
      payload: {
         id,
         direction
      }
   };
};

export const insertCellAfter = (id: string | null, cellType: CellTypes, cellContent: string = ''): InsertCellAfterAction => {
   return {
      type: ActionType.INSERT_CELL_AFTER,
      payload: {
         id,
         type: cellType
      }
   };
};

//duplicateCell is the same as insertCellAfter, only it receives the duplicated cell's content as an argumenent
export const duplicateCell = (id: string | null, cellType: CellTypes, cellContent: string): InsertCellAfterAction => {
   return {
      type: ActionType.INSERT_CELL_AFTER,
      payload: {
         id,
         type: cellType,
         content: cellContent
      }
   };
}
 
export const createBundle = (cellId: string, input: string, language: LanguageLoader) => {
   return async (dispatch: Dispatch<Action>) => {
      dispatch({
         type: ActionType.BUNDLE_START,
         payload: {
            cellId,
            language
         },
      });
      const result = await bundle(input, language);
      dispatch({
         type: ActionType.BUNDLE_COMPLETE,
         payload: {
            cellId,
            bundle: result,
            language
         },
      });
   };
};

export const fetchCells = () => {
   return async (dispatch: Dispatch<Action>) => {
      dispatch({ type: ActionType.FETCH_CELLS });

      try {
         const { data } = await axios.get<Cell[]>('/cells'); // data is an array of cell objects
         dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
      } catch (err) {
         // next line is to to satisfy typescript type issues with err:
         if (err instanceof Error) {
            dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: err.message });
         }
      }
   };
};

export const saveCells = () => {
   return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
      const {
         cells: { data, order }
      } = getState();
      const cells = order.map(id => data[id]);
      try {
         await axios.post('/cells', { cells });
      } catch (err) {
         // next line is to to satisfy typescript type issues with err:
         if (err instanceof Error) {
            dispatch({
               type: ActionType.SAVE_CELLS_ERROR,
               payload: err.message
            });
         }
      }
      
   };
};