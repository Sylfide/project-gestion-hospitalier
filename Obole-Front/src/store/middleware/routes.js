import { } from '../actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    // case ENTER_OBOLE: {
    //   action.history.push('/obole');
    //   next(action);
    //   return;
    // }

    default: {
      next(action);
    }
  }
};
