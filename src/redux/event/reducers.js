import { createReducer } from '../../utils/redux';
import * as types from './types';

const initialState = {
  loading: false,
  statusText: null,
};

export default createReducer(initialState, {
  [types.EVENT_REQUEST]: state => (
    Object.assign({}, state, {
      loading: true,
    })
  ),
  [types.EVENT_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
      statusText: null,
      event: Object.assign({}, payload.event),
    })
  ),
  [types.EVENT_EXISTING]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
      statusText: null,
      event: Object.assign({}, payload.event),
    })
  ),
  [types.EVENT_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
      statusText: payload.statusText,
      createdAt: 0,
    })
  ),
});
