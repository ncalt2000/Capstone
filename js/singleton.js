$(document).ready(function() {
  /* 1. Visualizing things on Hover - See next part for action on click */
  $('.stars li').on('mouseover', function() {
    var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
    // console.log(onStar, 'first');

    // Now highlight all the stars that's not after the current hovered star
    $(this).parent().children('.star').each(function(e) {
      if (e < onStar) {
        $(this).addClass('hover');
      } else {
        $(this).removeClass('hover');
      }
    });

  }).on('mouseout', function() {
    $(this).parent().children('li.star').each(function(e) {
      $(this).removeClass('hover');
    });
  });

  /* 2. Action to perform on click */
  $('.stars li').on('click', function() {
    var onStar = parseInt($(this).data('value'), 10); // The star currently selected
    // console.log(onStar, 'onStar');

    var stars = $(this).parent().children('li.star');

    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }

    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
  });
  // Enable tooltips everywhere
  $(function() {
    $('[data-toggle="tooltip"]').tooltip()
  });
});

var Library = (function() {
  this._bookshelf = new Array();
});

Library.prototype = {

  getStorage: function() {
    var arr = JSON.parse(localStorage.getItem('bookshelf')) || [];
    // console.log(this, 'this');
    return this._bookshelf = arr;
  },

  addBook: function(book) {
    //Purpose: Add a book object to your books array.
    // Return: boolean true if it is not already added, false if it is already added.
    if (this._bookshelf.length === 0) {
      this._bookshelf.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(this._bookshelf))
      return "The book is added!";
    }

    var bookExist = false;
    for (var i = 0; i < this._bookshelf.length; i++) {
      if (this._bookshelf[i]['title'] === book.title) {
        bookExist = true;
      }
    }
    if (bookExist) {
      return "Already exist"
    } else {
      this._bookshelf.unshift(book);
      return "The book is added!"
    };
    localStorage.setItem("bookshelf", JSON.stringify(this._bookshelf));
    // this.getStorage();
    // this.displayBooks();
    return this._bookshelf;

  },

  removeBook: function(bookTitle) {
    // Purpose: Remove book from from the books array by its title.
    // Return:boolean true if the book(s) were removed, false if no books match
    var bookshelf = this.getStorage();
    var bookDeleted = false;
    for (var i = 0; i < bookshelf.length; i++) {
      if (bookshelf[i]['title'].toLowerCase().indexOf(bookTitle.toLowerCase()) > -1) {
        bookDeleted = true;
        bookshelf.splice(i, 1)
        localStorage.setItem("bookshelf", JSON.stringify(bookshelf))
      }
    }
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
    for (var i = this._bookshelf.length - 1; i >= 0; i--) {
      if (this._bookshelf[i]['author'].toLowerCase().indexOf(authorName.toLowerCase()) > -1) {
        this._bookshelf.splice(i, 1);
        deletedBooks += 1;
        isDeleted = true;
        localStorage.setItem("bookshelf", JSON.stringify(this._bookshelf))
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

    if (this._bookshelf.length === 0) {
      return "There are no books in the library"
    }
    var randomBook = this._bookshelf[Math.floor(Math.random() * this._bookshelf.length)];
    localStorage.setItem("randomBook", JSON.stringify(randomBook))
    return randomBook;
  },

  getBookByTitle: function(title) {
    // Purpose: Return all books that completely or partially matches the string title passed into the function
    // Return: array of book objects if you find books with matching titles, empty array if no books are found
    var result = _bookshelf.filter(function(item) {
      return item.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
    })
    return result;
  },

  getBooksByAuthor: function(authorName) {
    // Purpose: Finds all books where the author’s name partially or completely match-es the authorName argument passed to the function.
    //Return:array of books if you find books with match authors, empty array if no books match.
    var result = this._bookshelf.filter(function(item) {
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
      if (booksAdded === "Already exist") {
        countNotAdded += 1;
      }
      if (booksAdded === "The book is added!") {
        count += 1;
      }
    }
    localStorage.setItem("bookshelf", JSON.stringify(this._bookshelf))
    return countNotAdded + " book(s) already exist, " + count + " book(s) added!";
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
    if (this._bookshelf.length === 0) {
      return null;
    }
    var randomAuthor = this._bookshelf[Math.floor(Math.random() * this._bookshelf.length)]
    localStorage.setItem("randomAuthor", JSON.stringify(randomAuthor))
    return randomAuthor.author;
  },

  search: function(searchValue) {
    // if the search term is Number, then it's asking for pages
    if (Number.isInteger(searchValue)) {
      var resultPages = this._bookshelf.filter(function(book) {
        return book.NumberOfPages >= searchValue
      })
      return resultPages;
    };

    var resultArr = this._bookshelf.filter(function(book) {
      var search = searchValue.toLowerCase();
      return book.title.toLowerCase().indexOf(search) > -1 || book.author.toLowerCase().indexOf(search) > -1 || book.publishDate >= search
    })
    return resultArr;
  }
  // this.getBookByTitle(searchValue);
  // this.getBooksByAuthor(searchValue);
};

// Create a Book object:
var Book = function(title, author, genre, pages, date, synopsis, cover) {
  this.title = title,
  this.author = author,
  this.genre = genre,
  this.numberOfPages = pages,
  this.publishDate = new Date(),
  this.synopsis = synopsis,
  this.cover = cover
};

var book1 = new Book('Harry Potter: The Philosopher\'s Stone', 'J.Rowling', 'Drama', 234, '12-01-1997');
var book2 = new Book('IT', 'S.King', 'Drama', 197, '12-01-2006');
var book3 = new Book('War and Peace', 'L.Tolstoy', 'Drama', 1097, '12-01-1985');
var book4 = new Book('Javascript', 'J.Duckett', 'Drama', 797, '12-01-2006');
var book5 = new Book('JQuery', 'J.Duckett', 'Drama', 897, '12-01-2008');
var book6 = new Book('JQuery2', 'J.Duckett', 'Drama', 897, '12-01-2008');
var book7 = new Book('Carrie', 'S.King', 'Drama', 897, '12-01-2008');
var book8 = new Book('Evgeniy Onegin', 'A.Pushkin', 'Drama', 897, '12-01-1879');
var book9 = new Book('Harry Potter: The Chamber of Secrets', 'J.Rowling', 'Drama', 234, '12-01-1998');
var book10 = new Book('Harry Potter: The Prisoner of Azkaban', 'J.Rowling', 'Drama', 234, '12-01-1998');
var book11 = new Book('Harry Potter: The Goblet of Fire', 'J.Rowling', 'Drama', 234, '12-01-1999');
var book12 = new Book('Harry Potter: The Order of the Phoenix', 'J.Rowling', 'Drama', 500, '12-01-2003')

document.addEventListener('DOMContentLoaded', function() {
  window.gLibrary = new Library();
});
