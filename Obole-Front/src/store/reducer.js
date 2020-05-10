import {
  ENTER_OBOLE,
  LOGOUT,
  GET_USERS,
  INFO_MESSAGE,
} from './actions';

const initialState = {
  user: {
    role: '',
    firstname: '',
    lastname: '',
    email: '',
    token: '',
  },
  staffMembers: [],
  infoMessage: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ENTER_OBOLE: {
      return {
        ...state,
        user: {
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
