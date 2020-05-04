/* eslint-disable import/prefer-default-export */
export const LOGIN = 'actions/LOGIN';
export const ENTER_OBOLE = 'actions/ENTER_OBOLE';

// ==> Action creators
export const login = (values) => ({ type: LOGIN, values });
export const enterObole = (data) => ({ type: ENTER_OBOLE, data });
