
import * as types from './types';
import * as endpoints from '../../endpoints';
import * as newsletterStatus from './status';

function getNewsletterRequest() {
  return {
    type: types.NEWSLETTER_REQUEST,
  };
}

function getNewsletterSuccess(status, newsletter) {
  return {
    type: types.NEWSLETTER_SUCCESS,
    payload: {
      status,
      newsletter,
    },
  };
}

function getNewsletterExisting(status, newsletter) {
  return {
    type: types.NEWSLETTER_EXISTING,
    payload: {
      status,
      newsletter,
    },
  };
}

function getNewsletterFailure(status, message) {
  return {
    type: types.NEWSLETTER_FAILURE,
    payload: {
      status,
      statusText: message,
    },
  };
}

export function getNewsletter(id, path = endpoints.NEWSLETTER(id)) {
  return async (dispatch, getState) => {
    dispatch(getNewsletterRequest());
    const ONE_HOUR = 60 * 60 * 1000;
    const { newsletters } = getState();
    if (newsletters.newsletters.length > 0 &&
      newsletters.createdAt + ONE_HOUR > (new Date()).getTime()) {
      const newsletter = newsletters.newsletters.find(n => n.newsletterID === id);
      if (newsletter) {
        dispatch(getNewsletterExisting(newsletterStatus.NEWSLETTER_STATUS_OK, newsletter));
        return newsletterStatus.NEWSLETTER_STATUS_OK;
      }
    }
    let result;
    try {
      const res = await fetch(path);
      result = await res.json();
    } catch (e) {
      getNewsletterFailure(newsletterStatus.NEWSLETTER_STATUS_ERROR, e.message);
      return newsletterStatus.NEWSLETTER_STATUS_ERROR;
    }
    dispatch(getNewsletterSuccess(newsletterStatus.NEWSLETTER_STATUS_OK, result));
    return newsletterStatus.NEWSLETTER_STATUS_OK;
  };
}
