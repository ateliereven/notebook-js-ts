import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { persistMiddleware } from './middlewares/persist-middleware';
import reducers from './reducers';
import * as actionCreators from './action-creators';

// for testing with redux devtools extension:
const composeEnhancers = composeWithDevTools({actionCreators}); //this is for having the action creators available on the dispatch tab
export const store = createStore(
   reducers,
   {},
   composeEnhancers(applyMiddleware(persistMiddleware, thunk))
   );


// manualy testing redux store before binding react with redux (easier way is to test with redux devtools):
// store.dispatch({
//    type: ActionType.INSERT_CELL_BEFORE,
//    payload: {
//       id: null,
//       type: 'code'
//    }
// });
// console.log(store.getState());