import React, { Component } from 'react';

export default class BookComponent extends Component {

    async moveTo(shelf) {
        await this.props.update({
            id: this.props.meta.id,
        }, shelf)
    }


    render() {
        console.log(this.props.meta);
        return (
            <div className="book">
                <div className="book-top">
                    {(this.props.meta.imageLinks.thumbnail) && (
                        <a target="_blank" href={this.props.meta.infoLink}>
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.meta.imageLinks.thumbnail}")` }}></div>
                        </a>
                    )}
                    <div className="book-shelf-changer">
                        <select defaultValue="moveTo" onInput={(event) => this.moveTo(event.target.value)}>
                            <option value="moveTo" disabled>Move to...</option>
                            {this.props.category !== 'currentlyReading' && (
                                <option value="currentlyReading">Currently Reading</option>
                            )}
                            {this.props.category !== 'wantToRead' && (
                                <option value="wantToRead">Want to Read</option>
                            )}
                            {this.props.category !== 'read' && (
                                <option value="read">Read</option>
                            )}
                            {this.props.category !== 'search' && (
                                <option value="none">None</option>
                            )}
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
