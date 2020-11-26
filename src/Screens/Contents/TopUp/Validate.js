const Validate = (values) => {
  const errors = {};
  const password = {};  
  const password2 = {};
  if (!values.nominal) {
    errors.nominal = 'Nominal Required';
  }
  // if (values.nominal!=values.nominalany){
  //   values.nominal=values.nominalany
  // }

  if (!values.payment) {
    errors.payment = 'Payment Required';
  }
  if (!values.confirmpayment) {
    values.confirmpayment=values.payment;
  }  

  if (values.confirmpayment != values.payment) {
    values.confirmpayment=values.payment;
  }

  if (!values.confirmnominal != values.nominal){
    values.confirmnominal=values.nominal;
  }
  
  if (!values.passwordconfirm){
    errors.passwordconfirm = 'Password Required';
  } 
  // else {
  //   password = values.passwordconfirm
  // }

  if (!values.passwordconfirm2){
    errors.passwordconfirm2 = 'Password Required';
  } 
  // else{
  //   password2 = values.passwordconfirm2
  // }

  if (values.passwordconfirm != values.passwordconfirm2) {
    errors.passwordconfirm2='Password doesnt match';
  }

  return errors;
};

export default Validate;