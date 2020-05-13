// ==> Import npm
import React, { useState } from 'react';
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
  message,
  Switch,
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
    margin: 24px 0 0;
  }
`;

// ==> Composant
const Profil = () => {
  const [edit, setEdit] = useState(true);
  const dispatch = useDispatch();
  const { id, firstname, lastname, email } = useSelector((state) => state.user);

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onEdit = () => {
    setEdit(!edit);
  };

  return (
    <Container>
      <p>Compte</p>
      <Form
        layout="vertical"
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
        <Col span={12} offset={6}>
          <Row id="edit" justify="end">
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
    </Container>
  );
};

// == Export
export default Profil;
