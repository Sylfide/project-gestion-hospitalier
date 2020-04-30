// ==> Import npm
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
// import { LOGIN } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import { Form, Input, Button } from 'antd';

// ==> Styles
import logo from 'src/assets/img/logo-obole.svg';

// ==> Ant Design sub components

// ==> CSS in JS
const Container = styled.div`
  margin: auto;
  width: 300px;
  display: grid;
  grid-template-rows: 60px 1fr;
  grid-gap: 24px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  text-align: center;

  img {
    height: 60px;
  }

  input {
    text-align: center;
  }
`;

// ==> Form validation
const validateMessages = {
  required: 'Champ requis',
  types: {
    email: 'Cette adresse n\'est pas valide',
  },
};

// ==> Composant
const LoginForm = () => {
  // const dispatch = useDispatch();
  // const clickCount = useSelector((state) => state.counter);
  // const history = useHistory();

  return (
    <Container>
      <img alt="logo" src={logo} />
      <Form
        size="large"
        name="normal_login"
        className="login-form"
        validateMessages={validateMessages}
        onFinish={(values) => {
          console.log('values: ', values);
          // dispatch({ type: LOGIN, history, values });
        }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true }]}
        >
          <Input
            type="password"
            placeholder="Mot de passe"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Mot de passe oublié ?
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

// == Export
export default LoginForm;
