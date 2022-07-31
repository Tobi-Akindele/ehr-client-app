import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: rgb(0, 0, 0);
  position: sticky;
  top: 50px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Wrapper = styled.div`
  padding: 20px;
  color: #fff;
`;

const Menu = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 13px;
  color: rgb(237, 235, 235);
`;

const List = styled.ul`
  list-style: none;
  padding: 0px;
`;

const ListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  &:active,
  :hover {
    background-color: #ff0000;
    text-decoration: underline;
  }
`;

const sidebarIconStyles = {
  marginRight: '5px',
  fontSize: '20px !important',
};

const Sidebar = () => {
  return (
    <Container>
      <Wrapper>
        <Menu>
          <Title>Menu</Title>
          <List>
            <Link to={'/'} className='link'>
              <ListItem>
                <FontAwesomeIcon
                  style={sidebarIconStyles}
                  icon={faDatabase}
                  title='Home'
                />
                Generate Data
              </ListItem>
            </Link>
          </List>
        </Menu>
      </Wrapper>
    </Container>
  );
};

export default Sidebar;
