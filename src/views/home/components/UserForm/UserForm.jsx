import React, { useCallback } from 'react';
import { connect } from 'react-redux';
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

const UserForm = props => {
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

    props.changeFirstName(firstName);
  });

  const handleLastNameChange = useCallback(e => {
    const lastName = e.target.value;

    if (!/^[a-z]*$/i.test(lastName)) {
      e.preventDefault();

      return;
    }

    props.changeLastName(lastName);
  });

  useDocumentTitle(`Hello, ${props.firstName} ${props.lastName}`);

  return (
    <UserFormContainer>
      <form onSubmit={handleFormSubmit}>
        <UserFormInputBlock>
          <label htmlFor="userFirstName">First name</label>
          <UserFormInput
            id="userFirstName"
            placeholder="Enter first name..."
            value={props.firstName}
            onChange={handleFirstNameChange}
          />
        </UserFormInputBlock>

        <UserFormInputBlock>
          <label htmlFor="userLastName">Last name</label>
          <UserFormInput
            id="userLastName"
            placeholder="Enter last name..."
            value={props.lastName}
            onChange={handleLastNameChange}
          />
        </UserFormInputBlock>
      </form>
    </UserFormContainer>
  );
};

const mapStateToProps = ({ user }) => user;

const mapDispatchToProps = dispatch => ({
  changeFirstName(firstName) {
    dispatch(userActions.setFirstName(firstName));
  },
  changeLastName(lastName) {
    dispatch(userActions.setLastName(lastName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
