
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

export function configureStore(rootReducer, initialState = {}, ...middlewares) {
  const mids = [applyMiddleware(thunk, ...middlewares)];
  if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    mids.push(window.devToolsExtension());
  }
  return createStore(
    rootReducer,
    initialState,
    compose(...mids),
  );
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}
