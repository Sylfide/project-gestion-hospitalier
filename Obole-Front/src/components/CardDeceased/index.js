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
  margin-bottom: 64px;
  p {
    border: 1px solid #1aae9f;
    background: #8dd7cf;
    padding: 10px;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5715;
  }
  h4 {
    margin: 32px 0 8px;
    color: #e8833a;
  }
  dl {
    background-color: #ffffff;
    padding: 32px;
    border-radius: 4px;
    margin: 0 auto;
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
const CardDeceased = () => {
  // const dispatch = useDispatch();
  const deceasedCard = useSelector((state) => state.deceasedCard);

  return (
    <Container>
      <p>Fiche défunt</p>
      <h4>Informations sur le défunt</h4>
      <dl>
        <dt>Prénom :</dt>
        <dd className="span">{deceasedCard.firstname}</dd>
        <dt>Nom :</dt>
        <dd className="span">{deceasedCard.lastname}</dd>
        <dt>Naissance :</dt>
        <dd>{deceasedCard.birth_date}</dd>
        <dt>décès:</dt>
        <dd>{deceasedCard.deceased_date}</dd>
        <dt>Provenance :</dt>
        <dd>{deceasedCard.provenance}</dd>
        <dt>Entrée :</dt>
        <dd>{deceasedCard.entry_date}</dd>
        <dt>Permis d'inhumer :</dt>
        <dd>{deceasedCard.burial_permit_date}</dd>
        <dt>Sortie :</dt>
        <dd>{deceasedCard.exit_date}</dd>
        <dt>Rite religieux :</dt>
        <dd className="span">{deceasedCard.ritual ? 'oui' : 'non'}</dd>
      </dl>
      <h4>Informations sur le soin</h4>
      <dl>
        <dt>Thanatopracteur :</dt>
        <dd className="span">{deceasedCard.embalmer_firstname ? `${deceasedCard.embalmer_firstname} ${deceasedCard.embalmer_lastname}` : null }</dd>
        <dt>Soin :</dt>
        <dd className="span">{deceasedCard.conservation_date}</dd>
      </dl>
      <h4>Personne prenant en charge les obsèques</h4>
      <dl>
        <dt>Prénom :</dt>
        <dd className="span">{deceasedCard.deceased_ref_firstname}</dd>
        <dt>Nom :</dt>
        <dd className="span">{deceasedCard.deceased_ref_lastname}</dd>
        <dt>Adresse :</dt>
        <dd className="span">{deceasedCard.deceased_ref_adress}</dd>
        <dt>Code postal :</dt>
        <dd>{deceasedCard.deceased_ref_zip_code}</dd>
        <dt>Ville :</dt>
        <dd>{deceasedCard.deceased_ref_city}</dd>
        <dt>Téléphone :</dt>
        <dd>{deceasedCard.deceased_ref_tel}</dd>
        <dt>Email :</dt>
        <dd>{deceasedCard.deceased_ref_email}</dd>
        {/* <dt>Pompes Funèbres :</dt>
        <dd className="span">{deceasedCard.deceased_ref_}</dd> */}
      </dl>
    </Container>
  );
};

// == Export
export default CardDeceased;
