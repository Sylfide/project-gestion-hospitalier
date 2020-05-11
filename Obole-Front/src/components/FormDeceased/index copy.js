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
      layout="vertical"
      size="large"
      form={form}
      onFinish={(values) => {
        // dispatch(creatUser(values));
      }}
    >
      <Col span={12} offset={6}>
        <Form.Item
          name="rooms"
          label="Nom de la chambre"
        >
          <Select>
            <Option value="room_1">Hogwarts</Option>
            <Option value="room_2">Ilvermorny</Option>
          </Select>
        </Form.Item>
        <Divider>Information sur le défunt</Divider>
        {/* <Title className="title" level={3}>Information sur le défunt</Title> */}

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

        <Form.Item>
          <Row justify="space-around" gutter={32}>
            <Col>
              <Form.Item
                name="date"
                label="Date de naissance"
              >
                <DatePicker locale={fr} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="date"
                label="Date de décés"
              >
                <DatePicker locale={fr} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="rite"
                label="Rite religieux"
              >
                <Radio.Group>
                  <Radio value="oui">Oui</Radio>
                  <Radio value="non">Non</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="provenance"
          label="Provenance du corps"
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
          <Row justify="space-around" gutter={32}>
            <Col>
              <Form.Item
                name="date"
                label="Date d'entré"
              >
                <DatePicker locale={fr} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="date"
                label="Date de sortie"
              >
                <DatePicker locale={fr} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="date"
                label="Date du permis d'inhumer"
              >
                <DatePicker locale={fr} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        {/* <Title className="title" level={3}>Information sur le soin</Title> */}

        <Form.Item
          name="thanato"
          label="Thanatopracteur"
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
          <Row justify="space-around" gutter={32}>
            <Col>
              <Form.Item
                name="soin"
                label="Soin de conservation"
              >
                <Radio.Group>
                  <Radio value="oui">Oui</Radio>
                  <Radio value="non">Non</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="date"
                label="Date du soin"
              >
                <DatePicker locale={fr} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        {/* <Title className="title" level={3}>Information sur la personne prennant en charge les obsèques</Title> */}

        <Form.Item
          name="lien"
          label="Lien de parenté"
        >
          <Select>
            <Option value="mere">Mère</Option>
            <Option value="pere">Père</Option>
            <Option value="frere">Frère</Option>
            <Option value="soeur">Soeur</Option>
            <Option value="oncle">Oncle</Option>
            <Option value="tante">Tante</Option>
            <Option value="fils">Fils</Option>
            <Option value="fille">Fille</Option>
            <Option value="neveu">Neveu</Option>
            <Option value="niece">Nièce</Option>
          </Select>
        </Form.Item>

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
          name="adress"
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

        <Form.Item>
          <Row justify="space-around" gutter={32}>
            <Col>
              <Form.Item
                name="cp"
                label="Code Postal"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="ville"
                label="Ville"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Row justify="space-around" gutter={32}>
            <Col>
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
                    message: 'Adresse mail non valide',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="tel"
                label="Téléphone"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="undertakers"
          label="Pompes Funèbres"
          rules={[
            { required: true },
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
    </Container>
  );
};

// == Export
export default FormDeceased;
