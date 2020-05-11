// ==> Import npm
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { } from 'src/store/actions';
import styled from 'styled-components';
// import moment from 'moment';
import fr from 'antd/es/date-picker/locale/fr_FR';

// ==> Components
import { Form, Input, Button, Select, Row, Col, DatePicker, Radio, Divider } from 'antd';

// ==> Styles

// ==> Ant Design sub components
const { Option } = Select;

// ==> CSS in JS
const Container = styled(Form)`
  .ant-divider-horizontal.ant-divider-with-text-center {
    color: #e8833a;
  }
  .ant-divider-horizontal.ant-divider-with-text-center:before,
  .ant-divider-horizontal.ant-divider-with-text-center:after {
    border-color: #e8833a;
  }
`;

// ==> Composant
const FormDeceased = () => {
  // const dispatch = useDispatch();
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
        // dispatch(creatUser(values));
      }}
    >
      <Form.Item
        wrapperCol={{ span: 6 }}
        name="room"
        label="Nom de la chambre"
      >
        <Select>
          <Option value="room_1">Hogwarts</Option>
          <Option value="room_2">Ilvermorny</Option>
        </Select>
      </Form.Item>

      <Divider>Information sur le défunt</Divider>
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

      <Row>
        <Col span={8} offset={4}>
          <Form.Item
            name="birth_date"
            label="Naissance"
          >
            <DatePicker placeholder="date" locale={fr} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="deceased_date"
            label="Décès"
          >
            <DatePicker placeholder="date" locale={fr} />
          </Form.Item>
        </Col>
      </Row>

    </Container>
  );
};

// == Export
export default FormDeceased;
