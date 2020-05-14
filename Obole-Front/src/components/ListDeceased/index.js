// ==> Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeceased } from 'src/store/actions';
// import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import Highlighter from 'react-highlight-words';

// ==> Components
import { Table } from 'antd';

// ==> Styles
import { SearchOutlined } from '@ant-design/icons';

// ==> Ant Design sub components
const { Column } = Table;

// ==> CSS in JS

// ==> Composant
const ListDeceased = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const deceasedList = useSelector((state) => state.deceased);

  useEffect(
    () => {
      axios({
        method: 'get',
        url: 'http://localhost:3000/deceased/list/current',
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          // console.log('Liste défunts : ', res.data);
          dispatch(getDeceased(res.data));
        })
        .catch((error) => {
          // TODO: error
          console.log('error: ', error);
        });
    },
    [],
  );

  const data = deceasedList.map((deceased) => {
    const rObj = {
      key: deceased.id,
      firstname: deceased.firstname,
      lastname: deceased.lastname,
      birthDate: deceased.birth_date,
      entryDate: deceased.entry_date,
    };
    return rObj;
  });

  return (
    <Table
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

    </Table>
  );
};

// == Export
export default ListDeceased;
