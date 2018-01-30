/**
 * @license
 * Copyright 2017 Nicolai Schmid All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
