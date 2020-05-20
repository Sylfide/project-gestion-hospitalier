/* eslint-disable import/prefer-default-export */
export const LOGIN = 'actions/LOGIN';
export const LOGOUT = 'actions/LOGOUT';
export const ENTER_OBOLE = 'actions/ENTER_OBOLE';

export const CREATE_ROOM = 'actions/CREATE_ROOM';
export const GET_ROOMS = 'actions/GET_ROOMS';
export const UPDATE_ROOM = 'actions/UPDATE_ROOM';
export const DELETE_ROOM = 'actions/DELETE_ROOM';

export const CREATE_USER = 'actions/CREATE_USER';
export const GET_USERS = 'actions/GET_USERS';
export const UPDATE_USER = 'actions/UPDATE_USER';
export const DELETE_USER = 'actions/DELETE_USER';

export const CREATE_EMBALMER = 'actions/CREATE_EMBALMER';
export const GET_EMBALMERS = 'actions/GET_EMBALMERS';
export const GET_EMBALMER = 'actions/GET_EMBALMER';
export const CARD_EMBALMER = 'actions/CARD_EMBALMER';
export const UPDATE_EMBALMER = 'actions/UPDATE_EMBALMER';
export const DELETE_EMBALMER = 'actions/DELETE_EMBALMER';

export const ENTRY = 'actions/ENTRY';
export const GET_ALL_DECEASED = 'actions/GET_ALL_DECEASED';
export const GET_DECEASED = 'actions/GET_DECEASED';
export const CARD_DECEASED = 'actions/CARD_DECEASED';

export const INFO_MESSAGE = 'actions/INFO_MESSAGE';

// ==> Action creators
export const login = (values) => ({ type: LOGIN, values });
export const logout = (history) => ({ type: LOGOUT, history });
export const enterObole = (values) => ({ type: ENTER_OBOLE, values });

export const creatRoom = (values) => ({ type: CREATE_ROOM, values });
export const getRooms = (values) => ({ type: GET_ROOMS, values });
export const updateRoom = (id, values) => ({ type: UPDATE_ROOM, id, values });
export const deleteRoom = (id) => ({ type: DELETE_ROOM, id });

export const creatUser = (values) => ({ type: CREATE_USER, values });
export const getUsers = (values) => ({ type: GET_USERS, values });
export const updateUser = (id, values) => ({ type: UPDATE_USER, id, values });
export const deleteUser = (id) => ({ type: DELETE_USER, id });

export const creatEmbalmer = (values) => ({ type: CREATE_EMBALMER, values });
export const getEmbalmers = (values) => ({ type: GET_EMBALMERS, values });
export const getEmbalmer = (history, id) => ({ type: GET_EMBALMER, history, id });
export const cardEmbalmer = (values) => ({ type: CARD_EMBALMER, values });
export const updateEmbalmer = (id, values) => ({ type: UPDATE_EMBALMER, id, values });
export const deleteEmbalmer = (id) => ({ type: DELETE_EMBALMER, id });

export const entry = (values) => ({ type: ENTRY, values });
export const getAllDeceased = (values) => ({ type: GET_ALL_DECEASED, values });
export const getDeceased = (history, id) => ({ type: GET_DECEASED, history, id });
export const cardDeceased = (values) => ({ type: CARD_DECEASED, values });

export const infoMessage = (code, text) => ({ type: INFO_MESSAGE, code, text });
