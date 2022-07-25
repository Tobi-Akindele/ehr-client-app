import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 50px;
  position: sticky;
  background-color: #000000;
  top: 0;
  z-index: 999;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div``;

const Logo = styled.span`
  font-weight: 700;
  font-size: 30px;
  color: #ffffff;
  cursor: pointer;
`;

const Topbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>EHR</Logo>
        </Left>
      </Wrapper>
    </Container>
  );
};

export default Topbar;
