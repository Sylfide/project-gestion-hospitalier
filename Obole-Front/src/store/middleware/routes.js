import { LOGIN } from '../actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      action.history.push('/obole');
      return;
    }

    default: {
      next(action);
    }
  }
};
