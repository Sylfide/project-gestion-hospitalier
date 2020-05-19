/* eslint-disable linebreak-style */
// ==> Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// ==> Components
import { Table } from 'antd';

// ==> Styles

// ==> Ant Design sub components
const { Column } = Table;

// ==> CSS in JS

// ==> Composant
const ListRoom = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
      onRow={(record) => ({
        onClick: () => {
          // history.push(`/chambre/${record.key}`);
          dispatch({ type: 'roomCard', id: record.key });
        },
      })}
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
