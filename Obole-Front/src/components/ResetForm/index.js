// ==> Import npm
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import { Form, Input, Button, Row, Col } from 'antd';

// ==> Styles

// ==> Ant Design sub components

// ==> CSS in JS

// ==> Composant
const ResetForm = () => {
  const dispatch = useDispatch();
  // const clickCount = useSelector((state) => state.counter);

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      size="large"
      name="normal_login"
      className="login-form"
      onFinish={(values) => {
        dispatch(updateUser(id, values));
      }}
    >
      <Form.Item>
        Première connexion<br />
        Définissez un nouveau mot de passe
      </Form.Item>
      {/* <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Champ requis',
          },
          {
            type: 'email',
            message: 'Adresse mail non valide',
          },
        ]}
      >
        <Input placeholder="email" />
      </Form.Item> */}
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Champ requis',
          },
        ]}
      >
        <Input.Password placeholder="Mot de passe" />
      </Form.Item>

      <Form.Item>
        <Row>
          <Col flex={1}>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Col>
          <Col flex={1}>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

// == Export
export default ResetForm;
