import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";

// dispatching the saveCells action whenever one of the cell actions is dispatched:
export const persistMiddleware = ({
   dispatch,
   getState,
}: {
   dispatch: Dispatch<Action>;
   getState: () => RootState
}) => {
   let timer: NodeJS.Timeout;
   return (next: (action: Action) => void) => {
      return (action: Action) => {
         next(action);
         if (
            [
               ActionType.DELETE_CELL,
               ActionType.INSERT_CELL_AFTER,
               ActionType.MOVE_CELL,
               ActionType.UPDATE_CELL
            ].includes(action.type)
         ) {
            //debouncing:
            if (timer) {
               clearTimeout(timer);
            }
            timer = setTimeout(() => {
               //saveCells is an action creator used with redux thunk, which means this function is immidiately invoked with dispatch and getState:
               saveCells()(dispatch, getState);
            }, 250);
         }
      };
   };
};