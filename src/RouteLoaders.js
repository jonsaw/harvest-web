import Loadable from 'react-loadable';

import LoadingPage from './components/LoadingPage';

export const AsyncHome = Loadable({
  loader: () => import('./containers/Home'),
  loading: LoadingPage,
});
