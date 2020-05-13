import { applyMiddleware } from 'redux';

import authMW from './auth';
import userMW from './user';
import embalmerMW from './embalmer';
import deceasedMW from './deceased';
import roomMW from './room';

export default applyMiddleware(
  authMW,
  userMW,
  embalmerMW,
  deceasedMW,
  roomMW,
);
