import axios from 'axios';
// import Cookies from 'js-cookie';
import { CREATE_USER, getUsers,  DELETE_USER } from 'src/store/actions';

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
          if (res.status === 200) {
            console.log('res: ', res.data);
            // store.dispatch(enterObole(res.data));
          }
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
        });
      return;
    }

    default: {
      next(action);
    }
  }
};
