/* eslint-disable linebreak-style */
// ==> Import npm
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatEmbalmer, updateEmbalmer } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
} from 'antd';

// ==> Styles

// ==> Ant Design sub components

// ==> CSS in JS
const Container = styled(Form)`
  margin: 24px 0;
`;

// ==> Composant
const FormEmbalmer = ( {edit} ) => {
  const dispatch = useDispatch();
  const embalmerCard = useSelector((state) => state.embalmerCard);
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
    if (infoMessage.code === 'success' && !edit) {
      onReset();
    }
  }, [infoMessage]);

  return (
    <Container
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      size="large"
      form={form}
      initialValues={edit ? { ...embalmerCard } : null}
      onFinish={edit
        ? (values) => {
          dispatch(updateEmbalmer(embalmerCard.id, values));
        }
        : (values) => {
          dispatch(creatEmbalmer(values));
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
