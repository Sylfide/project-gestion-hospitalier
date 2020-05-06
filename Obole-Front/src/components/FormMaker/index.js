// ==> Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { creatUser } from 'src/store/actions';
// import styled from 'styled-components';

// ==> Components

// ==> Styles

// ==> Ant Design sub components
import { Form, Input, Button, Select, Row, Col } from 'antd';

const { Option } = Select;

// ==> CSS in JS

// ==> Composant
const FormMaker = () => {
  const dispatch = useDispatch();
  // const clickCount = useSelector((state) => state.counter);

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  // const layout = {
  //   labelCol: {
  //     span: 8,
  //   },
  //   wrapperCol: {
  //     span: 12,
  //   },
  // };

  return (
    <Form
      // {...layout}
      layout="vertical"
      size="large"
      form={form}
      initialValues={{
        role: 'user',
      }}
      onFinish={(values) => {
        dispatch(creatUser(values));
      }}
    >
      <Col span={12} offset={6}>
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
            { required: true },
          ]}
        >
          <Input
            type="password"
          />
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

        <Form.Item>
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
        </Form.Item>
      </Col>
    </Form>
  );
};

// == Export
export default FormMaker;
