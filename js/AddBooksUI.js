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

// *********************
  // new stuff
  //create table body
  // var tbody = document.createElement('tbody');
  // //for elements returned from getAuthors create an <li> with text from getAuthors
  // for (var i = 0; i < this._bookshelf.length; i++) {
  //   let book = this._bookshelf[i];
  //   //create element
  //   var tr = document.createElement('tr');
  //   var th = document.createElement('th');
  //   var cover = document.createElement('td');
  //   var coverImage = document.createElement('img');
  //   var title = document.createElement('td');
  //   var author = document.createElement('td');
  //   var genre = document.createElement('td');
  //   var publishDate = document.createElement('td');
  //   var numberOfPages = document.createElement('td');
  //   var ratings = document.createElement('td');
  //   var ratingsList = document.createElement('ul');
  //   var buttons = document.createElement('td');
  //   //add text
  //   $(th).attr('scope', 'row').text(i+1);
  //   $(coverImage)
  //     .attr('class', 'img-thumbnail')
  //     .attr('src', 'assets/books/GGatsby.jpg');
  //   $(title).text(book.title);
  //   $(author).text(book.author);
  //   $(genre).text(book.genre);
  //   $(ratings).attr('class', 'rating-stars');
  //   $(ratingsList).attr('class', 'stars');
  //   $(publishDate).text(book.publishDate);
  //   $(numberOfPages).text(book.publishDate);
  //   //append to ul element
  //   tr.append(th);
  //   tr.append(cover);
  //   cover.append(coverImage);
  //   tr.append(title);
  //   tr.append(author);
  //   tr.append(genre);
  //   tr.append(publishDate);
  //   tr.append(numberOfPages);
  //   tr.append(ratings);
  //   tr.append(buttons);
  //   tbody.append(tr);
  // }
  // $('#book-table').append(tbody);
  // return tbody;
  // *******************

  for (var i = 0; i < this._bookshelf.length; i++) {
    let book = this._bookshelf[i];
    // console.log(book)
    $('#table-body').append(`
      <tr>
        <th scope="row">${i+1}</th>
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
        <td id="edit-delete">
          <i class="far fa-edit fa-lg edit" ></i>
          <i class="far fa-times-circle fa-lg delete" data-title=${book.title}></i>
        </td>
      </tr>
    `)
  }
};


$(function(){
  window.gAddBooksUI = new AddBooksUI($('#addBookModal'));
  window.gAddBooksUI.init();
  window.gAddBooksUI._displayBooks();
});
