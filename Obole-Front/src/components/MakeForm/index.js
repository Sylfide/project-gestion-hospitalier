// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { } from 'src/store/actions';

// == Import antd
import { Form, Input, Button, Select } from 'antd';


// == Composant
const MakeForm = () => {
  const layout = {
    labelCol: {
      span: 16,
    },
    wrapperCol: {
      span: 8,
    },
  };

  return (
    <Form {...layout} layout="vertical">
      <Form.Item
        name={['user', 'firstname']}
        label="Nom"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'lastname']}
        label="Prénom"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'address']}
        label="Adresse"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'zip_code']}
        label="Code Postal"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'city']}
        label="Ville"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'phone']}
        label="Téléphone"
        rules={[
          {
            type: 'tel',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'password']}
        label="Mot de passe temporaire"
        rules={[
          {
            type: 'password',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'role']}
        label="Rôle de l'utilisateur"
      >
        <Select>
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Enregistrer
          </Button>
      </Form.Item>
    </Form>
  );
};

// == Export
export default MakeForm;