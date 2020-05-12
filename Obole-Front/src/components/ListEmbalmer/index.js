// ==> Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmbalmers, deleteEmbalmer } from 'src/store/actions';
// import styled from 'styled-components';
import axios from 'axios';

// ==> Components
import { Table, Popconfirm, message } from 'antd';

// ==> Styles

// ==> Ant Design sub components
const { Column } = Table;

// ==> CSS in JS

// ==> Composant
const ListUser = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const embalmers = useSelector((state) => state.embalmers);
  // const topMessage = useSelector((state) => state.infoMessage);

  // const clear = () => {
  //   dispatch({ type: 'clear' });
  // };
  // const error = () => {
  //   message.error(topMessage, 2, clear);
  // };
  // useEffect(() => {
  //   if (topMessage !== '') {
  //     error();
  //   }
  // }, [topMessage]);

  // Après le premier rendu du composant
  // UseEffect va déclencher une requête pour obtenir
  // la liste des utilisateurs
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

  // const onDelete = (id) => {
  //   dispatch(deleteEmbalmer(id));
  // };

  return (
    <Table
      // onRow={(record, rowIndex) => {
      //   return {
      //     onClick: event => {console.log(record.key);},
      //   };
      // }}
      dataSource={data}
      pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }}
    >
      <Column title="Prénom" dataIndex="firstname" key="firstname" />
      <Column title="Nom" dataIndex="lastname" key="lastname" />
      {/* <Column
        // title="Action"
        key="action"
        render={(text, record) => (
          <Popconfirm
            title="Confirmez-vous la suppression ?"
            onConfirm={() => onDelete(record.key)}
            okText="Oui"
            cancelText="Non"
          >
            <a>Supprimer</a>
          </Popconfirm>
        )}
      /> */}
    </Table>
  );
};

// == Export
export default ListUser;
