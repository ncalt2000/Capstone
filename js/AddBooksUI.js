class AddBooksUI {
  constructor() {
    //placeholder for an id='addBooksModal'
    // allow us to access anythign in the Library
    // Library.call(this);
    // temp bookshelf is to hold multiple books, then pass it in addBooks function, and tie to Add btn.
    this._tempBookshelf = new Array();
    this._encodedImg;
    this.libraryURL = 'http://127.0.0.1:3002/library/'
  }

// new instance of Library.prototype is created
// AddBooksUI.prototype = Object.create(Library.prototype);
//data-target and data-value are removed from html. This will be added in js.

// init fires whatever is in the _bindEvents.
_init() {
  this._bindEvents();
};

// this opens the modal
// proxy is doing similar ot call(this)
_bindEvents() {
  // add an id=''
  $('button#add-book-btn').on('click', this._handleModalOpen.bind(this));

  $('button#add-another-btn').on('click', this._bookInLine.bind(this));

  $('button#save-book-btn').on('click', this._saveBook.bind(this));
};

_handleModalOpen() {
  $('#addBookModal').modal('show');
}

_getBookFields() {
  let fieldsData = $('#add-book-form').serializeArray();
  let oData = new Object();
  fieldsData.map((item, index) => {
    oData[item.name] = item.value;
  })
  // console.log(oData, "DATA");
  return oData;
};

_bookInLine() {
  const bookData = this._getBookFields();
  bookData["rating"] = 1;
  // console.log(bookData, 'BookData');

  if (bookData.title === "") {
      $('#title-text').addClass('required animated pulse');
      return;
  }
  if (bookData.author === "") {
    $('#title-text').removeClass('required');
    $('#author').addClass('required animated pulse');
    return;
  }
  $('#title-text').removeClass('required');
  $('#author').removeClass('required');
 //   this._tempBookshelf.push(book);
  this._tempBookshelf.push(bookData);
  // console.log(this._tempBookshelf, "TEMP SHelf");
  var $booksToAdd = $('<p>', {'class': 'booksToAdd'});
    $('.booksInLine').append($booksToAdd).text(`Books to be added: ${this._tempBookshelf.length}`);
    $('#add-book-form')[0].reset();
};

_saveBook() {
  const bookData = this._getBookFields();
  bookData["rating"] = 1;
  // console.log(bookData, 'BookData');
  if(bookData.title === ""){
    $('#title-text').addClass('required animated pulse');
    return;
  }

  if(bookData.author === ""){
    $('#title-text').removeClass('required');
    $('#author-text').addClass('required animated pulse');
    return;
  }
  this._tempBookshelf.push(bookData);

  $.ajax({
    url: this.libraryURL,
    method: 'POST',
    dataType: 'json',
    data: {bookshelf: this._tempBookshelf}, //this is our request
    success: (data) => { //this is the response from DB
      gDataTable._getAllBooks();
      // console.log(data, "Success");;
    }
  })
  $('#add-book-form')[0].reset();
  $('#addBookModal').modal('hide');
};

  // createBook = function() {
  //
  //   if (title === "") {
  //     $('#title-text').addClass('required animated pulse');
  //     return;
  //   }
  //   if (author === "") {
  //     $('#title-text').removeClass('required');
  //     $('#author').addClass('required animated pulse');
  //     return;
  //   }
  //
  //   var book = new Book(bookCover, title, author, genre, pages, publishDate, rating, deleteCol, synopsis, edit);
  //   $('#title-text').removeClass('required');
  //   $('#author').removeClass('required');
  //   this._tempBookshelf.push(book);
  //
  //   var $booksToAdd = $('<p>', {'class': 'booksToAdd'});
  //   $('.booksInLine').append($booksToAdd).text(`Books to be added: ${this._tempBookshelf.length}`);
  //   $('#add-book-form')[0].reset();
  // }.bind(this);
  //
  // var file = document.querySelector('#file-upload').files[0];
  // var reader = new FileReader();
  // console.log(reader);
  //
  // if (file) {
  //   reader.readAsDataURL(file);
  //   reader.onload = function() {
  //     console.log(reader.result);
  //     bookCover = reader.result;
  //     createBook();
  //   };
  // } else {
  //   bookCover = noCover;
  //   createBook();
  // }

// _getBase64 = function (callback) {
//   var file = document.querySelector('#file-upload').files[0];
//   var reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = function() {
//     return this._encodedImg = reader.result;
//   };
// };

saveBook() {
  var title = $('#title-text').val();
  var author = $('#author').val();
  var genre = $('#genre').val();
  var pages = $('#pages').val();
  var publishDate = $('#publicationDate').val();
  var synopsis = $('#synopsis').val();
  var bookCover;
  var deleteCol = '';
  var edit = '';
  var rating = '1';
  var noCover = '../assets/books/noCover.jpg';

  createBook = function() {
    if (title === "") {
      $('#title-text').addClass('required animated pulse');
      return;
    }
    if (author === "") {
      $('#title-text').removeClass('required');
      $('#author').addClass('required animated pulse');
      return;
    }
    var book = new Book(bookCover, title, author, genre, pages, publishDate, rating, deleteCol, synopsis, edit);

    var addSuccessful = this._tempBookshelf.length > 0
      ? this.addBooks(this._tempBookshelf) && this.addBook(book)
      : this.addBook(book);
    if (addSuccessful) {
      $('#title-text').addClass('new-book');
      $('#title-text').removeClass('required');
      $('#author').removeClass('required');
      $('#success-modal').modal('show');
      setTimeout(function() {
        $('#success-modal').removeClass('zoomIn');
        $('#success-modal').addClass('zoomOut');
      }, 1000);
      setTimeout(function() {
        $('#success-modal').modal('hide');
        $('#success-modal').removeClass('zoomOut');
        $('#success-modal').addClass('zoomIn');
      }, 1500);
    }
    $('#add-book-form')[0].reset();
    $('#addBookModal').modal('hide');
    $('.booksInLine').empty();
    this._tempBookshelf = new Array();
  }.bind(this);

  var file = document.querySelector('#file-upload').files[0];
  var reader = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
    reader.onload = function() {
      // console.log(reader.result);
      bookCover = reader.result;
      createBook();
    };
  } else {
    bookCover = noCover;
    createBook();
  }
};
};


$(function() {
  window.gAddBooksUI = new AddBooksUI();
  window.gAddBooksUI._init();
});
