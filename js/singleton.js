
var Library = (function() {
  // this creates a new private variable, that Library has a reference to
  var _bookshelf = new Array();

  // Methods:

  var addBook = function(book) {
    //Purpose: Add a book object to your books array.
    // Return: boolean true if it is not already added, false if it is already added.

    if (_bookshelf.length === 0) {
      _bookshelf.push(book);
      return "The book is added!";
    }

    var bookExist = false;
    for (var i = 0; i < _bookshelf.length; i++) {
      if (_bookshelf[i]['title'] === book.title) {
        bookExist = true;
      }
    }
    if (bookExist) {
      return "Already exist"
    } else {
      _bookshelf.push(book);
      return "The book is added"
    };
    return _bookshelf;
  };

  var removeBook = function(bookTitle) {
    // Purpose: Remove book from from the books array by its title.
    // Return:boolean true if the book(s) were removed, false if no books match

    var bookDeleted = false;
    for (var i = 0; i < _bookshelf.length; i++) {
      if (_bookshelf[i]['title'].toLowerCase() === bookTitle.toLowerCase()) {
        bookDeleted = true;
        _bookshelf.splice(i, 1)
      }
    }
    if (bookDeleted) {
      return true + " The book is deleted!"
    }
    return false + " The book is not found!";
  };

  var removeBookByAuthor = function(authorName) {
    // Purpose: Remove a specific book from your books array by the author name.
    // Return: boolean true if the book(s) were removed, false if no books match
    var isDeleted = false;
    var deletedBooks = 0;
    for (var i = _bookshelf.length - 1; i >= 0; i--) {
      if (_bookshelf[i]['author'].toLowerCase().indexOf(authorName.toLowerCase()) > -1) {
        _bookshelf.splice(i, 1);
        deletedBooks += 1;
        isDeleted = true;
      }
    }
    if (isDeleted && deletedBooks < 2) {
      return deletedBooks + " " + "book is deleted";
    } else if (isDeleted && deletedBooks > 1) {
      return true + " " + deletedBooks + " books are deleted"
    }
    return false + " Author is not found";
  };

  var getRandomBook = function() {
    // Purpose: Return a random book object from your books array
    // Return: book object if you find a book, null if there are no books

    if (_bookshelf.length === 0) {
      return "There are no books in the library"
    }
    var randomBook = _bookshelf[Math.floor(Math.random() * _bookshelf.length)];
    return randomBook;
  };

  var getBookByTitle = function(title) {
    // Purpose: Return all books that completely or partially matches the string title passed into the function
    // Return: array of book objects if you find books with matching titles, empty array if no books are found
    var result = _bookshelf.filter(function(item) {
      return item.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
    })
    return result;
  };

  var getBooksByAuthor = function(authorName) {
    // Purpose: Finds all books where the author’s name partially or completely match-es the authorName argument passed to the function.
    //Return:array of books if you find books with match authors, empty array if no books match.
    var result = _bookshelf.filter(function(item) {
      return item.author.toLowerCase().indexOf(authorName.toLowerCase()) > -1;
    })
    return result;
  };

  var addBooks = function(books) {
    // Purpose: Takes multiple books, in the form of an array of book objects, and adds the objects to your books array.
    // Return: number of books successfully added, 0 if no books were added
    var countNotAdded = 0;
    var count = 0;

    for (var i = 0; i < books.length; i++) {
      // use the same method
      var booksAdded = addBook(books[i]);
      if (booksAdded === "Already exist") {
        countNotAdded += 1;
      }
      if (booksAdded === "The book is added") {
        count += 1;
      }
    }
    return countNotAdded + " book(s) not added: already exist, " + count + " book(s) added!";
  };

  var getAuthors = function() {
    // Purpose: Find the distinct authors’ names from all books in your library, only 1 book by that author
    // Return: array of strings the names of all distinct authors, empty array if no books exist or if no authors exist
    var resultArr = [];
    for (var i = 0; i < _bookshelf.length; i++) {
      resultArr.push(_bookshelf[i]['author']);
    }
    console.log(resultArr, 'result Arr');

    var finalArr = resultArr.reduce(function(a, b) {
      if (a.indexOf(b) < 0) {
        a.push(b)
      }
      return a;
    }, [])

    return finalArr;
  };

  var getRandomAuthorName = function() {
    // Purpose: Retrieves a random author name from your books collection
    // Return: string author name, null if no books exist
    if (_bookshelf.length === 0) {
      return null;
    }
    var randomAuthor = _bookshelf[Math.floor(Math.random() * _bookshelf.length)]
    return randomAuthor.author;
  };

  var search = function(searchValue) {
    // if the search term is Number, then it's asking for pages
    if (Number.isInteger(searchValue)) {
      var resultPages = _bookshelf.filter(function(book) {
        return book.NumberOfPages >= searchValue
      })
      return resultPages;
    };

    var resultArr = _bookshelf.filter(function(book) {
      var search = searchValue.toLowerCase();
      return book.title.toLowerCase().indexOf(search) > -1 || book.author.toLowerCase().indexOf(search) > -1 || book.publishDate >= search
    })
    return resultArr;
  };

  return {
    bookshelf: _bookshelf,
    addBook: addBook,
    removeBook: removeBook,
    removeBookByAuthor: removeBookByAuthor,
    getRandomBook: getRandomBook,
    getBookByTitle: getBookByTitle,
    getBooksByAuthor: getBooksByAuthor,
    addBooks: addBooks,
    getAuthors: getAuthors,
    getRandomAuthorName: getRandomAuthorName,
    search: search
  }
}());

// Create a Book object:
var Book = function(title, author, pages, date) {
  this.title = title,
  this.author = author,
  this.numberOfPages = pages,
  this.publishDate = date
};

document.addEventListener('DOMContentLoaded', function() {
  window.book1 = new Book('Harry Potter: The Philosopher\'s Stone', 'J.Rowling', 234, '1997');
  window.book2 = new Book('IT', 'S.King', 197, 'December 25, 2006');
  window.book3 = new Book('War and Peace', 'L.Tolstoy', 1097, '1985');
  window.book4 = new Book('Javascript', 'J.Duckett', 797, '2006');
  window.book5 = new Book('JQuery', 'J.Duckett', 897, '2008');
  window.book6 = new Book('JQuery2', 'J.Duckett', 897, '2008');
  window.book7 = new Book('Carrie', 'S.King', 897, '2008');
  window.book8 = new Book('Evgeniy Onegin', 'A.Pushkin', 897, '1879');
  window.book9 = new Book('Harry Potter: The Chamber of Secrets', 'J.Rowling', 234, '1998');
  window.book10 = new Book('Harry Potter: The Prisoner of Azkaban', 'J.Rowling', 234, '1998');
  window.book11 = new Book('Harry Potter: The Goblet of Fire', 'J.Rowling', 234, '1999');
  window.book12 = new Book('Harry Potter: The Order of the Phoenix', 500, '2003')

});
