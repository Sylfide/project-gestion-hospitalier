// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { } from 'src/store/actions';

// == Import antd
import { Form, Input, Button, Select } from 'antd';


// == Composant
const DeceasedForm = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
    <Form {...layout} layout="vertical" className="obole--makeForm">
    <Form.Item
      name={['user', 'firstname']}
      label="Nom"
      rules={[
        {
          type: 'password',
          required: true
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'lastname']}
      label="Prénom"
      rules={[
        {
          type: 'password',
          required: true
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'address']}
      label="Adresse"
    >
      <Input />
    </Form.Item>

    
    <Form.Item>
      <Row>
        <Col flex={0}>
          <Form.Item 
            className="cp"
            name={['user', 'zip_code']}
            label="Code Postal">
            <Input/>
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Form.Item 
            name={['user', 'city']}
            label="Ville">
            <Input  />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>

    <Form.Item>
      <Row>
        <Col flex={0}>
          <Form.Item 
            className="tel"
            name={['user', 'phone']}
            label="Téléphone"
            rules={[
              {
                type: 'tel',
              },
            ]}
            >
            <Input/>
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Form.Item 
            name={['user', 'email']}
            label="Email"
            rules={[
              {
                type: 'email',
                required: true
              },
            ]}
            >
            <Input  />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>

    <Form.Item
      name={['user', 'password']}
      label="Mot de passe temporaire"
      rules={[
        {
          type: 'password',
          required: true
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'role']}
      label="Rôle de l'utilisateur"
      rules={[
        {
          required: true,
        }
      ]}
    >
      <Select>
        <Option value="user">User</Option>
        <Option value="admin">Admin</Option>
      </Select>
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type="primary" htmlType="submit">
          Enregistrer
        </Button>
    </Form.Item>
  </Form>
  );
};

// == Export
export default DeceasedForm;