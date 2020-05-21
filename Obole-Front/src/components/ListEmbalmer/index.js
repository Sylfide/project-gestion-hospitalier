// ==> Import npm
import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getEmbalmer } from 'src/store/actions';

// ==> Components
import { Table } from 'antd';

// ==> Styles

// ==> Ant Design sub components
const { Column } = Table;

// ==> CSS in JS

// ==> Composant
const ListEmbalmer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const embalmers = useSelector((state) => state.embalmers);
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
      onRow={(record) => ({
        onClick: () => {
          dispatch(getEmbalmer(history, record.key));
        },
      })}
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
