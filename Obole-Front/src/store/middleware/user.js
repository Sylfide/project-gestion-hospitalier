import axios from 'axios';
import {
  CREATE_USER,
  getUsers,
  UPDATE_USER,
  enterObole,
  DELETE_USER,
  infoMessage,
  LOGOUT,
} from 'src/store/actions';

export default (store) => (next) => (action) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = user ? user.token : null;
  switch (action.type) {
    case CREATE_USER: {
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/new',
        data: action.values,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          store.dispatch(infoMessage('success', 'Nouvel utilisateur enregistré'));
          store.dispatch(getUsers(res.data));
        })
        .catch((error) => {
          store.dispatch(infoMessage('error', 'Erreur lors de la création'));
          console.log(error);
        });
      return;
    }

    case UPDATE_USER: {
      axios({
        method: 'patch',
        url: `http://localhost:3000/user/${action.id}`,
        data: action.values,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          console.log('update : ', res.data);
          sessionStorage.user = JSON.stringify(res.data);
          store.dispatch(enterObole(res.data));
        })
        .catch((error) => {
          // TODO: traitement d'erreur
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
