import React from 'react';
import { FormGroup, FormText, Input, Label } from 'reactstrap';
import { MDBIcon } from "mdbreact";

const FormInput = ({
  input,
  label,
  type,
  inputPlaceHolder,
  maxDate,
  minDate,
  meta: { touched,error }
}) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input
      {...input}
      type={type}
      placeholder={inputPlaceHolder}      
    />
    <div>    
      {touched && error &&<span><MDBIcon icon="exclamation-circle"/> {error}</span>}
    </div>    
  </FormGroup>
);

export default FormInput;
