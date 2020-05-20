// ==> Import npm
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import FormEmbalmer from 'src/components/FormEmbalmer';
import { Switch } from 'antd';

// ==> Styles
import { EditOutlined } from '@ant-design/icons';

// ==> Ant Design sub components

// ==> CSS in JS
const Card = styled.div`
  p {
    border: 1px solid #1aae9f;
    background: #8dd7cf;
    padding: 10px;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5715;
    margin-bottom: 24px;
  }
  dl {
    background-color: #f3c19d;
    padding: 32px;
    border-radius: 6px;
    margin: 32px auto;
    min-width: 200px;
    max-width: 66%;
    text-align: start;
    display: grid;
    grid-template-columns: max-content 1fr max-content 1fr;
    row-gap: 16px;
    align-items: baseline;
    & > * {
      padding: 8px;
      height: 100%;
    }
    dt {
      text-align: right;
    }
    dd {
      background-color: #f0f2f5;
    }
  }
  .span {
    grid-column: 2 / -1;
  }
  
`;

// ==> Composant
const CardEmbalmer = () => {
  const [edit, setEdit] = useState(false);
  const embalmerCard = useSelector((state) => state.embalmerCard);

  const onEdit = () => {
    setEdit(!edit);
  };

  return (
    <Card>
      <p>Fiche thanatopracteur</p>
      <Switch
        checkedChildren={<EditOutlined />}
        unCheckedChildren={<EditOutlined />}
        onChange={onEdit}
      />
      {edit ? <FormEmbalmer edit /> : (
        <dl>
          <dt>Nom :</dt>
          <dd className="span">{embalmerCard.lastname}</dd>
          <dt>Prénom :</dt>
          <dd className="span">{embalmerCard.firstname}</dd>
          <dt>Adresse :</dt>
          <dd className="span">{embalmerCard.address}</dd>
          <dt>Code postal :</dt>
          <dd>{embalmerCard.zip_code}</dd>
          <dt>Ville :</dt>
          <dd>{embalmerCard.city}</dd>
          <dt>Téléphone :</dt>
          <dd>{embalmerCard.tel}</dd>
          <dt>Email :</dt>
          <dd>{embalmerCard.email}</dd>
        </dl>
      )}
    </Card>
  );
};

// == Export
export default CardEmbalmer;
