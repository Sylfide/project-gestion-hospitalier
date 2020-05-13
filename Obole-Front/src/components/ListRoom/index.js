// ==> Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from 'src/store/actions';
// import styled from 'styled-components';
import axios from 'axios';

// ==> Components
import { Table } from 'antd';

// ==> Styles

// ==> Ant Design sub components
const { Column } = Table;

// ==> CSS in JS

// ==> Composant
const ListRoom = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const rooms = useSelector((state) => state.rooms);

  useEffect(
    () => {
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
    },
    [],
  );

  const data = rooms.map((room) => {
    const rObj = {
      key: room.id,
      name: room.name,
      capacity: room.capacity,
    };
    return rObj;
  });

  return (
    <Table
      dataSource={data}
      pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }}
    >
      <Column title="Nom" dataIndex="name" key="name" />
      <Column title="Capacité" dataIndex="capacity" key="capacity" />

    </Table>
  );
};

// == Export
export default ListRoom;
