import React from 'react'
import { Route } from 'react-router-dom';

import MainPage from './MainPage';
import './App.css'
import SearchPage from './SearchPage';


class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({ history }) => (
        <MainPage />
          
        )} />

        <Route path="/search" render={({ history }) => (
          <SearchPage />
        )} />

      </div >
    )
  }
}

export default BooksApp
