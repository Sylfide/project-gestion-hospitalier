// ==> Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatUser } from 'src/store/actions';
// import styled from 'styled-components';

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

// ==> Composant
const FormUser = () => {
  const dispatch = useDispatch();
  const topMessage = useSelector((state) => state.infoMessage);

  const clear = () => {
    dispatch({ type: 'clear' });
  };
  const error = () => {
    message.error(topMessage, 2, clear);
  };
  useEffect(() => {
    if (topMessage !== '') {
      error();
    }
  }, [topMessage]);

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      layout="vertical"
      size="large"
      form={form}
      initialValues={{
        role: 'room',
      }}
      onFinish={(values) => {
        dispatch(creatUser(values));
      }}
    >
      <Col span={12} offset={6}>
        <Form.Item
          name="name"
          label="Nom de la chambre"
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
          name="capacite"
          label="Capacité de la chambre"
          rules={[
            {
              required: true,
              message: 'Champ requis',
            },
          ]}
        >
          <Input />
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
export default FormUser;
