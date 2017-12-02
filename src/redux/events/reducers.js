import { createReducer } from '../../utils/redux';
import * as types from './types';

const initialState = {
  loading: false,
  statusText: null,
  events: [],
  createdAt: 0,
};

export default createReducer(initialState, {
  [types.EVENTS_REQUEST]: state => (
    Object.assign({}, state, {
      loading: true,
    })
  ),
  [types.EVENTS_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
      statusText: null,
      createdAt: (new Date()).getTime(),
      events: [].concat(payload.events),
    })
  ),
  [types.EVENTS_EXISTING]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
    })
  ),
  [types.EVENTS_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
      statusText: payload.statusText,
      createdAt: 0,
    })
  ),
});
