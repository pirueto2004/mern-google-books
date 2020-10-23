import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Container } from "../../components/Grid"
import { List, ListItem } from "../../components/List"
import Jumbotron from "../../components/Jumbotron"
import API from "../../utils/API"
import BookBtn from "../../components/BookBtn"

class Saved extends Component {
  state = {
    books: [],
    target: "",
    noResults: false
  }

  componentDidMount() {
    this.getSavedBooks()
  }

  getSavedBooks = () => {
    API.getSavedBooks()
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            books: res.data,
            target: "_blank"
          })
          console.log("books:", this.state.results)
        } else {
          this.setState({
            noResults: true
          })
        }
      })
      .catch(err => console.log(err))
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.getSavedBooks())
      .catch(err => console.log(err))
  }

  handleView(link) {
    alert("Great Shot!")
  }

  render() {
    if (this.state.noResults) {
      return (
        <div>
          <Jumbotron>
            <h1 className="card-title h1">React-Based Google Books Search App</h1>
            <h5 className="blue-grey-text my-4 font-weight-normal">Search for and annotate books of interest.</h5>
            <hr className="my-4" />
            <div className="lead my-2">
              <Link className="btn btn-default btn-lg" to="/" role="button">
                New Search
              </Link>
              <Link className="btn btn-secondary btn-lg" to="/saved" role="button">
                Saved Books
              </Link>
            </div>
          </Jumbotron>
          <Container>
            <Link to="/">You have no saved books. Click here to find some.</Link>
          </Container>
        </div>
      )
    }
    return (
      <div>
        <Jumbotron>
          <h1 className="card-title h1">React-Based Google Books Search App</h1>
          <h5 className="blue-grey-text my-4 font-weight-normal">Search for and save books of interest.</h5>
          <hr className="my-4" />
          <div className="lead my-2">
            <Link className="btn btn-default btn-lg" to="/" role="button">
              New Search
            </Link>
            <Link className="btn btn-secondary btn-lg" to="/saved" role="button">
              Saved Books
            </Link>
          </div>
        </Jumbotron>
        <Container className="mt-4">
          <h2>Your Saved Books</h2>
          <List>
            {this.state.books.map(book => (
              <ListItem key={book._id}>
                <div className="date-div">
                  <a key={book._id + "link"} href={book.link} target={this.state.target}>
                    {book.title}
                  </a>
                  <p>Written By {book.author}</p>
                  <p>
                    <img align="left" style={{ paddingRight: 10 }} src={book.image} alt="new" />
                    {book.description}
                  </p>
                </div>

                <div className="book-btn-div">
                  <a key={book._id + "link"} href={book.link} target={this.state.target} role="button" rel="noopener noreferrer" className="btn btn-info book-btn">
                    View Book
                  </a>
                </div>
                <div className="book-btn-div">
                  <BookBtn key={book._id + "btn"} btntype="danger" id={book._id} disabled={book.link === "/"} onClick={() => this.deleteBook(book._id)}>
                    Delete
                  </BookBtn>
                </div>
              </ListItem>
            ))}
          </List>
        </Container>
      </div>
    )
  }
}

export default Saved
