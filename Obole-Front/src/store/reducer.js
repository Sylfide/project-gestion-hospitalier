/* eslint-disable linebreak-style */
import {
  ENTER_OBOLE,
  LOGOUT,
  GET_USERS,
  GET_EMBALMERS,
  GET_ROOMS,
  GET_ALL_DECEASED,
  INFO_MESSAGE,
  CARD_EMBALMER,
  CARD_DECEASED,
} from './actions';

const initialState = {
  reset: false,
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
  deceased: [],
  infoMessage: {
    code: '',
    text: '',
  },
  embalmerCard: {},
  deceasedCard: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ENTER_OBOLE: {
      return {
        ...state,
        reset: initialState.reset,
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

    case 'RESET': {
      return {
        ...state,
        reset: true,
        user: {
          id: action.values.id,
          role: '',
          firstname: action.values.firstname,
          lastname: action.values.lastname,
          email: action.values.email,
          token: action.values.token,
        },
      };
    }

    case LOGOUT: {
      return initialState;
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

    case CARD_EMBALMER: {
      return {
        ...state,
        embalmerCard: {
          ...action.values,
        },
      };
    }

    case CARD_DECEASED: {
      return {
        ...state,
        deceasedCard: {
          ...action.values,
        },
      };
    }

    case GET_ALL_DECEASED: {
      return {
        ...state,
        deceased: action.values,
      };
    }

    case INFO_MESSAGE: {
      return {
        ...state,
        infoMessage: {
          code: action.code,
          text: action.text,
        },
      };
    }

    case 'clear': {
      return {
        ...state,
        infoMessage: initialState.infoMessage,
      };
    }

    default: {
      return state;
    }
  }
};
