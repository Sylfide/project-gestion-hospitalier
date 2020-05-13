// ==> Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import { Form, Input, InputNumber, Button, Row, Col } from 'antd';

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
        // dispatch(creatEmbalmer(values));
      }}
    >

      <Form.Item
        name="name"
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
        name="capacity"
        label="Capacité"
        rules={[
          {
            required: true,
            message: 'Champ requis',
          },
        ]}
      >
        <InputNumber min={0} />
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
export default FormEmbalmer;
