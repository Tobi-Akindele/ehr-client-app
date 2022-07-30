import React from 'react';
import { ErrorMessage, useField } from 'formik';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin: 20px;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  margin: 5px 0px;
`;

const Input = styled.input`
  border: none;
  height: 30px;
  border-bottom: ${(props) =>
    props.hasError ? '1px solid red' : '1px solid grey'};
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const TextField = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Container>
      <InputContainer>
        <Label>{props.label}</Label>
        <Input
          hasError={meta.touched && meta.error ? true : false}
          {...field}
          {...props}
          autoComplete='off'
        />
      </InputContainer>
      <ErrorContainer>
        <ErrorMessage
          component='InputContainer'
          name={field.name}
          className='error'
        />
      </ErrorContainer>
    </Container>
  );
};

export default TextField;
