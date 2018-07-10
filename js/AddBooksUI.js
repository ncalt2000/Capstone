// create a contructor: addBooksUI
var AddBooksUI = function(container){
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
AddBooksUI.prototype.init = function(){
  this._bindEvents();
  return;
};

// this opens the modal
// proxy is doing similar ot call(this)
AddBooksUI.prototype._bindEvents = function(){
  // add an id=''
  $('button#add-book-btn').on('click',
  $.proxy(this._handleModalOpen, this));

  $('button#add-another-btn').on('click', $.proxy(this._createBook, this));

  $('button#save-book-btn').on('click',
  $.proxy(this._saveBook, this));
};

// event handlers
AddBooksUI.prototype._handleModalOpen = function(){
  this.$container.modal('show');
  return;
}

AddBooksUI.prototype._createBook = function () {
  event.preventDefault();
  var title = $('#title-text').val();
  var author = $('#author').val();
  var genre = $('#genre').val();
  var pages = $('#pages').val();
  var publishDate = $('#publicationDate').val();
  var synopsis = $('#synopsis').val();
  var bookCover = $('#file-upload').val();

  var book = new Book(title, author, genre, pages, publishDate, synopsis, bookCover);
  // console.log(book, 'book');

  this._tempBookshelf.push(book);
  var $booksToAdd = $('<p>', {'class': 'booksToAdd'});
  $('.booksInLine').append($booksToAdd).text(`Books to be added: ${this._tempBookshelf.length}`);
  $('#add-book-form')[0].reset();
};

AddBooksUI.prototype._saveBook = function(){
  var title = $('#title-text').val();
  var author = $('#author').val();
  var genre = $('#genre').val();
  var pages = $('#pages').val();
  var publishDate = $('#publicationDate').val();
  var synopsis = $('#synopsis').val();
  var bookCover = $('#file-upload').val();

  var book = new Book(title, author, genre, pages, publishDate, synopsis, bookCover);

  if(this._tempBookshelf.length === 0){
    this.addBook(book);
  }
  this.addBooks(this._tempBookshelf);
  $('#add-book-form')[0].reset();
  location.reload();
};

AddBooksUI.prototype._displayBooks = function () {
  this.getStorage();
  for (var i = 0; i < this._bookshelf.length; i++) {
    let book = this._bookshelf[i];
    // console.log(book)
    $('#table-body').append(`
      <tr>
        <th scope="row">${i + 1}</th>
        <td><img class="img-thumbnail" src="assets/books/GGatsby.jpg" alt=""></td>
        <td data-toggle="modal" data-target="#synopsisModal">${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.publishDate}</td>
        <td>${book.numberOfPages}</td>
        <td class='rating-stars'>
          <ul class='stars'>
            <li class='star' data-value='1'>
              <i class='fa fa-star'></i>
            </li>
            <li class='star' data-value='2'>
              <i class='fa fa-star'></i>
            </li>
            <li class='star' data-value='3'>
              <i class='fa fa-star'></i>
            </li>
            <li class='star' data-value='4'>
              <i class='fa fa-star'></i>
            </li>
            <li class='star' data-value='5'>
              <i class='fa fa-star'></i>
            </li>
          </ul>
        </td>
        <td>
          <i class="far fa-edit fa-lg edit"></i>
          <i id="delete-icon" class="far fa-times-circle fa-lg delete"></i>
        </td>
      </tr>
    `);
  }
};


$(function(){
  window.gAddBooksUI = new AddBooksUI($('#addBookModal'));
  window.gAddBooksUI.init();
  window.gAddBooksUI._displayBooks();
});
