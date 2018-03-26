
import * as types from './types';
import * as endpoints from '../../endpoints';
import * as eventStatus from './status';

function getEventRequest() {
  return {
    type: types.EVENT_REQUEST,
  };
}

function getEventSuccess(status, event) {
  return {
    type: types.EVENT_SUCCESS,
    payload: {
      status,
      event,
    },
  };
}

function getEventExisting(status, event) {
  return {
    type: types.EVENT_EXISTING,
    payload: {
      status,
      event,
    },
  };
}

function getEventFailure(status, message) {
  return {
    type: types.EVENT_FAILURE,
    payload: {
      status,
      statusText: message,
    },
  };
}

export function getEvent(id, path = endpoints.EVENT(id)) {
  return async (dispatch, getState) => {
    dispatch(getEventRequest());
    const ONE_HOUR = 60 * 60 * 1000;
    const { events } = getState();
    if (events.events.length > 0 &&
      events.createdAt + ONE_HOUR > (new Date()).getTime()) {
      const event = events.events.find(n => n.eventID === id);
      if (event) {
        dispatch(getEventExisting(eventStatus.EVENT_STATUS_OK, event));
        return eventStatus.EVENT_STATUS_OK;
      }
    }
    let result;
    try {
      const res = await fetch(path);
      result = await res.json();
    } catch (e) {
      getEventFailure(eventStatus.EVENT_STATUS_ERROR, e.message);
      return eventStatus.EVENT_STATUS_ERROR;
    }
    dispatch(getEventSuccess(eventStatus.EVENT_STATUS_OK, result));
    return eventStatus.EVENT_STATUS_OK;
  };
}
