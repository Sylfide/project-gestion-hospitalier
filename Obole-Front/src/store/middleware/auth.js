// import axios from 'axios';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case 'VUE': {
      return;
    }

    default: {
      next(action);
    }
  }
};
