/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  CREATE_USER,
  getUsers,
  UPDATE_USER,
  enterObole,
  DELETE_USER,
  infoMessage,
  LOGOUT,
  loading,
} from 'src/store/actions';

export default (store) => (next) => (action) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = user ? user.token : null;
  switch (action.type) {
    case CREATE_USER: {
      store.dispatch(loading(true));
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/new',
        data: action.values,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          store.dispatch(loading(false));
          store.dispatch(infoMessage('success', 'Nouvel utilisateur enregistré'));
          store.dispatch(getUsers(res.data));
        })
        .catch((error) => {
          store.dispatch(loading(false));
          store.dispatch(infoMessage('error', 'Erreur lors de la création'));
          console.log(error);
        });
      return;
    }

    case UPDATE_USER: {
      store.dispatch(loading(true));
      axios({
        method: 'patch',
        url: `http://localhost:3000/user/${action.id}`,
        data: action.values,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          store.dispatch(loading(false));
          sessionStorage.user = JSON.stringify(res.data);
          store.dispatch(infoMessage('success', 'Modification enregistré'));
          store.dispatch(enterObole(res.data));
        })
        .catch((error) => {
          store.dispatch(loading(false));
          store.dispatch(infoMessage('error', 'Erreur lors de la modification'));
          console.log('error: ', error);
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
          store.dispatch(infoMessage('success', 'Utilisateur supprimé'));
          store.dispatch(getUsers(res.data));
        })
        .catch((error) => {
          store.dispatch(infoMessage('error', 'Erreur lors de la suppression'));
          console.log(error);
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
