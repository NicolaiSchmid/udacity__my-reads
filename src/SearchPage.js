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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BookComponent from './BookComponent';

import * as BooksAPI from './BooksAPI';
import { search } from './BooksAPI';

export default class SearchPage extends Component {

    state = {
        query: '',
        books: [],
    }

    updateQuery = async (query) => {
        this.setState({
            query: query,
        });

        try {

            let searchResults = await BooksAPI.search(query);

            // Get shelf data
            searchResults = await Promise.all(searchResults.map(async (book) => {
                return await BooksAPI.get(book.id);
            }));

            this.setState({
                books: searchResults,
            });
        } catch (error) {
            // Clear books on search error
            this.setState({
                books: [],
            })
        }
    }

    updateBook = async (book, shelf) => {
        try {
            const newShelfs = await BooksAPI.update(book, shelf);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" />
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book) => {
                            return (
                                <li key={book.id}>
                                    <BookComponent
                                        category={book.shelf}

                                        meta={book}

                                        update={this.updateBook}
                                    />
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
};
