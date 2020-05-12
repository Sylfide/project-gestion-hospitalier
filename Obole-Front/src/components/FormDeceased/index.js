// ==> Import npm
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { } from 'src/store/actions';
import styled from 'styled-components';
import fr from 'antd/es/date-picker/locale/fr_FR';
import subForm from 'src/utils/subForm';

// ==> Components
import { Form, Input, Button, Select, Row, Col, DatePicker, Radio, Divider } from 'antd';

// ==> Styles

// ==> Ant Design sub components
const { Option } = Select;

// ==> CSS in JS
const Container = styled(Form)`
  margin: 24px 0;

  .ant-select {
    text-align: left;
  }
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
        const parsedValues = {
          ...values,
          birth_date: values.birthDate.format('DD/MM/YYYY'),
          deceased_date: values.deceasedDate.format('DD/MM/YYYY'),
          entry_date: values.entryDate.format('DD/MM/YYYY'),
          burial_permit_date: values.burialPermitDate.format('DD/MM/YYYY'),
          exit_date: values.exitDate.format('DD/MM/YYYY'),
          date: values.date.format('DD/MM/YYYY'),
        };
        console.log(subForm(parsedValues));
        // dispatch(creatUser(values));
      }}
    >
      <Form.Item
        name="room"
        label="Nom de la chambre"
      >
        <Select>
          <Option value="room_1">Room A</Option>
          <Option value="room_2">Room B</Option>
        </Select>
      </Form.Item>

      <Divider>Informations sur le défunt</Divider>
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
        <Col span={8} push={2}>
          <Form.Item
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            name="birthDate"
            label="Naissance"
          >
            <DatePicker placeholder="date" locale={fr} format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
        <Col span={8} push={2}>
          <Form.Item
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            name="deceasedDate"
            label="Décès"
          >
            <DatePicker placeholder="date" locale={fr} format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={8} push={2}>
          <Form.Item
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            name="provenance"
            label="Provenance"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8} push={2}>
          <Form.Item
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            name="entryDate"
            label="Entrée"
          >
            <DatePicker placeholder="date" locale={fr} format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={8} push={2}>
          <Form.Item
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            name="burialPermitDate"
            label="Permis d'inhumer"
          >
            <DatePicker placeholder="date" locale={fr} format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
        <Col span={8} push={2}>
          <Form.Item
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            name="exitDate"
            label="Sortie"
          >
            <DatePicker placeholder="date" locale={fr} format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        wrapperCol={{ span: 4 }}
        name="ritual"
        label="Rite religieux"
        rules={[
          {
            required: true,
            message: 'Champ requis',
          },
        ]}
      >
        <Radio.Group>
          <Radio value="oui">Oui</Radio>
          <Radio value="non">Non</Radio>
        </Radio.Group>
      </Form.Item>

      <Divider>Informations sur le soin</Divider>
      <Form.Item
        name="embalmer_id"
        label="Thanatopracteur"
      >
        <Select>
          <Option value="1">Morticia Addams</Option>
          <Option value="2">Fétide Addams</Option>
        </Select>
      </Form.Item>
      <Row>
        <Col span={8} push={2}>
          <Form.Item
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            name="date"
            label="Soin"
          >
            <DatePicker placeholder="date" locale={fr} format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
      </Row>

      <Divider>Personne prenant en charge les obsèques</Divider>
      <Form.Item
        name="ref_lastname"
        label="Nom"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ref_firstname"
        label="Prénom"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Adresse"
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
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="undertakers"
        label="Pompes Funèbres"
      >
        <Input />
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
export default FormDeceased;
