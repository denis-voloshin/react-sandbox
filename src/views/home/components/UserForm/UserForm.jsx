import React from 'react';
import { connect } from 'react-redux';

import * as userActions from '@Actions/userActions';
import { useDocumentTitle } from '@Utils/hooks';

import styles from './styles/styles.styl';

const UserForm = props => {
  const handleFormSubmit = e => {
    e.preventDefault();
  };

  const handleFirstNameChange = e => {
    const firstName = e.target.value;

    if (!/^[a-z]*$/i.test(firstName)) {
      e.preventDefault();

      return;
    }

    props.changeFirstName(firstName);
  };

  const handleLastNameChange = e => {
    const lastName = e.target.value;

    if (!/^[a-z]*$/i.test(lastName)) {
      e.preventDefault();

      return;
    }

    props.changeLastName(lastName);
  };

  useDocumentTitle(`Hello, ${props.firstName} ${props.lastName}`);

  return (
    <div className={styles.userForm}>
      <form onSubmit={handleFormSubmit}>
        <p className={styles.userFormBlock}>
          <label htmlFor="userFirstName">First name</label>
          <input
            type="text"
            id="userFirstName"
            placeholder="Enter first name..."
            value={props.firstName}
            onChange={handleFirstNameChange}
            className={styles.userFormBlockInput}
          />
        </p>

        <p className={styles.userFormBlock}>
          <label htmlFor="userLastName">Last name</label>
          <input
            type="text"
            id="userLastName"
            placeholder="Enter last name..."
            value={props.lastName}
            onChange={handleLastNameChange}
            className={styles.userFormBlockInput}
          />
        </p>
      </form>
    </div>
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
