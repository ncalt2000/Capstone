// create a contructor: addBooksUI
var AddBooksUI = function(container) {
  //placeholder for an id='addBooksModal'
  this.$container = container;
  // allow us to access anythign in the Library
  Library.call(this);
  // temp bookshelf is to hold multiple books, then pass it in addBooks function, and tie to Add btn.
  this._tempBookshelf = new Array();

};
// new instance of Library.prototype is created
AddBooksUI.prototype = Object.create(Library.prototype);
//data-target and data-value are removed from html. This will be added in js.

// init fires whatever is in the _bindEvents.
AddBooksUI.prototype.init = function() {
  this.getStorage();
  this._bindEvents();
  return;
};

// this opens the modal
// proxy is doing similar ot call(this)
AddBooksUI.prototype._bindEvents = function() {
  // add an id=''
  $('button#add-book-btn').on('click', $.proxy(this._handleModalOpen, this));

  $('button#add-another-btn').on('click', $.proxy(this._bookInLine, this));

  $('button#save-book-btn').on('click', $.proxy(this._saveBook, this));
};

// event handlers
AddBooksUI.prototype._handleModalOpen = function() {
  this.$container.modal('show');
  return;
}

AddBooksUI.prototype._createBook = function () {

};

AddBooksUI.prototype._bookInLine = function() {
  var title = $('#title-text').val();
  var author = $('#author').val();
  var genre = $('#genre').val();
  var pages = $('#pages').val();
  var publishDate = $('#publicationDate').val();
  var synopsis = $('#synopsis').val();
  var bookCover = $('#file-upload').val();
  var deleteCol = '';
  var edit = '';
  var rating = '';

  var book = new Book(bookCover, title, author, genre, pages, publishDate, rating, deleteCol, synopsis, edit);
  this._tempBookshelf.push(book);

  var $booksToAdd = $('<p>', {'class': 'booksToAdd'});
  $('.booksInLine').append($booksToAdd).text(`Books to be added: ${this._tempBookshelf.length}`);
  console.log(this._tempBookshelf, 'temp');
  $('#add-book-form')[0].reset();
};

AddBooksUI.prototype._saveBook = function() {
  var title = $('#title-text').val();
  var author = $('#author').val();
  var genre = $('#genre').val();
  var pages = $('#pages').val();
  var publishDate = $('#publicationDate').val();
  var synopsis = $('#synopsis').val();
  var bookCover = $('#file-upload').val();
  var deleteCol = '';
  var edit = '';
  var rating = '';

  var book = new Book(bookCover, title, author, genre, pages, publishDate, rating, deleteCol, synopsis, edit);


  // ************Validation of fields **************
  $('#title-text').blur(function(){
    console.log('validation');
    if(!$(this).val() ) {
      console.log(this, 'this in validation');
    $('#title-text').addClass('warning');
    }
  });
  // ********************************
  // check for empty fields:
  // var requiredInput = [];
  // var requiredFields = $('input[required]'); //object
  // // console.log(requiredFields, 'req');
  // for (var key in requiredFields) {
  //   requiredInput.push($(requiredFields[key]).val())
  //   console.log(requiredInput, 'input');
  // }
  //
  // for (var i = 0; i < requiredInput.length; i++) {
  //   if (requiredInput[i] === '') {
  //     return alert('add text!')
  //   }
  // }

  if(this._tempBookshelf.length === 0){
    var result = this.addBook(book);
    if(result){
      console.log(result);
      $('#book-table').append('<div class="gfyitem" data-id=QuaintLikelyFlyingfish></div><p><a href="https://gfycat.com/gifs/detail/QuaintLikelyFlyingfish">via Gfycat</a>t</p>');
    }
  }
  this.addBooks(this._tempBookshelf);
  $('#add-book-form')[0].reset();
  this._tempBookshelf = new Array();
};

$(function() {
  window.gAddBooksUI = new AddBooksUI($('#addBookModal'));
  window.gAddBooksUI.init();
});
