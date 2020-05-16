// ==> Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatUser } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  message,
} from 'antd';

// ==> Styles

// ==> Ant Design sub components
const { Option } = Select;

// ==> CSS in JS
const Container = styled(Form)`
  margin: 24px 0;
`;

// ==> Composant
const FormUser = () => {
  const dispatch = useDispatch();
  const infoMessage = useSelector((state) => state.infoMessage);

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

  return (
    <Container
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      size="large"
      form={form}
      initialValues={{
        role: 'user',
      }}
      onFinish={(values) => {
        dispatch(creatUser(values));
      }}
    >

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
        <Input />
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
        <Input />
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
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mot de passe"
        rules={[
          {
            required: true,
            message: 'Champ requis',
          },
          {
            min: 8,
            message: '8 caractères minimum',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="role"
        label="Rôle de l'utilisateur"
      >
        <Select>
          <Option value="user">Employé</Option>
          <Option value="admin">Administrateur</Option>
        </Select>
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
    </Container>

  );
};

// == Export
export default FormUser;
