import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { RootState } from '../common/types';
import { composeWithDevTools } from 'redux-devtools-extension';
import { petitionsReducer } from '../features/petitions/petitionsReducer';
import { defaultPetitionsState } from './defaults';

const rootReducer = combineReducers({
  petitions: petitionsReducer
});

const initialState = {
  petitions: defaultPetitionsState
};

export const configureStore = (state?: RootState): Store<RootState> => {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware<ThunkMiddleware>(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools({
    trace: true
  });
  return createStore(rootReducer, state || initialState, composedEnhancers(...enhancers));
};
