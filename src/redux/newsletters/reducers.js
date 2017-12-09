import { createReducer } from '../../utils/redux';
import * as types from './types';

const initialState = {
  loading: false,
  statusText: null,
  newsletters: [],
  createdAt: 0,
};

export default createReducer(initialState, {
  [types.NEWSLETTERS_REQUEST]: state => (
    Object.assign({}, state, {
      loading: true,
    })
  ),
  [types.NEWSLETTERS_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
      statusText: null,
      createdAt: (new Date()).getTime(),
      newsletters: [].concat(payload.newsletters),
    })
  ),
  [types.NEWSLETTERS_EXISTING]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
    })
  ),
  [types.NEWSLETTERS_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
      statusText: payload.statusText,
      createdAt: 0,
    })
  ),
});
