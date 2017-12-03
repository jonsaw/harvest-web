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

export const AsyncEvents = Loadable({
  loader: () => import('./containers/Events'),
  loading: LoadingPage,
});

export const AsyncVisit = Loadable({
  loader: () => import('./containers/Visit'),
  loading: LoadingPage,
});
