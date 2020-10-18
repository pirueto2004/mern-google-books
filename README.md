# mern-google-books

React-based Google Books Search app

Mern Google Books Search is a MERN stack application, utilizing MongoDB, Express, React, and Node.

This full-stack application allows the user to utilize the Google Books API to look up books they're interested in, save to the database, and view their page on the Google Books website.

# Getting Started

Start the app on development mode on the command line just type 'npm run start'
To create a production build, use 'npm run build'

# Code

The application utilizes react-router-dom to load React components according to the path hit on the webpage. This allows us to render seperate pages in a React application.

```jsx
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/saved" component={Saved} />
          </Switch>
        </div>
      </Router>
    )
  }
}
```

This snippet of code handles the obtaining and storing of input values and submits them generate a search query to the `Google Books API`. (These methods are properties of our input form.)

```jsx
handleInputChange = event => {
  const { name, value } = event.target
  this.setState({
    [name]: value
  })
}

handleFormSubmit = event => {
  event.preventDefault()
  API.getGoogleSearchBooks(this.state.title)
    .then(res => {
      this.setState({
        results: res.data.items
      })
    })
    .catch(err => {
      throw err
    })
}
```

This is the event handler for saving a book to the database. It obtains the id appended to the save button pertaining to the book served up from the previous `GET` request. This then allows us to filter that specific book from the results rendered, store that data into a JSON object, and `POST` it to our database.

```jsx
 handleSaveBook = event => {
        event.preventDefault();

        const bookID = event.target.getAttribute('data-id')

        const newState = {...this.state}

        let targetBook = this.state.results.filter(book => book.id === bookID)
        // Parses out book data from results by book id

        const newBook = {
            title: targetBook[0].volumeInfo.title,
            authors: targetBook[0].volumeInfo.authors,
            description: targetBook[0].volumeInfo.description,
            image: targetBook[0].volumeInfo.imageLinks.thumbnail,
            link: targetBook[0].volumeInfo.infoLink
        }
        // Instantiates new object formatted per the db schema.

        if (this.state.books[bookID]) {
            console.log(`You've already saved that book.`)
            return

        } else {
            newState.books[bookID] = newBook

            this.setState(newState)
            // Mutates state to now hold saved books in this.state.books
            console.log('Updated this.state:', this.state.books)

            API.saveBook({
                title: targetBook[0].volumeInfo.title,
                authors: targetBook[0].volumeInfo.authors,
                description: targetBook[0].volumeInfo.description,
                image: targetBook[0].volumeInfo.imageLinks.thumbnail,
                link: targetBook[0].volumeInfo.infoLink
            })
```

---

## Technologies Used

|      Technologies Used       |                                      |
| :--------------------------: | :----------------------------------- |
|        Bootstrap CSS         | https://getbootstrap.com/            |
|             CSS3             |                                      |
|             Git              | https://git-scm.com/                 |
|            GitHub            | https://github.com/                  |
|       Google Books API       | https://developers.google.com/books/ |
|            Heroku            | https://www.heroku.com               |
|            HTML5             |                                      |
|          JavaScript          |                                      |
|             JSX              |                                      |
|  mLab (MongoDB for Heroku)   | https://www.mlab.com/                |
|           MongoDB            | https://www.mongodb.com/             |
|           Mongoose           | https://mongoosejs.com/              |
|           Node.js            | https://nodejs.org/                  |
| Node Package Manager `(NPM)` | https://npmjs.com/                   |
|           ReactJS            | https://github.com/facebook/react    |

---
