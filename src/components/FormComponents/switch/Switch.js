import React from 'react';
import styled from 'styled-components';
import './switch.css';

const Container = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-between;
  width: ${(props) => props.width};
`;

const Label = styled.label``;

const TextLabel = styled.label``;

const Input = styled.input``;

const InputSpan = styled.div``;

const Switch = ({ ...props }) => {
  return (
    <Container>
      <TextLabel style={{ margin: '5px 0px' }}>{props.label}</TextLabel>
      <Input
        checked={props.isOn}
        onChange={props.handleToggle}
        className='switch-checkbox'
        id={props.id}
        type={props.type}
      />
      <Label
        htmlFor={props.id}
        className='switch-label'
        style={{ background: props.isOn && '#ff0000' }}
      >
        <InputSpan className='switch-button' />
      </Label>
    </Container>
  );
};

export default Switch;
