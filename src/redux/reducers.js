import { combineReducers } from 'redux';

import events from './events/reducers';
import staff from './staff/reducers';

export default combineReducers({
  events,
  staff,
});
