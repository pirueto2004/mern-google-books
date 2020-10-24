import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Container } from "../../components/Grid"
import { List, ListItem } from "../../components/List"
import BookBtn from "../../components/BookBtn"
import Jumbotron from "../../components/Jumbotron"
import API from "../../utils/API"

class Results extends Component {
  state = {
    books: [],
    target: "",
    noResults: false
  }

  componentDidMount() {
    const data = this.props.location.data
    if (data && data.results.length > 0) {
      this.setState({
        books: data.results.filter((value, index) => index < 5),
        target: "_blank"
      })
    } else {
      this.setState({
        noResults: true
      })
    }
  }

  saveBook = book => {
    API.saveBook(book)
      .then(res => {
        const currentBooks = this.state.books
        const filterBooks = currentBooks.filter(book => book.id !== res.data.id)
        this.setState({
          books: filterBooks
        })
      })
      .catch(err => console.log(err))
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
            <Link to="/">No results - click here to search again.</Link>
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
        <Container>
          <h2>Search Results</h2>
          <List>
            {this.state.books.map((book, index) => (
              <ListItem key={book.id}>
                <div className="date-div">
                  <a key={"" + index + book.id} href={book.volumeInfo.infoLink} target={this.state.target}>
                    {book.volumeInfo.title}
                  </a>
                  <p>Written By {book.volumeInfo.authors}</p>
                  <p>
                    {book.volumeInfo.imageLinks ? <img align="left" style={{ paddingRight: 10 }} src={book.volumeInfo.imageLinks.smallThumbnail} alt="new" /> : " "}
                    {/* <img align="left" style={{ paddingRight: 10 }} src={book.volumeInfo.imageLinks.smallThumbnail} alt="new" /> */}
                    {book.volumeInfo.description}
                  </p>
                </div>
                <div className="book-btn-div">
                  <BookBtn
                    key={"" + book.id + index}
                    btntype="info"
                    disabled={book.volumeInfo.infoLink === "/"}
                    onClick={() =>
                      this.saveBook({
                        title: book.volumeInfo.title,
                        author: book.volumeInfo.authors,
                        description: book.volumeInfo.description,
                        image: book.volumeInfo.imageLinks.smallThumbnail,
                        link: book.volumeInfo.infoLink,
                        _id: book.id
                      })
                    }
                  >
                    Save
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

export default Results
