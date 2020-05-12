// ==> Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import { Form, Input, Button, Row, Col } from 'antd';

// ==> Styles

// ==> Ant Design sub components

// ==> CSS in JS
const Container = styled(Form)`
  margin: 24px 0;
`;

// ==> Composant
const FormEmbalmer = () => {
  const dispatch = useDispatch();
  // const clickCount = useSelector((state) => state.counter);

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Container
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      size="large"
      form={form}
      onFinish={(values) => {
        console.log('values: ', values);
        // dispatch(entry(subForm(values)));
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
        name="address"
        label="Adresse"
        rules={[
          {
            required: true,
            message: 'Champ requis',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Row>
        <Col span={8} push={2}>
          <Form.Item
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            name="zip_code"
            label="Code postal"
            rules={[
              {
                required: true,
                message: 'Champ requis',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 24 }}
            name="city"
            label="Ville"
            rules={[
              {
                required: true,
                message: 'Champ requis',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={8} push={2}>
          <Form.Item
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            name="tel"
            label="Téléphone"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 24 }}
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                message: 'Adresse mail non valide',
              },
              {
                required: true,
                message: 'Champ requis',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

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
export default FormEmbalmer;
