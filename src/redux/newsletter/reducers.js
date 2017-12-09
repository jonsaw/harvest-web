import { createReducer } from '../../utils/redux';
import * as types from './types';

const initialState = {
  loading: false,
  statusText: null,
};

export default createReducer(initialState, {
  [types.NEWSLETTER_REQUEST]: state => (
    Object.assign({}, state, {
      loading: true,
    })
  ),
  [types.NEWSLETTER_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
      statusText: null,
      newsletter: Object.assign({}, payload.newsletter),
    })
  ),
  [types.NEWSLETTER_EXISTING]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
      statusText: null,
      newsletter: Object.assign({}, payload.newsletter),
    })
  ),
  [types.NEWSLETTER_FAILURE]: (state, payload) => (
    Object.assign({}, state, {
      loading: false,
      status: payload.status,
      statusText: payload.statusText,
      createdAt: 0,
    })
  ),
});
