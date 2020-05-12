import axios from 'axios';
import {
  ENTRY,
} from 'src/store/actions';

export default (store) => (next) => (action) => {
  const { token } = JSON.parse(sessionStorage.getItem('user'));
  switch (action.type) {
    case ENTRY: {
      console.log('Sending :', action.values);
      axios({
        method: 'post',
        url: 'http://localhost:3000/deceased/entry',
        data: action.values,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          console.log('Nouvelle entrée', res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }

    default: {
      next(action);
    }
  }
};
