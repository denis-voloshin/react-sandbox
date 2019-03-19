import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 0 15px 0 #b4b4b4;
  background-color: #fff;
`;

const HeaderGreeting = styled.p`
  font-style: italic;
`;

const Header = ({ firstName, lastName }) => (
  <HeaderContainer>
    <HeaderGreeting>Hello, { firstName } { lastName }</HeaderGreeting>
  </HeaderContainer>
);

const mapStateToProps = ({ user }) => user;

export default connect(mapStateToProps, null)(Header);
