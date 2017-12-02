
import moment from 'moment';

export function dateRange(event) {
  let range = '';
  const startsAt = moment(event.startsAt);
  const endsAt = moment(event.endsAt);
  if (event.allDay) {
    range = startsAt.format('D MMM YYYY');
    if (event.endsAt) {
      range += ` - ${endsAt.format('D MMM YYYY')}`;
      if (endsAt.isSame(startsAt, 'month')) {
        range = `${startsAt.format('D')} - ${endsAt.format('D MMM YYYY')}`;
      } else if (endsAt.isSame(startsAt, 'year')) {
        range = `${startsAt.format('D MMM')} - ${endsAt.format('D MMM YYYY')}`;
      }
    }
    return range;
  }
  range = startsAt.format('D MMM YYYY, h:mma');
  if (event.endsAt) {
    if (endsAt.isSame(startsAt, 'day')) {
      // same day
      range += ` - ${endsAt.format('h:mma')}`;
    } else {
      range += ` - ${endsAt.format('D MMM YYYY, h:mma')}`;
    }
  }
  return range;
}
