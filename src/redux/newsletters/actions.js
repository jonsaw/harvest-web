
import * as types from './types';
import * as endpoints from '../../endpoints';
import * as newslettersStatus from './status';

function getNewslettersRequest() {
  return {
    type: types.NEWSLETTERS_REQUEST,
  };
}

function getNewslettersSuccess(status, newsletters) {
  return {
    type: types.NEWSLETTERS_SUCCESS,
    payload: {
      status,
      newsletters,
    },
  };
}

function getNewslettersExisting(status) {
  return {
    type: types.NEWSLETTERS_EXISTING,
    payload: {
      status,
    },
  };
}

function getNewslettersFailure(status, message) {
  return {
    type: types.NEWSLETTERS_FAILURE,
    payload: {
      status,
      statusText: message,
    },
  };
}

export function getNewsletters(path = endpoints.NEWSLETTERS) {
  return async (dispatch, getState) => {
    dispatch(getNewslettersRequest());
    const ONE_HOUR = 60 * 60 * 1000;
    const { newsletters } = getState();
    if (newsletters.newsletters.length > 0 &&
      newsletters.createdAt + ONE_HOUR > (new Date()).getTime()) {
      dispatch(getNewslettersExisting(newslettersStatus.NEWSLETTERS_STATUS_OK));
      return newslettersStatus.NEWSLETTERS_STATUS_OK;
    }
    let result;
    try {
      const res = await fetch(path);
      result = await res.json();
    } catch (e) {
      getNewslettersFailure(newslettersStatus.NEWSLETTERS_STATUS_ERROR, e.message);
      return newslettersStatus.NEWSLETTERS_STATUS_ERROR;
    }
    dispatch(getNewslettersSuccess(newslettersStatus.NEWSLETTERS_STATUS_OK, result));
    return newslettersStatus.NEWSLETTERS_STATUS_OK;
  };
}
