/* eslint-disable import/prefer-default-export */
export const LOGIN = 'actions/LOGIN';
export const AUTO_CONNECT = 'actions/AUTO_CONNECT';
export const ENTER_OBOLE = 'actions/ENTER_OBOLE';
export const CREATE_USER = 'actions/CREATE_USE';

// ==> Action creators
export const login = (values) => ({ type: LOGIN, values });
export const autoConnect = (values) => ({ type: AUTO_CONNECT, values });
export const enterObole = (data) => ({ type: ENTER_OBOLE, data });
export const creatUser = (values) => ({ type: CREATE_USER, values });
