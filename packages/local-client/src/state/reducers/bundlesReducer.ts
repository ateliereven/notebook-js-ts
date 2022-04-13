import produce from 'immer';
import reducers from '.';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
   [key: string]: {
      loading: boolean;
      code: string;
      err: string;
   } | undefined; // when the app is fist booting up the bundles state is undefined, there is not yet a bundle for a particulat cell
}

// initial state defaulted to be a empty object:
const initialState: BundlesState = {};

const reducer = produce((state: BundlesState = initialState, action: Action): BundlesState => {
   switch (action.type) {
      case ActionType.BUNDLE_START:
         state[action.payload.cellId] = {
            loading: true,
            code: '',
            err: ''
         };
         return state;
      case ActionType.BUNDLE_COMPLETE:
         state[action.payload.cellId] = {
            loading: false,
            code: action.payload.bundle.code,
            err: action.payload.bundle.err
         };
         return state;
      default:
         return state;
   }
}, initialState);

export default reducer;