/* eslint-disable linebreak-style */
// ==> Import npm
import React from 'react';
import { useSelector } from 'react-redux';

// ==> Components
import { Table } from 'antd';

// ==> Styles

// ==> Ant Design sub components
const { Column } = Table;

// ==> CSS in JS

// ==> Composant
const ListRoom = () => {
  const rooms = useSelector((state) => state.rooms);

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
