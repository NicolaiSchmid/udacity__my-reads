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

export default class BookComponent extends Component {

    async moveTo(shelf) {
        await this.props.update({
            id: this.props.meta.id,
        }, shelf)
    }


    render() {
        console.log(this.props);
        return (
            <div className="book">
                <div className="book-top">
                    {(this.props.meta.imageLinks.thumbnail) && (
                        <a target="_blank" href={this.props.meta.infoLink}>
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.meta.imageLinks.thumbnail}")` }}></div>
                        </a>
                    )}
                    <div className="book-shelf-changer">
                        <select defaultValue={this.props.meta.shelf || 'moveTo'} onInput={(event) => this.moveTo(event.target.value)}>
                            <option value="moveTo" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>

                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <a target="_blank" href={this.props.meta.infoLink}>
                    <div className="book-title">{this.props.meta.title}</div>
                </a>

                {(this.props.meta.authors) && this.props.meta.authors.map((author, index) => {
                    return (
                        <div key={index} className="book-authors">{author}</div>
                    )
                })}
            </div>
        )
    }
};
