/* eslint-disable linebreak-style */
import {
  ENTER_OBOLE,
  LOGOUT,
  GET_USERS,
  GET_EMBALMERS,
  GET_ROOMS,
  INFO_MESSAGE,
} from './actions';

const initialState = {
  user: {
    id: '',
    role: '',
    firstname: '',
    lastname: '',
    email: '',
    token: '',
  },
  staffMembers: [],
  embalmers: [],
  rooms: [],
  infoMessage: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ENTER_OBOLE: {
      return {
        ...state,
        user: {
          id: action.values.id,
          role: action.values.role,
          firstname: action.values.firstname,
          lastname: action.values.lastname,
          email: action.values.email,
          token: action.values.token,
        },
      };
    }

    case LOGOUT: {
      return {
        ...state,
        user: initialState.user,
      };
    }

    case GET_USERS: {
      return {
        ...state,
        staffMembers: action.values,
      };
    }

    case GET_EMBALMERS: {
      return {
        ...state,
        embalmers: action.values,
      };
    }

    case GET_ROOMS: {
      return {
        ...state,
        rooms: action.values,
      };
    }

    case INFO_MESSAGE: {
      return {
        ...state,
        infoMessage: action.message,
      };
    }

    case 'clear': {
      return {
        ...state,
        infoMessage: '',
      };
    }

    default: {
      return state;
    }
  }
};
