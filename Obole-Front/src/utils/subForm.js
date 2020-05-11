export default (values) => {
  const form = {
    deceased: {
      lastname: values.lastname,
      firstname: values.firstname,
      birth_date: values.birth_date,
      deceased_date: values.deceased_date,
      entry_date: values.entry_date,
      burial_permit_date: values.burial_permit_date,
      provenance: values.provenance,
      exit_date: values.exit_date,
      ritual: values.ritual,
      room: values.room,
    },
    conservation: {
      date: values.date,
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
