import {
  ENTER_OBOLE,
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
    default: {
      return state;
    }
  }
};
