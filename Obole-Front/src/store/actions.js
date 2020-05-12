/* eslint-disable import/prefer-default-export */
export const LOGIN = 'actions/LOGIN';
export const LOGOUT = 'actions/LOGOUT';
export const ENTER_OBOLE = 'actions/ENTER_OBOLE';
export const CREATE_USER = 'actions/CREATE_USER';
export const GET_USERS = 'actions/GET_USERS';
export const UPDATE_USER = 'actions/UPDATE_USER';
export const DELETE_USER = 'actions/DELETE_USER';
export const INFO_MESSAGE = 'actions/INFO_MESSAGE';
export const CREATE_EMBALMER = 'actions/CREATE_EMBALMER';
export const GET_EMBALMERS = 'actions/GET_EMBALMERS';
export const ENTRY = 'actions/ENTRY';

// ==> Action creators
export const login = (values) => ({ type: LOGIN, values });
export const logout = (history) => ({ type: LOGOUT, history });
export const enterObole = (values) => ({ type: ENTER_OBOLE, values });
export const creatUser = (values) => ({ type: CREATE_USER, values });
export const getUsers = (values) => ({ type: GET_USERS, values });
export const updateUser = (id, values) => ({ type: UPDATE_USER, id, values });
export const deleteUser = (id) => ({ type: DELETE_USER, id });
export const infoMessage = (message) => ({ type: INFO_MESSAGE, message });
export const creatEmbalmer = (values) => ({ type: CREATE_EMBALMER, values });
export const getEmbalmers = (values) => ({ type: GET_EMBALMERS, values });
export const entry = (values) => ({ type: ENTRY, values });
