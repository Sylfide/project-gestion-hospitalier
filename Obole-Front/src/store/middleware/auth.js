import axios from 'axios';
import Cookies from 'js-cookie';
import { LOGIN, enterObole } from 'src/store/actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      console.log(action.values);
      axios
        .post('http://localhost:3000/connection', action.values)
        .then((res) => {
          if (res.status === 200) {
            Cookies.set('token', res.data.token);
            store.dispatch(enterObole(res.data));
          }
        });
      return;
    }

    default: {
      next(action);
    }
  }
};
