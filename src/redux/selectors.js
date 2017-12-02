
import * as events from './events/selectors';
import * as staff from './staff/selectors';

export const getEventsLoading = state => events.getLoading(state.events);
export const getEvents = state => events.getEvents(state.events);

export const getStaffLoading = state => staff.getLoading(state.staff);
export const getStaff = state => staff.getStaff(state.staff);
