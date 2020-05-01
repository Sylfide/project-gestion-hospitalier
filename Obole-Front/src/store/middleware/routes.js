import { LOGIN } from '../actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      console.log(action.values);
      action.history.push('/obole');
      return;
    }

    default: {
      next(action);
    }
  }
};
