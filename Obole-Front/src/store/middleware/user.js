import axios from 'axios';
// import Cookies from 'js-cookie';
import { CREATE_USER, getUsers, DELETE_USER, infoMessage } from 'src/store/actions';

export default (store) => (next) => (action) => {
  const { token } = JSON.parse(sessionStorage.getItem('user'));
  // const token = sessionStorage.getItem('user.token');
  switch (action.type) {
    case CREATE_USER: {
      // console.log(action.values);
      axios({
        method: 'post',
        url: 'http://localhost:3000/admin/user/new',
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
        url: `http://localhost:3000/admin/user/${action.id}/delete`,
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

    default: {
      next(action);
    }
  }
};
