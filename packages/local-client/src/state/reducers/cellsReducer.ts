// immer is a library for manipulating the state object without mutating the original state:
import produce from 'immer';
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
   loading: boolean;
   error: string | null;
   order: string[];
   data: {
      [key: string] : Cell
   }
}

// initial state with no cells, would be the default state of the reducer:
const initialState: CellsState = {
   loading: false,
   error: null,
   order: [],
   data: {}
};

const reducer = produce((state: CellsState = initialState, action: Action): CellsState | void => {
   switch (action.type) {
      case ActionType.SAVE_CELLS_ERROR:
         state.error = action.payload;
         return;
      case ActionType.FETCH_CELLS:
         state.loading = true;
         state.error = null;
         return;
      case ActionType.FETCH_CELLS_COMPLETE:
         state.order = action.payload.map(cell => cell.id);
         state.data = action.payload.reduce((acc, cell) => {
            acc[cell.id] = cell;
            return acc;
         }, {} as CellsState['data']);
         return;
      case ActionType.FETCH_CELLS_ERROR:
         state.loading = false;
         state.error = action.payload;
         return;
      case ActionType.UPDATE_CELL:
         const { id, content } = action.payload;
         state.data[id].content = content;
         return;
         // option for updating state without immer //
         // return {
         //    ...state,
         //    // adding a new data object to the current state:
         //    data: {
         //       ...state.data,
         //       [action.payload.id]: {
         //          ...state.data[action.payload.id],
         //          // updating content of cell:
         //          content: action.payload.content
         //       }
         //    }
         // };
      case ActionType.DELETE_CELL:
         delete state.data[action.payload];
         state.order = state.order.filter(id => id !== action.payload);
         return;
      case ActionType.MOVE_CELL:
         const { direction } = action.payload;
         const index = state.order.indexOf(action.payload.id);
         const targetIndex = direction === 'up' ? index - 1 : index + 1;
         if (targetIndex < 0 || targetIndex > state.order.length - 1) return;
         state.order[index] = state.order[targetIndex];
         state.order[targetIndex] = action.payload.id;
         return;
      case ActionType.INSERT_CELL_AFTER: {
         const cell: Cell = {
            content: action.payload.content? action.payload.content : '',
            type: action.payload.type,
            id: randomId()
         };
         state.data[cell.id] = cell;
         const index = state.order.findIndex(id => id === action.payload.id);
         index < 0 ? state.order.unshift(cell.id) : state.order.splice(index+1, 0, cell.id);
         return;
      }
      default:
         return state;
   }
   // return state is unecessary in all switch cases because immer takes care of the state.
   // however, typescript determnines the type of state as undefined if nothing is returned.
   // this is avoided by adding initialState as a second argument to the produce function.
}, initialState);

const randomId = () => {
   // return a random id with numbers and letters
   return Math.random().toString(36).substring(2, 7);
}

export default reducer;