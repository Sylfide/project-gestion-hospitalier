/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
export default (values) => {
  const birth_date = values.birthDate ? values.birthDate.format('DD/MM/YYYY') : null;
  const deceased_date = values.deceasedDate ? values.deceasedDate.format('DD/MM/YYYY') : null;
  const entry_date = values.entryDate ? values.entryDate.format('DD/MM/YYYY') : null;
  const burial_permit_date = values.burialPermitDate ? values.burialPermitDate.format('DD/MM/YYYY') : null;
  const exit_date = values.exitDate ? values.exitDate.format('DD/MM/YYYY') : null;
  const date = values.date ? values.date.format('DD/MM/YYYY') : null;

  const form = {
    deceased: {
      lastname: values.lastname,
      firstname: values.firstname,
      birth_date,
      deceased_date,
      entry_date,
      burial_permit_date,
      provenance: values.provenance,
      exit_date,
      ritual: values.ritual,
      room: values.room,
    },
    conservation: {
      date,
      embalmer_id: values.embalmer_id,
    },
    deceased_ref: {
      ref_firstname: values.ref_firstname,
      ref_lastname: values.ref_lastname,
      address: values.address,
      zip_code: values.zip_code,
      city: values.city,
      email: values.email,
      tel: values.tel,
    },
  };
  return form;
};
