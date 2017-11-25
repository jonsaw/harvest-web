
import * as staff from './staff/selectors';

export const getStaffLoading = state => staff.getLoading(state.staff);
export const getStaff = state => staff.getStaff(state.staff);
