// ==> Import npm
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { } from 'src/store/actions';
import styled from 'styled-components';

// ==> Components
import ListUser from 'src/components/ListUser';
import FormUser from 'src/components/FormUser';
import FormRoom from 'src/components/FormRoom';
import FormEmbalmer from 'src/components/FormEmbalmer';
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
const Accordion = (props) => {
  // const dispatch = useDispatch();
  // const opened = useSelector((state) => state.opened);

  return (
    <Section accordion>
      <p>{props.header}</p>
      <Panel header="Nouveau" key="1">
        {props.header === 'Employés' ? <FormUser /> : null}
        {props.header === 'Chambres' ? <FormRoom /> : null}
        {props.header === 'Thanatopracteurs' ? <FormEmbalmer /> : null}
      </Panel>
      <Panel header="List" key="2">
        {props.header === 'Employés' ? <ListUser /> : null}
      </Panel>
      {props.header === 'Défunts'
        ? <Panel header="Historique" key="3">Historique de tous les trucs</Panel>
        : null }
    </Section>
  );
};

// == Export
export default Accordion;
