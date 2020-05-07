import { applyMiddleware } from 'redux';

import authMW from './auth';
import routesMW from './routes';
import userMW from './user';

export default applyMiddleware(
  authMW,
  routesMW,
  userMW,
);
