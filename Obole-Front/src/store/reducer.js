import {
  LOGIN,
} from './actions';

const initialState = {
  connected: true,
  admin: true,
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN: {
      console.log('LOGIN !');
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
