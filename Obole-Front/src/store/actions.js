/* eslint-disable import/prefer-default-export */
export const LOGIN = 'actions/LOGIN';
export const ENTER_OBOLE = 'actions/ENTER_OBOLE';
export const CREATE_USER = 'actions/CREATE_USE';

// ==> Action creators
export const login = (values) => ({ type: LOGIN, values });
export const enterObole = (values) => ({ type: ENTER_OBOLE, values });
export const creatUser = (values) => ({ type: CREATE_USER, values });
