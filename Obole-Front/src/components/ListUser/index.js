// ==> Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser } from 'src/store/actions';
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
  const staffMembers = useSelector((state) => state.staffMembers);
  const infoMessage = useSelector((state) => state.infoMessage);

  // ==> Message d'info (en haut de la fenêtre) suite a une requête
  const clear = () => {
    dispatch({ type: 'clear' });
  };
  const showMessage = (code, text) => {
    // (text du message, durée d'affichage, callback)
    message[code](text, 2, clear);
  };
  useEffect(() => {
    if (infoMessage.code !== '') {
      showMessage(infoMessage.code, infoMessage.text);
    }
  }, [infoMessage]);

  // Récupérer la liste des utilisateurs
  useEffect(
    () => {
      axios({
        method: 'get',
        url: 'http://localhost:3000/user/list',
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => {
          dispatch(getUsers(res.data));
        })
        .catch((error) => {
          showMessage('error', error.message);
          console.log(error);
        });
    },
    [],
  );

  const data = staffMembers.map((staffMember) => {
    const rObj = {};
    rObj.key = staffMember.id;
    rObj.firstname = staffMember.firstname;
    rObj.lastname = staffMember.lastname;
    rObj.email = staffMember.email;
    rObj.role = staffMember.role;
    return rObj;
  });

  const onDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <Table
      dataSource={data}
      pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }}
    >
      <Column title="Prénom" dataIndex="firstname" key="firstname" />
      <Column title="Nom" dataIndex="lastname" key="lastname" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="Rôle" dataIndex="role" key="role" />
      <Column
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
      />
    </Table>
  );
};

// == Export
export default ListUser;
