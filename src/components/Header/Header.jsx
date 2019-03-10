import React from 'react';
import { connect } from 'react-redux';

import styles from './styles/header.styl';

const Header = ({ firstName, lastName }) => (
  <header className={styles.header}>
    <p className={styles.headerGreeting}>Hello, { firstName } { lastName }</p>
  </header>
);

const mapStateToProps = ({ user }) => user;

export default connect(mapStateToProps, null)(Header);
