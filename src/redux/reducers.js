import { combineReducers } from 'redux';

import event from './event/reducers';
import events from './events/reducers';
import newsletter from './newsletter/reducers';
import newsletters from './newsletters/reducers';
import staff from './staff/reducers';

export default combineReducers({
  event,
  events,
  newsletter,
  newsletters,
  staff,
});
