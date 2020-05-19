/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  CREATE_ROOM,
  getRooms,
  UPDATE_ROOM,
  DELETE_ROOM,
  infoMessage,
} from 'src/store/actions';

export default (store) => (next) => (action) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = user ? user.token : null;
  switch (action.type) {
    case CREATE_ROOM: {
      axios({
        method: 'post',
        url: 'http://localhost:3000/room/new',
        data: action.values,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          store.dispatch(infoMessage('success', 'Nouvelle chambre enregistrée'));
          store.dispatch(getRooms(res.data));
        })
        .catch((error) => {
          store.dispatch(infoMessage('error', 'Erreur lors de la création'));
          console.log('error: ', error);
        });
      return;
    }

    case 'roomCard': {
      axios({
        method: 'get',
        url: `http://localhost:3000/room/details/${action.id}`,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          console.log('res : ', res.data);
          // store.dispatch(infoMessage('success', 'Nouvelle chambre enregistrée'));
          // store.dispatch(getRooms(res.data));
        })
        .catch((error) => {
          // store.dispatch(infoMessage('error', 'Erreur lors de la création'));
          console.log('error: ', error);
        });
      return;
    }

    case UPDATE_ROOM: {
      axios({
        // TODO: check method
        method: 'patch',
        url: `http://localhost:3000/room/modify/${action.id}`,
        data: action.values,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          // TODO:
        })
        .catch((error) => {
          // TODO: traitement d'erreur
          console.log('error: ', error);
        });
      return;
    }

    case DELETE_ROOM: {
      axios({
        method: 'delete',
        url: `http://localhost:3000/room/delete/${action.id}`,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          // TODO:
        })
        .catch((error) => {
          // TODO: traitement d'erreur
          console.log('error: ', error);
        });
      return;
    }

    default: {
      next(action);
    }
  }
};
