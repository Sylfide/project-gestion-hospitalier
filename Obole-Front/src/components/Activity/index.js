/* eslint-disable linebreak-style */
// == Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import axios from 'axios';
import { getRooms } from 'src/store/actions';

// import { } from 'src/store/actions';

// Styles
import './styles.scss';

// == Import

// == Composant
const Activity = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const rooms = useSelector((state) => state.rooms);

  useEffect(() => {
    // console.log('je suis chargé')
    axios({
      method: 'get',
      url: 'http://localhost:3000/room/list',
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => {
        dispatch(getRooms(res.data));
        console.log('data received', res.data)
      })
      .catch((error) => {
        // TODO: error
        console.log('error: ', error);
      });
  }, [token]);

  // const rooms = [
  //   {
  //     id: 0,
  //     name: 'Chambre tinlinlin',
  //     capacity: 50,
  //     free: 5,
  //   },
  //   {
  //     id: 1,
  //     name: 'Chambre truc',
  //     capacity: 30,
  //     free: 10,
  //   },
  // ]
  // const dispatch = useDispatch();
  // const clickCount = useSelector((state) => state.counter);

  // <Option key={room.id} value={room.name}>{room.name}</Option>

  const roomsList = rooms.map((room) => {
    return (
      <div className="room" key={room.id}>
        <h3>{room.name}</h3>
        <div className="count">
          <p>Capacité</p>
          <p className="nbr">{room.capacity}</p>
          <span />
          <p>Libre</p>
          <p className="nbr">{room.occupation}</p>
        </div>
      </div>
    );
  })

  return (
    <div id="activity">
      {roomsList}
    </div>
  );
};

// == Export
export default Activity;
