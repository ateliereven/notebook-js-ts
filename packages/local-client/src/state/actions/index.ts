import { ActionType } from "../action-types";
import { Cell, CellTypes } from "../cell";
import { Direction } from "../direction";
import { LanguageLoader } from "../language-loader";

export interface MoveCellAction {
   type: ActionType.MOVE_CELL;
   payload: {
      id: string;
      direction: Direction;
   }
}
export interface DeleteCellAction {
   type: ActionType.DELETE_CELL;
   payload: string; //would be the id of the cell the user deletes
}
export interface InsertCellAfterAction {
   type: ActionType.INSERT_CELL_AFTER;
   payload: {
      id: string | null;
      type: CellTypes;
      content?: string;
   }
}
export interface UpdateCellAction {
   type: ActionType.UPDATE_CELL;
      payload: {
      id: string;
      content: string;
   }
}

export interface BundleStartAction {
   type: ActionType.BUNDLE_START;
   payload: {
      cellId: string,
      language: LanguageLoader
   }
}

export interface BundleCompleteAction {
   type: ActionType.BUNDLE_COMPLETE;
   payload: {
      cellId: string;
      bundle: {
         code: string;
         err: string;
      }
      language: LanguageLoader
   }
}

export interface FetchCellsAction {
   type: ActionType.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
   type: ActionType.FETCH_CELLS_COMPLETE;
   payload: Cell[];
}

export interface FetchCellsErrorAction {
   type: ActionType.FETCH_CELLS_ERROR;
   payload: string;
}

export interface SaveCellsErrorAction {
   type: ActionType.SAVE_CELLS_ERROR;
   payload: string;
}

// a union of all possible action types:
export type Action =
   | MoveCellAction
   | DeleteCellAction
   | InsertCellAfterAction
   | UpdateCellAction
   | BundleStartAction
   | BundleCompleteAction
   | FetchCellsAction
   | FetchCellsCompleteAction
   | FetchCellsErrorAction
   | SaveCellsErrorAction;