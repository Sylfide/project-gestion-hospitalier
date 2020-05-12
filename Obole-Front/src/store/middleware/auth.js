import axios from 'axios';
// import Cookies from 'js-cookie';
import { LOGIN, enterObole } from 'src/store/actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      axios({
        method: 'post',
        url: 'http://localhost:3000/connection',
        data: action.values,
      })
        .then((res) => {
          sessionStorage.user = JSON.stringify(res.data);
          store.dispatch(enterObole(res.data));
        })
        .catch((error) => {
          // TODO: traîtement d'erreur
          console.log(error);
        });
      return;
    }

    default: {
      next(action);
    }
  }
};
