import React from 'react';
import { useSelector } from 'react-redux';
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

export const Header = ({ className }) => {
  const user = useSelector(state => state.user);

  return (
    <HeaderContainer className={className}>
      <HeaderGreeting>Hello, { user.firstName } { user.lastName }</HeaderGreeting>
    </HeaderContainer>
  );
};
