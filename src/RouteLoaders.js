import Loadable from 'react-loadable';

import LoadingPage from './components/LoadingPage';

export const AsyncHome = Loadable({
  loader: () => import('./containers/Home'),
  loading: LoadingPage,
});

export const AsyncConnect = Loadable({
  loader: () => import('./containers/Connect'),
  loading: LoadingPage,
});

export const AsyncEvent = Loadable({
  loader: () => import('./containers/Event'),
  loading: LoadingPage,
});

export const AsyncEvents = Loadable({
  loader: () => import('./containers/Events'),
  loading: LoadingPage,
});

export const AsyncNewsletter = Loadable({
  loader: () => import('./containers/Newsletter'),
  loading: LoadingPage,
});

export const AsyncNewsletters = Loadable({
  loader: () => import('./containers/Newsletters'),
  loading: LoadingPage,
});

export const AsyncVisit = Loadable({
  loader: () => import('./containers/Visit'),
  loading: LoadingPage,
});
