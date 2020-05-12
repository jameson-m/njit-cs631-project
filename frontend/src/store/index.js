import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import auth from './reducers';

const rootReducer = combineReducers({
  auth,
});

function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

  return store;
}

export default configureStore;
