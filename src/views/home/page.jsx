import React from 'react';

import { Header } from '@Components/header';
import { UserForm } from '@Views/home/user-form';

const HomePage = () => (
  <React.Fragment>
    <Header />
    <UserForm />
  </React.Fragment>
);

export { HomePage };
