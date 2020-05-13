// ==> Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeceased } from 'src/store/actions';
// import styled from 'styled-components';
import axios from 'axios';

// ==> Components
import { Table } from 'antd';

// ==> Styles

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
    };
    return rObj;
  });

  return (
    <Table
      dataSource={data}
      pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }}
    >
      <Column title="Prénom" dataIndex="firstname" key="firstname" />
      <Column title="Nom" dataIndex="lastname" key="lastname" />

    </Table>
  );
};

// == Export
export default ListDeceased;
