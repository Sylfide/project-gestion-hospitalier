// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { } from 'src/store/actions';

// == Import Components
import MakeForm from 'src/components/MakeForm';
// import DeceasedForm from 'src/comonents/DeceasedForm';
// import GrafForm from 'src/comonents/GrafForm';


// == Composant
const Form = () => {
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.counter);

  return (
    <div>
      <MakeForm />
      {/* <DeceasedForm />
      <GrafForm /> */}
    </div>
  );
};

// == Export
export default Form;
