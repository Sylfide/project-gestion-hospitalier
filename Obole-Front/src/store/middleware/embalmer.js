/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  CREATE_EMBALMER,
  UPDATE_EMBALMER,
  getEmbalmers,
  infoMessage,
  GET_EMBALMER,
  cardEmbalmer,
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

    case UPDATE_EMBALMER: {
      axios({
        method: 'patch',
        url: `http://localhost:3000/embalmer/${action.id}`,
        data: action.values,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          store.dispatch(infoMessage('success', 'Modification enregistrée'));
          store.dispatch(cardEmbalmer(res.data));
        })
        .catch((error) => {
          store.dispatch(infoMessage('error', 'Erreur lors de l\'enregistrement'));
          console.log(error);
        });
      return;
    }

    case GET_EMBALMER: {
      axios({
        method: 'get',
        url: `http://localhost:3000/embalmer/${action.id}`,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          store.dispatch(cardEmbalmer(res.data));
          action.history.push(`/thanato/${action.id}`);
        })
        .catch((error) => {
          console.log('error: ', error);
        });
      return;
    }

    default: {
      next(action);
    }
  }
};
