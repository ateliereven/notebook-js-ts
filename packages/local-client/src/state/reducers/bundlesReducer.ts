import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import {LanguageLoader} from '../language-loader'

interface BundlesState {
   [key: string]:
      | {
         loading: boolean;
         code: string;
         err: string;
         loader: LanguageLoader;
         }
      | undefined; // when the app is fist booting up the bundles state is undefined, there is not yet a bundle for a particular cell
}

// initial state defaulted to be a empty object:
const initialState: BundlesState = {};

const reducer = produce((state: BundlesState = initialState, action: Action): BundlesState => {
   switch (action.type) {
      case ActionType.BUNDLE_START:
         const {cellId, language} = action.payload
         state[cellId] = {
            loading: true,
            code: '',
            err: '',
            loader: language
         };
         return state;
      case ActionType.BUNDLE_COMPLETE: {
         const { cellId, language, bundle } = action.payload
         state[cellId] = {
            loading: false,
            code: bundle.code,
            err: bundle.err,
            loader: language
         };
         return state;
      }
      default:
         return state;
   }
}, initialState);

export default reducer;