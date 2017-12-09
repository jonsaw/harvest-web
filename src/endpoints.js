import config from './config';

export const EVENTS = `${config.apiURL}/events`;
export const NEWSLETTERS = `${config.apiURL}/newsletters`;
export const NEWSLETTER = id => `${config.apiURL}/newsletters/${id}`;
export const STAFF = `${config.apiURL}/staff`;
