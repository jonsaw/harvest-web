import { combineReducers } from 'redux';

import events from './events/reducers';
import newsletters from './newsletters/reducers';
import staff from './staff/reducers';

export default combineReducers({
  events,
  newsletters,
  staff,
});
