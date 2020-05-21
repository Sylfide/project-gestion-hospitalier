/* eslint-disable camelcase */
import moment from 'moment';

export default (values) => {
  const init = {
    roomId: values.room_id,
    lastname: values.lastname,
    firstname: values.firstname,
    birthDate: values.birth_date ? moment(values.birth_date, 'DD-MM-YYYY') : null,
    deceasedDate: values.deceased_date ? moment(values.deceased_date, 'DD-MM-YYYY') : null,
    provenance: values.provenance,
    entryDate: values.entry_date ? moment(values.entry_date, 'DD-MM-YYYY') : null,
    burialPermitDate: values.burial_permit_date ? moment(values.burial_permit_date, 'DD-MM-YYYY') : null,
    exitDate: values.exit_date ? moment(values.exit_date, 'DD-MM-YYYY') : null,
    ritual: values.ritual,
    embalmer_id: values.embalmer_id,
    date: values.conservation_date ? moment(values.conservation_date, 'DD-MM-YYYY') : null,
    ref_lastname: values.deceased_ref_lastname,
    ref_firstname: values.deceased_ref_firstname,
    address: values.deceased_ref_address,
    zip_code: values.deceased_ref_zip_code,
    city: values.deceased_ref_city,
    tel: values.deceased_ref_tel,
    email: values.deceased_ref_email,
  };
  return init;
};
