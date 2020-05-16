// ==> Import npm
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// ==> Components
import FormRoom from 'src/components/FormRoom';
import FormUser from 'src/components/FormUser';
import FormDeceased from 'src/components/FormDeceased';
import FormEmbalmer from 'src/components/FormEmbalmer';
import ListRoom from 'src/components/ListRoom';
import ListUser from 'src/components/ListUser';
import ListDeceased from 'src/components/ListDeceased';
import ListEmbalmer from 'src/components/ListEmbalmer';
import { Collapse } from 'antd';

// ==> Styles

// ==> Ant Design sub components
const { Panel } = Collapse;

// ==> CSS in JS
const Section = styled(Collapse)`
  color: inherit;
  p {
    border: 1px solid #1aae9f;
    background: #8dd7cf;
    padding: 10px;
    font-size: 2rem;
    font-weight: bold;
  }
  .ant-collapse-item
  .ant-collapse-header {
    color: #808080;
    font-size: larger;
  }
  .ant-collapse-item-active {
    border: 1px solid #e8833a;
  }
  .ant-collapse-item-active
  .ant-collapse-header,
  .ant-collapse-header:hover {
    color: #e8833a;
  }
  .ant-collapse-content-box {
    padding: 0%;
  }
`;

// ==> Composant
const Accordion = ({ header }) => (
  <Section
    accordion
    destroyInactivePanel
  >
    <p>{header}</p>
    <Panel header="Nouveau" key="1">
      {header === 'Chambres' ? <FormRoom /> : null}
      {header === 'Employés' ? <FormUser /> : null}
      {header === 'Défunts' ? <FormDeceased /> : null}
      {header === 'Thanatopracteurs' ? <FormEmbalmer /> : null}
    </Panel>
    <Panel header="List" key="2">
      {header === 'Chambres' ? <ListRoom /> : null}
      {header === 'Employés' ? <ListUser /> : null}
      {header === 'Défunts' ? <ListDeceased /> : null}
      {header === 'Thanatopracteurs' ? <ListEmbalmer /> : null}
    </Panel>
    {header === 'Défunts'
      ? <Panel header="Historique" key="3">Historique de tous les trucs</Panel>
      : null }
  </Section>
);

// ==> Prop validation
Accordion.propTypes = {
  header: PropTypes.string.isRequired,
};

// ==> Export
export default Accordion;
