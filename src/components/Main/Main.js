import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header/Header';
import UserListContainer from '../../containers/UserList/UserListContainer';

const Main = () => (
  <div>
    <Header />
    <UserListContainer />
  </div>
);

export default Main;