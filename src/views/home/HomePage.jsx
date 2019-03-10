import React from 'react';

import { Header } from '@Components/Header';
import { UserForm } from '@Views/home/components/UserForm';

const HomePage = () => (
  <React.Fragment>
    <Header />
    <UserForm />
  </React.Fragment>
);

export { HomePage };
