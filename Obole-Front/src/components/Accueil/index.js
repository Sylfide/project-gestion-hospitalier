/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
// ==> Import npm
import React from 'react';
import styled from 'styled-components';

// ==> Components
import { Card, Avatar, Divider } from 'antd';

// ==> Styles
import Laura from 'src/assets/img/Laura.png';
import Sylvie from 'src/assets/img/Sylvie_Morin.JPG';
import img03 from 'src/assets/img/Tardis_test.png';
import Vincent from 'src/assets/img/Vincent.png';

// ==> Ant Design sub components
const { Meta } = Card;

// ==> CSS in JS
const Container = styled(Divider)`
  .card {
    display: flex;
    justify-content: space-evenly;
  }

  .ant-divider-horizontal.ant-divider-with-text:before,
  .ant-divider-horizontal.ant-divider-with-text:after {
    border-color: #e8833a;
  }
`;

// ==> Composant
const Accueil = () =>{
// const dispatch = useDispatch();
// const clickCount = useSelector((state) => state.counter);

  return (
    <Container>
      <div>
        <p className="p">Présentation de Obole</p>
        <div className="text">
          {/* <p>Obole est un logiciel de gestion d'une chambre mortuaire. Elles nous à été commander par une cliente qui travaillait dans le dommaine de la médecine légale afin de pouvoir gérer plusieurs apects du métier.</p>
          <p>En effet ces métiers sont très peu voir pas du tout informatiser et demande pourtant une grosse gestion.</p>
          <p>Les principales demandes sont le gestion de l'entrée et la sortie des défunts, l'impression d'un état de service (sorte de facture) pour les thanatopracteurs et les familles, la gestion de la place dans les chambres ainsi que la création de celle-ci.</p> */}
        </div>
      </div>
      
      <div className="card">
        {/* <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="Laura" src={Laura} />}
        > */}
          {/* <Meta title="Laura Fillatre" description="Product Owner" />
          <Meta title="" description="Développeuse Back-End" /> */}
        {/* </Card> */}
        <div className="dev">
          <Avatar
            className="avatar"
            alt="Laura"
            src={Laura}
            size={150}
            style={{ border: '3px solid #e8833a' }}
          />
          <Divider plain>Laura Fillatre</Divider>
        </div>
        


        {/* <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="Sylvie" src={Sylvie} />}
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
          cover={<img alt="Vincent" src={Vincent} />}
        >
          <Meta title="Vincent Del Jesus" description="Lead Dev Front" />
          <Meta title="" description="Développeur Front-End" />
        </Card> */}
      </div>
      <p className="p">Histoire du nom : Obole</p>
      <div className="text">
        <p>TEXT</p>
      </div>
    </Container>
  );
};

// == Export
export default Accueil;
