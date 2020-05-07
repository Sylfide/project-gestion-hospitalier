import axios from 'axios';
// import Cookies from 'js-cookie';
import { CREATE_USER } from 'src/store/actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case CREATE_USER: {
      // console.log(action.values);
      const token = sessionStorage.getItem('token');
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
    default: {
      next(action);
    }
  }
};
