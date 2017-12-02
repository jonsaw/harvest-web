
import * as types from './types';
import * as endpoints from '../../endpoints';
import * as eventsStatus from './status';

function getEventsRequest() {
  return {
    type: types.EVENTS_REQUEST,
  };
}

function getEventsSuccess(status, events) {
  return {
    type: types.EVENTS_SUCCESS,
    payload: {
      status,
      events,
    },
  };
}

function getEventsExisting(status) {
  return {
    type: types.EVENTS_EXISTING,
    payload: {
      status,
    },
  };
}

function getEventsFailure(status, message) {
  return {
    type: types.EVENTS_FAILURE,
    payload: {
      status,
      statusText: message,
    },
  };
}

export function getEvents(path = endpoints.EVENTS) {
  return async (dispatch, getState) => {
    dispatch(getEventsRequest());
    const ONE_HOUR = 60 * 60 * 1000;
    const { events } = getState();
    if (events.events.length > 0 &&
      events.createdAt + ONE_HOUR > (new Date()).getTime()) {
      dispatch(getEventsExisting(eventsStatus.EVENTS_STATUS_OK));
      return eventsStatus.EVENTS_STATUS_OK;
    }
    let result;
    try {
      const res = await fetch(path);
      result = await res.json();
    } catch (e) {
      getEventsFailure(eventsStatus.EVENTS_STATUS_ERROR, e.message);
      return eventsStatus.EVENTS_STATUS_ERROR;
    }
    dispatch(getEventsSuccess(eventsStatus.EVENTS_STATUS_OK, result));
    return eventsStatus.EVENTS_STATUS_OK;
  };
}
