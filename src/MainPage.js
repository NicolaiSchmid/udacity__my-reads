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

export default class MainPage extends Component {
    state = {
        shelfs: {
            currentlyReading: [],
            wantToRead: [],
            read: [],
        },
    }

    componentDidMount() {
        this.fetchBooks();
    };

    fetchBooks = async () => {
        try {
            const books = await BooksAPI.getAll();
            this.setState({
                shelfs: {
                    currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
                    wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
                    read: books.filter((book) => book.shelf === 'read'),
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    updateBook = async (book, shelf) => {
        try {
            const newShelfs = await BooksAPI.update(book, shelf);
            this.fetchBooks();
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        let { currentlyReading, wantToRead, read } = this.state.shelfs;
        return (
            <div className="list-books" >
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {currentlyReading.map((book) => {
                                        return (
                                            <li key={book.id}>
                                                <BookComponent
                                                    meta={book}

                                                    update={this.updateBook}
                                                />
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {wantToRead.map((book) => {
                                        return (
                                            <li key={book.id}>
                                                <BookComponent
                                                    category='wantToRead'

                                                    meta={book}

                                                    update={this.updateBook}
                                                />
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {read.map((book) => {
                                        return (
                                            <li key={book.id}>
                                                <BookComponent
                                                    category='read'

                                                    meta={book}

                                                    update={this.updateBook}
                                                />
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div >
        )
    }
};
