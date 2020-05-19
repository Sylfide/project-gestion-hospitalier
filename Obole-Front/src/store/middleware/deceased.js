/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  ENTRY,
  addDeceased,
  infoMessage,
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
          store.dispatch(infoMessage('success', 'Nouveaux défunt enregistré'));
          store.dispatch(addDeceased(res.data, rooms));
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
