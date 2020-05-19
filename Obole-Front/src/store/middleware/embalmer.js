/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  CREATE_EMBALMER,
  getEmbalmers,
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
          store.dispatch(infoMessage('success', 'Nouveau thanatopracteur enregistré'));
          store.dispatch(getEmbalmers(res.data));
        })
        .catch((error) => {
          store.dispatch(infoMessage('error', 'Erreur lors de la création'));
          console.log(error);
        });
      return;
    }

    default: {
      next(action);
    }
  }
};
