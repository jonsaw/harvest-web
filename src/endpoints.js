import config from './config';

export const EVENT = id => `${config.apiURL}/events/${id}`;
export const EVENTS = `${config.apiURL}/events`;
export const NEWSLETTER = id => `${config.apiURL}/newsletters/${id}`;
export const NEWSLETTERS = `${config.apiURL}/newsletters`;
export const STAFF = `${config.apiURL}/staff`;
