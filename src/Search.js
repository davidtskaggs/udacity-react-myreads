import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import escapeRegExp from 'escape-string-regexp'
import { Link } from 'react-router-dom'

class Search extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired
  }

  state = {
    query: '',
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  showSearchResults = (book) => {
    this.setState((state) => ({
      books: state.books.filter((b) => b.name !== book.name)
    }))
  }

  render() {
    const { books } = this.props
    const { query } = this.state
    let showResults

    if (query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showResults = books.filter((book) => match.test(book.name))
    }

    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showResults = this.props.books.filter((book) => match.test(book.name))
    } else {
      showResults = this.props.books
    }
    return(

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" exact to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}

            <input
              type="text"
              placeholder="Search by title or author"
              value={(query)}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
            {/* Remove JSON.stringify line after finished debugging */}
            {JSON.stringify(query)}
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
          <ListBooks
            books={this.state.books} 
          />
        </div>
      </div>
    )
  }
}

export default Search;
