import {
  ENTER_OBOLE,
  AUTO_CONNECT,
} from './actions';

const initialState = {
  user: {
    role: '',
    firstname: '',
    lastname: '',
    email: '',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ENTER_OBOLE: {
      return {
        ...state,
        user: {
          role: action.data.role,
          firstname: action.data.firstname,
          lastname: action.data.lastname,
          email: action.data.email,
        },
      };
    }

    case AUTO_CONNECT: {
      return {
        ...state,
        user: {
          role: action.values.role,
          firstname: action.values.firstname,
          lastname: action.values.lastname,
          email: action.values.email,
        },
      };
    }

    default: {
      return state;
    }
  }
};
