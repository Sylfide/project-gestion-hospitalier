// ==> Import npm
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  Switch,
} from 'antd';

// ==> Styles
const Container = styled.div`
  p {
    border: 1px solid #1aae9f;
    background: #8dd7cf;
    padding: 10px;
    font-size: 2rem;
    font-weight: bold;
  }
  #edit > * {
    margin: 24px 0 0;
  }
`;

// ==> Ant Design sub components

// ==> CSS in JS

// ==> Composant
const Profil = () => {
  const [edit, setEdit] = useState(true);
  const dispatch = useDispatch();
  const { id, firstname, lastname, email } = useSelector((state) => state.user);
  const history = useHistory();

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onEdit = () => {
    setEdit(!edit);
  };

  return (
    <Container>
      <p>Profil</p>
      <Form
        layout="vertical"
        size="large"
        form={form}
        initialValues={{
          lastname,
          firstname,
          email,
        }}
        onFinish={(values) => {
          console.log(`id : ${id}, values : `, values);
        }}
      >
        <Col span={12} offset={6}>
          <Row id="edit" justify="end">
            <Switch
              checkedChildren="Éditer"
              unCheckedChildren="Éditer"
              onChange={onEdit}
            />
          </Row>

          <Form.Item
            name="lastname"
            label="Nom"
            rules={[
              {
                required: true,
                message: 'Champ requis',
              },
            ]}
          >
            <Input disabled={edit} />
          </Form.Item>

          <Form.Item
            name="firstname"
            label="Prénom"
            rules={[
              {
                required: true,
                message: 'Champ requis',
              },
            ]}
          >
            <Input disabled={edit} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Mail"
            rules={[
              {
                required: true,
                message: 'Champ requis',
              },
              {
                type: 'email',
                message: 'Adresse mail pas valide',
              },
            ]}
          >
            <Input disabled={edit} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mot de passe actuel"
            rules={[
              {
                required: true,
                message: 'Champ requis',
              },
            ]}
          >
            <Input.Password disabled={edit} />
          </Form.Item>

          <Form.Item>
            <Row justify="center" gutter={32}>
              <Col>
                <Button type="primary" htmlType="submit" disabled={edit}>
                  Enregistrer
                </Button>
              </Col>
              <Col>
                <Button htmlType="button" onClick={onReset} disabled={edit}>
                  Abandonner
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Form>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          dispatch(logout(history));
        }}
      >
        *Logout*
      </Button>
    </Container>
  );
};

// == Export
export default Profil;
