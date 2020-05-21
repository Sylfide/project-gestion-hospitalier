/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
// ==> Import npm
import React from 'react';
import styled from 'styled-components';

// ==> Components
import { Card, Avatar, Divider, Tag } from 'antd';

// ==> Images
import Laura from 'src/assets/img/Laura01.jpg';
import Sylvie from 'src/assets/img/Sylvie_Morin01.jpg';
import Reuben from 'src/assets/img/Reuben.jpg';
import Vincent from 'src/assets/img/Vincent.png';

// ==> Styles
import './styles.scss';

// ==> Ant Design sub components

// ==> CSS in JS
const Container = styled(Divider)`
  .devCard {
    display: flex;
    justify-content: space-evenly;
    margin: 5% 0;
  }

  .ant-divider-with-text:after,
  .ant-divider-with-text:before {
    border-top-color: #e8833a;
  }

  .tag {
    display: flex;
    flex-direction: column;
  }

`;

// ==> Composant
const Accueil = () =>{
// const dispatch = useDispatch();
// const clickCount = useSelector((state) => state.counter);

  return (
    <Container>
      <div>
        <Divider
          plain
          style={{
            marginTop: '3%',
            fontSize: '1.5em'
          }}
        >
          Présentation de Obole
        </Divider>
        <div className="text">
          <Card>
            <p>Obole est un logiciel de gestion d'une chambre mortuaire.</p>
            <p>Elles nous à été commander par une cliente qui travaillait dans le dommaine de la médecine légale afin de pouvoir gérer plusieurs apects du métier.</p>
            <p>En effet ces métiers sont très peu voir pas du tout informatiser et demande pourtant une grosse gestion.</p>
            <div className="border"></div>
            <p>Les principales demandes sont :</p>
            <p><em>la gestion de l'entrée et la sortie des défunts,</em></p>
            <p><em>l'impression d'un état de service (sorte de facture) pour les thanatopracteurs et les familles,</em></p>
            <p><em>la gestion de la place dans les chambres ainsi que la création de celle-ci.</em></p>
          </Card>
        </div>
      </div>

      <Divider
        plain
        style={{
          marginTop: '3%',
          fontSize: '1.5em'
        }}
      >
        L'équipe
      </Divider>

      <div className="devCard">
        <div className="dev">
          <Avatar
            className="avatar"
            alt="Laura01"
            src={Laura}
            size={150}
            style={{ border: '3px solid #e8833a' }}
          />
          <Divider
            plain
            style={{
              fontSize: '1.3em'
            }}
          >
            Laura
          </Divider>
          <div className="tag">
            <Tag
              color="#96c3ec"
              style={{
                borderColor: '#2c88d9',
                marginBottom: '5px',
                borderRadius: '20px'
              }}
            >
              Product Owner
            </Tag>
            <Tag
              color="#f3c19d"
              style={{
                borderColor: '#e8833a',
                marginBottom: '5px',
                borderRadius: '20px'
              }}
            >
              Développeuse Back-End
            </Tag>
          </div>
        </div>

        <div className="dev">
          <Avatar
            className="avatar"
            alt="Sylvie"
            src={Sylvie}
            size={150}
            style={{ border: '3px solid #e8833a' }}
          />
          <Divider
            plain
            style={{
              fontSize: '1.3em'
            }}
          >
            Sylvie
          </Divider>
          <div className="tag">
            <Tag
              color="#96c3ec"
              style={{
                borderColor: '#2c88d9',
                marginBottom: '5px',
                borderRadius: '20px'
              }}
            >
              Scrum Master
            </Tag>
            <Tag
              color="#8dd7cf"
              style={{
                borderColor: '#1aae9f',
                marginBottom: '5px',
                borderRadius: '20px'
              }}
            >
              Développeuse Front-End
            </Tag>
          </div>
        </div>

        <div className="dev">
          <Avatar
            className="avatar"
            alt="Reuben"
            src={Reuben}
            size={150}
            style={{ border: '3px solid #e8833a' }}
          />
          <Divider
            plain
            style={{
              fontSize: '1.3em'
            }}
          >
            Reuben
          </Divider>
          <div className="tag">
            <Tag
              color="#96c3ec"
              style={{
                borderColor: '#2c88d9',
                marginBottom: '5px',
                borderRadius: '20px'
              }}
            >
              Lead Dev Back - Git Master
            </Tag>
            <Tag
            color="#f3c19d"
            style={{
              borderColor: '#e8833a',
              marginBottom: '5px',
              borderRadius: '20px'
            }}
          >
            Développeur Back-End
          </Tag>
          </div>
        </div>

        <div className="dev">
          <Avatar
            className="avatar"
            alt="Vincent"
            src={Vincent}
            size={150}
            style={{ border: '3px solid #e8833a' }}
          />
          <Divider
            plain
            style={{
              fontSize: '1.3em'
            }}
          >
            Vincent
          </Divider>
          <div className="tag">
            <Tag
              color="#96c3ec"
              style={{
                borderColor: '#2c88d9',
                marginBottom: '5px',
                borderRadius: '20px'
              }}
            >
              Lead Dev Front
            </Tag>
            <Tag
              color="#8dd7cf"
              style={{
                borderColor: '#1aae9f',
                marginBottom: '5px',
                borderRadius: '20px'
              }}
            >
              Développeur Front-End
            </Tag>
          </div>
        </div>
      </div>

      <Divider
        plain
        style={{
          marginTop: '3%',
          fontSize: '1.5em'
        }}
      >
        Histoire du nom : Obole
      </Divider>
      <div className="text">
      <Card>
        <p>Dans la Grèce antique, l’obole était une pièce de monnaie de faible valeur.</p>
        <p> Avant les funérailles, il était coutume d’en placer une dans la bouche du défunt.</p>
        <p> Elle permettait de payer le nocher Charon qui assurait la traversée du fleuve Styx entourant les Enfers.</p>
      </Card>
      </div>
      
    </Container>
  );
};

// == Export
export default Accueil;
