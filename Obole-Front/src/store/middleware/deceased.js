/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  ENTRY,
  infoMessage,
  addDeceased,
  GET_DECEASED,
  cardDeceased,
  UPDATE_DECEASED,
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
          const { rooms } = store.getState();
          const index = rooms.findIndex((room) => room.name === action.values.deceased.room);
          rooms[index].occupation++;
          store.dispatch(infoMessage('success', 'Nouveau défunt enregistré'));
          store.dispatch(addDeceased(res.data, rooms));
        })
        .catch((error) => {
          store.dispatch(infoMessage('error', 'Erreur lors de la création'));
          console.log(error);
        });
      return;
    }

    case UPDATE_DECEASED: {
      axios({
        method: 'post',
        url: `http://localhost:3000/deceased/${action.id}/update`,
        data: action.values,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          // const { rooms } = store.getState();
          // const index = rooms.findIndex((room) => room.name === action.values.deceased.room);
          // rooms[index].occupation--;
          store.dispatch(infoMessage('success', 'Modification enregistrée'));
          store.dispatch(cardDeceased(res.data));
        })
        .catch((error) => {
          store.dispatch(infoMessage('error', 'Erreur lors de l\'enregistrement'));
          console.log(error);
        });
      return;
    }

    case GET_DECEASED: {
      axios({
        method: 'get',
        url: `http://localhost:3000/deceased/${action.id}`,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          store.dispatch(cardDeceased(res.data));
          action.history.push(`/defunt/${action.id}`);
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
