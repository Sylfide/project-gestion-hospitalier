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
const ListEmbalmer = () => {
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
