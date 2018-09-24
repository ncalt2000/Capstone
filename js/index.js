
var Library = (function() {
});

Library.prototype = {
  _handleEventTrigger: function(sEvent, oData) {
    var oData = oData || {}; //sets oData to an empty object if it does not have data
    // console.log(oData, 'Data');
    if (sEvent) {
      var event = new CustomEvent(sEvent, oData);
      // console.log(event, 'Event');
      document.dispatchEvent(event);
    }
  },

  setStorage: function(){
    localStorage.setItem("bookshelf", JSON.stringify(window.bookshelf));
  },

  getStorage: function() {
    window.bookshelf = new Array();
    var arr = JSON.parse(localStorage.getItem('bookshelf')) || [];

    for (var i = 0; i < arr.length; i++) {
      window.bookshelf.push(new Book(
        arr[i].cover,
        arr[i].title,
        arr[i].author,
        arr[i].genre,
        arr[i].pages,
        arr[i].publishDate,
        arr[i].rating,
        arr[i].deleteCol,
        arr[i].synopsis,
        arr[i].edit ))
    }
    return window.bookshelf;
  },

  addBook: function(book) {
    //Purpose: Add a book object to your books array.
    // Return: boolean true if it is not already added, false if it is already added.

    if (window.bookshelf.length === 0) {
      window.bookshelf.push(book);
      this.setStorage();
      this._handleEventTrigger("objUpdate", {booksAdded: "The book is added"});
      return true;
    }

    var bookExist = false;
    for (var i = 0; i < window.bookshelf.length; i++) {
      if (window.bookshelf[i]['title'] === book.title) {
        bookExist = true;
      }
    }

    if (bookExist) {
      return false
    } else {
      window.bookshelf.unshift(book);
      this.setStorage();
      this._handleEventTrigger("objUpdate", {booksAdded: "The book is added"});
      return true;
    }
  },

  removeBook: function(bookTitle) {
    // Purpose: Remove book from from the books array by its title.
    // Return:boolean true if the book(s) were removed, false if no books match
    var bookDeleted = false;
    for (var i=0; i<window.bookshelf.length; i++) {
      if (window.bookshelf[i]['title'].toLowerCase().indexOf(bookTitle.toLowerCase()) > -1) {
        bookDeleted = true;
        window.bookshelf.splice(i, 1)
      }
    }
    this.setStorage();
    this._handleEventTrigger("objUpdate", {bookDeleted: "Book is deleted!"});

    if (bookDeleted) {
      return true + " The book is deleted!"
    }
    return false + " The book is not found!";
  },

  removeBookByAuthor: function(authorName) {
    // Purpose: Remove a specific book from your books array by the author name.
    // Return: boolean true if the book(s) were removed, false if no books match
    var isDeleted = false;
    var deletedBooks = 0;
    for (var i = window.bookshelf.length - 1; i >= 0; i--) {
      if (window.bookshelf[i]['author'].toLowerCase().indexOf(authorName.toLowerCase()) > -1) {
        window.bookshelf.splice(i, 1);
        deletedBooks += 1;
        isDeleted = true;
        // this.setStorage();

      }
    }

    if (isDeleted && deletedBooks < 2) {
      return deletedBooks + " " + "book is deleted";
    } else if (isDeleted && deletedBooks > 1) {
      return true + " " + deletedBooks + " books are deleted"
    }
    return false + " Author is not found";
  },

  getRandomBook: function() {
    // Purpose: Return a random book object from your books array
    // Return: book object if you find a book, null if there are no books

    if (window.bookshelf.length === 0) {
      return "There are no books in the library"
    }
    var randomBook = window.bookshelf[Math.floor(Math.random() * window.bookshelf.length)];
    // localStorage.setItem("randomBook", JSON.stringify(randomBook))
    this.setStorage();
    return randomBook;
  },

  getBookByTitle: function(title) {
    // Purpose: Return all books that completely or partially matches the string title passed into the function
    // Return: array of book objects if you find books with matching titles, empty array if no books are found
    var result = window.bookshelf.filter(function(item) {
      return item.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
    })
    return result;
  },

  getBooksByAuthor: function(authorName) {
    // Purpose: Finds all books where the author’s name partially or completely match-es the authorName argument passed to the function.
    //Return:array of books if you find books with match authors, empty array if no books match.
    var result = window.bookshelf.filter(function(item) {
      return item.author.toLowerCase().indexOf(authorName.toLowerCase()) > -1;
    })
    return result;
  },

  addBooks: function(books) {
    // Purpose: Takes multiple books, in the form of an array of book objects, and adds the objects to your books array.
    // Return: number of books successfully added, 0 if no books were added
    var countNotAdded = 0;
    var count = 0;

    for (var i = 0; i < books.length; i++) {
      // use the same method
      var booksAdded = this.addBook(books[i]);
      // console.log(books[i], 'books[i]');
      // if (booksAdded === "Already exist") {
      //   countNotAdded += 1;
      // }
      // if (booksAdded === "The book is added!") {
      //   count += 1;
      // }

    }
    this._handleEventTrigger("objUpdate", {booksAdded: count + " books were added"});

    this.setStorage();
    return true;
  },

  getAuthors: function() {
    // Purpose: Find the distinct authors’ names from all books in your library, only 1 book by that author
    // Return: array of strings the names of all distinct authors, empty array if no books exist or if no authors exist
    var authors = JSON.parse(localStorage.getItem('bookshelf'))
    var resultArr = [];
    for (var i = 0; i < authors.length; i++) {
      resultArr.push(authors[i]['author']);
    }

    var finalArr = resultArr.reduce(function(a, b) {
      if (a.indexOf(b) < 0) {
        a.push(b)
      }
      return a;
    }, [])
    localStorage.setItem("allAuthors", JSON.stringify(finalArr));
    return finalArr;
  },

  getRandomAuthorName: function() {
    // Purpose: Retrieves a random author name from your books collection
    // Return: string author name, null if no books exist
    if (window.bookshelf.length === 0) {
      return null;
    }
    var randomAuthor = window.bookshelf[Math.floor(Math.random() * window.bookshelf.length)]
    localStorage.setItem("randomAuthor", JSON.stringify(randomAuthor))
    return randomAuthor.author;
  },

  search: function(searchValue) {
    // if the search term is Number, then it's asking for pages
    if (Number.isInteger(searchValue)) {
      var resultPages = window.bookshelf.filter(function(book) {
        return book.NumberOfPages >= searchValue
      })
      return resultPages;
    };

    var resultArr = window.bookshelf.filter(function(book) {
      var search = searchValue.toLowerCase();
      return book.title.toLowerCase().indexOf(search) > -1 || book.author.toLowerCase().indexOf(search) > -1 || book.publishDate >= search
    })
    return resultArr;
  }
  // this.getBookByTitle(searchValue);
  // this.getBooksByAuthor(searchValue);
};

// Create a Book object:
var Book = function(cover, title, author, genre, pages, publishDate, rating, deleteCol, synopsis, edit) {
  this.cover = cover;
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.publishDate = new Date(String(publishDate));
  this.rating = rating;
  this.deleteCol = deleteCol;
  this.synopsis = synopsis;
  this.edit = edit;
};
// var Book = function(args) {
//   this.cover = "cover";
//   this.title = args.title;
//   this.author = args.author;
//   this.genre = args.genre;
//   this.pages = args.pages;
//   this.publishDate = new Date(String(args.publishDate)).getUTCFullYear();
//   this.deleteCol = args.deleteCol;
//   this.synopsis = args.synopsis;
// };

// document.addEventListener('DOMContentLoaded', function() {
//   window.gLibrary = new Library();
// });
