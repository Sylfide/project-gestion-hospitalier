// ==> Import npm
import React from 'react';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components

// ==> Styles

// ==> Ant Design sub components

// ==> CSS in JS
const Container = styled.div`
  p {
    border: 1px solid #1aae9f;
    background: #8dd7cf;
    padding: 10px;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5715;
  }
  dl {
    background-color: #ffffff;
    padding: 32px;
    border-radius: 6px;
    margin: 32px auto;
    min-width: 200px;
    max-width: 50%;
    text-align: start;
    display: grid;
    grid-template-columns: max-content 1fr max-content 1fr;
    grid-gap: 12px 8px;
    align-items: baseline;
    & > * {
      padding: 5px;
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
  // const dispatch = useDispatch();
  const embalmerCard = useSelector((state) => state.embalmerCard);

  return (
    <Container>
      <p>Fiche thanatopracteur</p>
      <dl>
        <dt>Prénom :</dt>
        <dd className="span">{embalmerCard.firstname}</dd>
        <dt>Nom :</dt>
        <dd className="span">{embalmerCard.lastname}</dd>
        <dt>Adresse :</dt>
        <dd className="span">{embalmerCard.adress}</dd>
        <dt>Code postal :</dt>
        <dd>{embalmerCard.zip_code}</dd>
        <dt>Ville :</dt>
        <dd>{embalmerCard.city}</dd>
        <dt>Téléphone :</dt>
        <dd>{embalmerCard.tel}</dd>
        <dt>Email :</dt>
        <dd>{embalmerCard.email}</dd>
      </dl>
    </Container>
  );
};

// == Export
export default CardEmbalmer;
