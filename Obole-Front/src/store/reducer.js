import {
  ENTER_OBOLE,
<<<<<<< HEAD
=======
  GET_USERS,
>>>>>>> wip list
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
<<<<<<< HEAD
        },
=======
          token: action.values.token,
        },
      };
    }

    case GET_USERS: {
      return {
        ...state,
        staffMembers: action.values,
>>>>>>> wip list
      };
    }

    default: {
      return state;
    }
  }
};
