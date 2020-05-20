// ==> Import npm
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { } from 'src/store/actions';

// ==> Components
import FormDeceased from 'src/components/FormDeceased';
import { Switch, Checkbox } from 'antd';

// ==> Styles
import './styles.scss';
import { EditOutlined } from '@ant-design/icons';

// ==> Ant Design sub components

// ==> CSS in JS

// ==> Composant
const CardDeceased = () => {
  const [edit, setEdit] = useState(false);
  const deceasedCard = useSelector((state) => state.deceasedCard);

  const onEdit = () => {
    setEdit(!edit);
  };

  return (
    <div id="container">
      <p>Fiche défunt</p>
      <Switch
        checkedChildren={<EditOutlined />}
        unCheckedChildren={<EditOutlined />}
        onChange={onEdit}
      />
      {edit ? <FormDeceased edit /> : (
        <div id="card">
          <h4><span>Informations sur le défunt</span></h4>
          <dl>
            <dt>Nom :</dt>
            <dd className="span">{deceasedCard.lastname}</dd>
            <dt>Prénom :</dt>
            <dd className="span">{deceasedCard.firstname}</dd>
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
            <dd className="check"><Checkbox disabled defaultChecked={deceasedCard.ritual} /></dd>
          </dl>
          <h4><span>Informations sur le soin</span></h4>
          <dl>
            <dt>Thanatopracteur :</dt>
            <dd className="span">{deceasedCard.embalmer_firstname ? `${deceasedCard.embalmer_firstname} ${deceasedCard.embalmer_lastname}` : null }</dd>
            <dt>Soin :</dt>
            <dd className="span">{deceasedCard.conservation_date}</dd>
          </dl>
          <h4><span>Personne prenant en charge les obsèques</span></h4>
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
        </div>
      )}
    </div>
  );
};

// == Export
export default CardDeceased;
