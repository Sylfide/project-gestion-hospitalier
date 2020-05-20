/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
// ==> Import npm
import React from 'react';
// import styled from 'styled-components';

// ==> Components
import { Card } from 'antd';

// ==> Styles
import img03 from 'src/assets/img/Tardis_test.png';
import './styles.scss';

// ==> Ant Design sub components
const { Meta } = Card;

// ==> CSS in JS

// ==> Composant
const Accueil = () =>
// const dispatch = useDispatch();
// const clickCount = useSelector((state) => state.counter);

  (
    <div>
      <p>Présentation de Obole</p>
      <div>
        <p>TEXT</p>
      </div>
      <div className="card">
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="img03" src={img03} />}
        >
          <Meta title="Laura Fillatre" description="Product Owner" />
          <Meta title="" description="Développeuse Back-End" />
        </Card>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="img03" src={img03} />}
        >
          <Meta title="Sylvie Morin" description="Scrum Master" />
          <Meta title="" description="Développeuse Front-End" />
        </Card>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="img03" src={img03} />}
        >
          <Meta title="Reuben Chouraki" description="Lead Dev Back / Git Master" />
          <Meta title="" description="Développeur Back-End" />
        </Card>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="img03" src={img03} />}
        >
          <Meta title="Vincent Del Jesus" description="Lead Dev Front" />
          <Meta title="" description="Développeur Front-End" />
        </Card>
      </div>
      <p>Histoire du nom : Obole</p>
      <div>
        <p>TEXT</p>
      </div>
    </div>
  )
;

// == Export
export default Accueil;
