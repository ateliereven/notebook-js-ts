import { ActionType } from "../action-types";
import { CellTypes } from "../cell";
import { Direction } from "../direction";

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
   }
}
export interface UpdateCellAction {
   type: ActionType.UPDATE_CELL;
      payload: {
      id: string;
      content: string;
   }
}

// a union of all possible action types:
export type Action = 
   MoveCellAction
   | DeleteCellAction
   | InsertCellAfterAction
   | UpdateCellAction