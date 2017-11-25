
import * as types from './types';
import * as endpoints from '../../endpoints';
import * as staffStatus from './status';

function getStaffRequest() {
  return {
    type: types.STAFF_REQUEST,
  };
}

function getStaffSuccess(status, staff) {
  return {
    type: types.STAFF_SUCCESS,
    payload: {
      status,
      staff,
    },
  };
}

function getStaffExisting(status) {
  return {
    type: types.STAFF_EXISTING,
    payload: {
      status,
    },
  };
}

function getStaffFailure(status, message) {
  return {
    type: types.STAFF_FAILURE,
    payload: {
      status,
      statusText: message,
    },
  };
}

export function getStaff(path = endpoints.STAFF) {
  return async (dispatch, getState) => {
    dispatch(getStaffRequest());
    const ONE_HOUR = 60 * 60 * 1000;
    const { staff } = getState();
    if (staff.staff.length > 0 &&
      staff.createdAt + ONE_HOUR > (new Date()).getTime()) {
      dispatch(getStaffExisting(staffStatus.STAFF_STATUS_OK));
      return staffStatus.STAFF_STATUS_OK;
    }
    let result;
    try {
      const res = await fetch(path);
      result = await res.json();
    } catch (e) {
      getStaffFailure(staffStatus.STAFF_STATUS_ERROR, e.message);
      return staffStatus.STAFF_STATUS_ERROR;
    }
    dispatch(getStaffSuccess(staffStatus.STAFF_STATUS_OK, result));
    return staffStatus.STAFF_STATUS_OK;
  };
}
