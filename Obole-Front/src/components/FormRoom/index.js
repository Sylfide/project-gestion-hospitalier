/* eslint-disable linebreak-style */
// ==> Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatRoom } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import { Form, Input, InputNumber, Button, Row, Col, message } from 'antd';

// ==> Styles

// ==> Ant Design sub components

// ==> CSS in JS
const Container = styled(Form)`
  margin: 24px 0;
`;

// ==> Composant
const FormRoom = () => {
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
      onFinish={(values) => {
        dispatch(creatRoom(values));
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
export default FormRoom;
