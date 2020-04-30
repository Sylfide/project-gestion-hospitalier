import {
  //actions,
} from './actions';

const initialState = {
  connected: true,
  admin: true,
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'DISCO': {
      return {
        ...state,
        connected: !connected,
      };
    }
    default: {
      return state;
    }
  }
};
