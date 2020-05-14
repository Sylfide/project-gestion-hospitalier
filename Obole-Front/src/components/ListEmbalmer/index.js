/* eslint-disable linebreak-style */
// ==> Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmbalmers } from 'src/store/actions';
// import styled from 'styled-components';
import axios from 'axios';

// ==> Components
import { Table } from 'antd';

// ==> Styles

// ==> Ant Design sub components
const { Column } = Table;

// ==> CSS in JS

// ==> Composant
const ListEmbalmer = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const embalmers = useSelector((state) => state.embalmers);

  useEffect(
    () => {
      axios({
        method: 'get',
        url: 'http://localhost:3000/embalmer/list',
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          dispatch(getEmbalmers(res.data));
        })
        .catch((error) => {
          // TODO: error
          console.log('error: ', error);
        });
    },
    [],
  );

  const data = embalmers.map((embalmer) => {
    const rObj = {
      key: embalmer.id,
      firstname: embalmer.firstname,
      lastname: embalmer.lastname,
      // address: embalmer.address,
      // zip_code: embalmer.zip_code,
      // city: embalmer.city,
      // tel: embalmer.tel ? embalmer.tel : null,
      // email: embalmer.email,
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
export default ListEmbalmer;
