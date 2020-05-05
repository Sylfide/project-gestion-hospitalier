// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';

import { } from 'src/store/actions';

// == Import Components
import FormMaker from 'src/components/FormMaker';
// import DeceasedForm from 'src/comonents/DeceasedForm';
// import GrafForm from 'src/comonents/GrafForm';


// == Composant
const Form = () => {
  // const dispatch = useDispatch();
  // const clickCount = useSelector((state) => state.counter);

  return (
    <div>
      <FormMaker />
      {/* <DeceasedForm />
      <GrafForm /> */}
    </div>
  );
};

// == Export
export default Form;
