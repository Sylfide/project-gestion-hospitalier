/* eslint-disable linebreak-style */
// ==> Import npm
import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getDeceased } from 'src/store/actions';

// ==> Components
import { Table } from 'antd';

// ==> Styles

// ==> Ant Design sub components
const { Column } = Table;

// ==> CSS in JS

// ==> Composant
const ListDeceased = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const deceasedList = useSelector((state) => state.deceased);
  const rooms = useSelector((state) => state.rooms);

  // Récupérer le nom d'une chambre par son id
  const getRoomName = (roomId) => {
    const roomInfo = rooms.find((room) => room.id === roomId);
    return roomInfo.name;
  };

  const data = deceasedList.map((deceased) => {
    const rObj = {
      key: deceased.id,
      firstname: deceased.firstname,
      lastname: deceased.lastname,
      birthDate: deceased.birth_date,
      entryDate: deceased.entry_date,
      roomName: getRoomName(deceased.room_id),
    };
    return rObj;
  });

  return (
    <Table
      onRow={(record) => ({
        onClick: () => {
          dispatch(getDeceased(history, record.key));
        },
      })}
      dataSource={data}
      pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }}
      showSorterTooltip={false}
      bordered
    >
      <Column
        title="Prénom"
        dataIndex="firstname"
        key="firstname"
        sorter={(a, b) => a.firstname.localeCompare(b.firstname)}
      />
      <Column
        title="Nom"
        dataIndex="lastname"
        key="lastname"
        sorter={(a, b) => a.lastname.localeCompare(b.lastname)}
      />
      <Column
        title="Date de naissance"
        dataIndex="birthDate"
        key="birthDate"
        render={(text) => moment(text).format('DD/MM/YYYY')}
        sorter={(a, b) => moment(a.birthDate).unix() - moment(b.birthDate).unix()}
      />
      <Column
        title="Date d'entrée"
        dataIndex="entryDate"
        key="entryDate"
        render={(text) => moment(text).format('DD/MM/YYYY')}
      />
      <Column
        title="Chambre"
        dataIndex="roomName"
        key="roomName"
        sorter={(a, b) => a.roomName.localeCompare(b.roomName)}
      />

    </Table>
  );
};

// == Export
export default ListDeceased;
