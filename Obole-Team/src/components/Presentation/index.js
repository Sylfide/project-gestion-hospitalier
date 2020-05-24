/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
// ==> Import npm
import React from 'react';
import styled from 'styled-components';

// ==> Components antd
import { Card, Avatar, Divider, Tag } from 'antd';
import { IconContext } from "react-icons";
import { DiVisualstudio, DiPostgresql } from 'react-icons/di';
import { FaSlack, FaJs, FaDiscord, FaTrello, FaGit, FaGithub, FaReact, FaNodeJs } from 'react-icons/fa';
import { AiOutlineAntDesign } from 'react-icons/ai';

// ==> Photos
import Laura from 'src/assets/img/Laura01.jpg';
import Sylvie from 'src/assets/img/Sylvie_Morin01.jpg';
import Reuben from 'src/assets/img/Reuben.jpg';
import Vincent from 'src/assets/img/Vincent.png';

// ==> Logos
import sqitch from 'src/assets/img/logo/sqitch.png';
import axios from 'src/assets/img/logo/axios.png';
import redux from 'src/assets/img/logo/redux.png';

// ==> Styles
import './styles.css';

// ==> Ant Design sub components

// ==> CSS in JS
const Container = styled(Divider)`
  .devCard, .stackCard {
    display: flex;
    justify-content: space-evenly;
    margin: 5% 0;
  }

  .cut:after, .ant-divider-with-text:after,
  .ant-divider-with-text:before {
    border-top-color: #e8833a;
  }

  .borderCard .ant-card-body {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    border-top: 1px solid #2c88d9;
  }

  .tag, .stack {
    display: flex;
    flex-direction: column;
  }

`;

// ==> Composant
const Presentation = () =>{
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
            <p>Il nous a été commandé par une cliente qui travaillait dans le domaine de la médecine légale afin de pouvoir gérer plusieurs aspects du métier.</p>
            <p>En effet ces métiers sont très peu, voire pas du tout, informatisé et demandent pourtant une grosse gestion.</p>
            <div className="border"></div>
            <p>Les principales demandes sont :</p>
            <p>- <em>la gestion de l'entrée et la sortie des défunts,</em></p>
            <p>- <em>le suivi de l'occupation des chambres mortuaires,</em></p>
            <p>- <em>la consultation de l'activité d'un thanatopracteur (intervenant externe).</em></p>
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
        Le stack
      </Divider>

      <div className="stackCard">
        <div>          
          <Card
            className="borderCard"
            title="Stack Back-End" 
            style={{ 
              width: 300,
              background: '#96c3ec',
            }}
          >
            <IconContext.Provider value={{ color: "#363333", size: "2em" }}>
              <FaNodeJs />
              <DiPostgresql className="psql" />
              <div className="expressJS">
                <p>EXPRESS</p>
                <FaJs className="FaJs" />
              </div>
              <img src={sqitch} className="sqitch"/>
              
            </IconContext.Provider>
          </Card>
        </div>

        <div>
        <Card
          className="borderCard"
            title="Stack Front-End" 
            style={{ 
              width: 300,
              background: '#96c3ec'
            }}
          >
            <IconContext.Provider value={{ color: "#363333", size: "2em" }}>
              <FaReact />
              <img src={redux} className="redux"/>
              <img src={axios} className="axios"/>
              <AiOutlineAntDesign />
              
            </IconContext.Provider>
          </Card>
        </div>

        <div>
        <Card
            className="borderCard"
            title="Stack Projet" 
            style={{ 
              width: 300,
              background: '#96c3ec'
            }}
          >
            <IconContext.Provider value={{ color: "#363333", size: "2em" }}>
              <DiVisualstudio />
              <FaGit  />
              <FaGithub />
              <FaTrello />
              <FaSlack />
              <FaDiscord />
            </IconContext.Provider>
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
        <div>
          <Avatar
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

        <div>
          <Avatar
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

        <div>
          <Avatar
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

        <div>
          <Avatar
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
        Mythologie : Obole
      </Divider>
      <div className="text">
      <Card>
        <p>Dans la Grèce antique, l’obole était une pièce de monnaie de faible valeur.</p>
        <p>Avant les funérailles, il était coutume d’en placer une dans la bouche du défunt.</p>
        <p>Elle permettait de payer le nocher Charon qui assurait la traversée du fleuve Styx entourant les Enfers.</p>
      </Card>
      </div>
      
    </Container>
  );
};

// == Export
export default Presentation;
