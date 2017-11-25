import { createReducer } from '../../utils/redux';
import * as types from './types';

const initialState = {
  loading: false,
  statusText: null,
  staff: [],
  createdAt: 0,
};

export default createReducer(initialState, {
  [types.STAFF_REQUEST]: state => (
    Object.assign({}, state, {
      loading: true,
    })
  ),
  [types.STAFF_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
      statusText: null,
      createdAt: (new Date()).getTime(),
      staff: [].concat(payload.staff),
    })
  ),
  [types.STAFF_EXISTING]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
    })
  ),
  [types.STAFF_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
      statusText: payload.statusText,
      createdAt: 0,
    })
  ),
});
