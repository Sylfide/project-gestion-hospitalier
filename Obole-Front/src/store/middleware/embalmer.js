import axios from 'axios';
import {
  CREATE_EMBALMER,
  infoMessage,
} from 'src/store/actions';

export default (store) => (next) => (action) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = user ? user.token : null;
  switch (action.type) {
    case CREATE_EMBALMER: {
      axios({
        method: 'post',
        url: 'http://localhost:3000/embalmer/new',
        data: action.values,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          // TODO: success message
        })
        .catch((error) => {
          console.log('error: ', error);
          // TODO: error message
        });
      return;
    }

    default: {
      next(action);
    }
  }
};
