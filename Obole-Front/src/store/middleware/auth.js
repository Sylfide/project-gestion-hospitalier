import axios from 'axios';

export default (store) => (next) => (action) => {
  console.log();
  switch (action.type) {
    case VUE: {
      return;
    }

    default: {
      next (action);
    }
  }
}