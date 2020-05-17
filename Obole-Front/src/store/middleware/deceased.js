import axios from 'axios';
import {
  ENTRY,
  addDeceased,
} from 'src/store/actions';

export default (store) => (next) => (action) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = user ? user.token : null;
  switch (action.type) {
    case ENTRY: {
      axios({
        method: 'post',
        url: 'http://localhost:3000/deceased/entry',
        data: action.values,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          store.dispatch(addDeceased(res.data));
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
