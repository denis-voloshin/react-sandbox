import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import * as userActions from '@Actions/userActions';
import { useDocumentTitle } from '@Utils/hooks';

const UserFormContainer = styled.div`
  border: 1px solid #000;
  padding: 20px;
  margin: 10px;
  width: 300px;
  background-color: #fff;
`;

const UserFormInputBlock = styled.p`
  display: flex;
  flex-direction: column;
  
  :not(:first-child) {
    margin-top: 10px;
  }
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const UserFormInput = styled.input.attrs({
  type: 'text'
})`
  outline: none;
  padding: 10px;
  border-radius: 5px;
  background-color: #e6e6e6;
  transition: box-shadow .1s;
  
  :focus {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
    
    ::-webkit-input-placeholder {
      color: transparent;
    }
    :-moz-input-placeholder {
      color: transparent;
    }
  }
`;

export const UserForm = ({ className }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const changeFirstName = firstName => dispatch(userActions.setFirstName(firstName));
  const changeLastName = lastName => dispatch(userActions.setLastName(lastName));

  const handleFormSubmit = useCallback(
    e => {
      e.preventDefault();
    }
  );

  const handleFirstNameChange = useCallback(e => {
    const firstName = e.target.value;

    if (!/^[a-z]*$/i.test(firstName)) {
      e.preventDefault();

      return;
    }

    changeFirstName(firstName);
  });

  const handleLastNameChange = useCallback(e => {
    const lastName = e.target.value;

    if (!/^[a-z]*$/i.test(lastName)) {
      e.preventDefault();

      return;
    }

    changeLastName(lastName);
  });

  useDocumentTitle(`Hello, ${user.firstName} ${user.lastName}`);

  return (
    <UserFormContainer className={className}>
      <form onSubmit={handleFormSubmit}>
        <UserFormInputBlock>
          <label htmlFor="userFirstName">First name</label>
          <UserFormInput
            id="userFirstName"
            placeholder="Enter first name..."
            value={user.firstName}
            onChange={handleFirstNameChange}
          />
        </UserFormInputBlock>

        <UserFormInputBlock>
          <label htmlFor="userLastName">Last name</label>
          <UserFormInput
            id="userLastName"
            placeholder="Enter last name..."
            value={user.lastName}
            onChange={handleLastNameChange}
          />
        </UserFormInputBlock>
      </form>
    </UserFormContainer>
  );
};
