import axios from 'axios';
import {
  CREATE_USER,
  getUsers,
  DELETE_USER,
  infoMessage,
  LOGOUT,
} from 'src/store/actions';

export default (store) => (next) => (action) => {
  const { token } = JSON.parse(sessionStorage.getItem('user'));
  switch (action.type) {
    case CREATE_USER: {
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/new',
        data: action.values,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          store.dispatch(getUsers(res.data));
        })
        .catch((res) => {
          store.dispatch(infoMessage('Erreur lors de la création'));
        });
      return;
    }

    case DELETE_USER: {
      axios({
        method: 'delete',
        url: `http://localhost:3000/user/${action.id}/delete`,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          store.dispatch(getUsers(res.data));
        })
        .catch((res) => {
          store.dispatch(infoMessage('Erreur lors de la suppression'));
        });
      return;
    }

    case LOGOUT: {
      sessionStorage.removeItem('user');
      action.history.push('/');
      next(action);
      return;
    }

    default: {
      next(action);
    }
  }
};
