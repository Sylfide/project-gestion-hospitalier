/* eslint-disable linebreak-style */
// == Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getRooms } from 'src/store/actions';

// Styles
import './styles.scss';

// == Import

// == Composant
const Activity = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const rooms = useSelector((state) => state.rooms);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/room/list',
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => {
        dispatch(getRooms(res.data));
      })
      .catch((error) => {
        // TODO: error
        console.log('error: ', error);
      });
  }, []);

  const roomsList = rooms.map((room) => (
    <div className="room" key={room.id}>
      <h3>{room.name}</h3>
      <div className="count">
        <p>Libre</p>
        <p className="nbr">{room.capacity - room.occupation}</p>
        <span />
        <p>Capacité</p>
        <p className="nbr">{room.capacity}</p>
      </div>
    </div>
  ));

  return (
    <div id="activity">
      {roomsList}
    </div>
  );
};

// == Export
export default Activity;
