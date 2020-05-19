/* eslint-disable linebreak-style */
// ==> Import npm
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import { EditOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Switch,
  message,
} from 'antd';

// ==> Styles

// ==> Ant Design sub components

// ==> CSS in JS
const Container = styled.div`
  p {
    border: 1px solid #1aae9f;
    background: #8dd7cf;
    padding: 10px;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5715;
  }
  #edit > * {
    margin: 24px 0;
  }
`;

// ==> Composant
const Profil = () => {
  const [edit, setEdit] = useState(true);
  const dispatch = useDispatch();
  const infoMessage = useSelector((state) => state.infoMessage);
  const {
    id, firstname, lastname, email,
  } = useSelector((state) => state.user);

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

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
    if (infoMessage.code === 'success') {
      onReset();
    }
  }, [infoMessage]);

  const onEdit = () => {
    setEdit(!edit);
  };

  return (
    <Container>
      <p>Compte</p>

      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        size="large"
        form={form}
        initialValues={{
          lastname,
          firstname,
          email,
          password: null,
        }}
        onFinish={(values) => {
          dispatch(updateUser(id, values));
        }}
      >
        <Row id="edit" justify="center">
          <Switch
            checkedChildren={<EditOutlined />}
            unCheckedChildren={<EditOutlined />}
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
          label="Nouveau mot de passe"
          rules={[
            {
              min: 8,
              message: '8 caractères minimum',
            },
          ]}
        >
          <Input.Password disabled={edit} />
        </Form.Item>

        <Row justify="center" gutter={32}>
          <Col>
            <Button type="primary" htmlType="submit">
              Enregistrer
            </Button>
          </Col>
          <Col>
            <Button htmlType="button" onClick={onReset}>
              Abandonner
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>

  );
};

// == Export
export default Profil;
