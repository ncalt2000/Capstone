import { renderSuccessModal } from "./util.js";

export default class AddBooksUI {
  constructor() {
    this._tempBookshelf = new Array();
    this._encodedImg;
    this.libraryURL = 'http://localhost:3002'
  }

  _init() {
    this._bindEvents();
  }

  _bindEvents() {
    $('button#add-book-btn').on('click', this._handleModalOpen.bind(this));
    $('button#add-another-btn').on('click', this._bookInLine.bind(this));
    $('button#save-book-btn').on('click', this._saveBook.bind(this));
    $('button#cancelAdd').on('click', this._cancelAdd.bind(this));
    $('button#cancel-adding').on('click', this._cancelAdd.bind(this));
  }

  _cancelAdd() {
    $('#addBookModal').modal('hide');
    $('#title-text').removeClass('required');
    $('#author').removeClass('required');
    $('.booksInLine').empty();
    $('#add-book-form')[0].reset();
  }

  _handleModalOpen() {
    const isLoggedIn = window.gHome.isLoggedIn;
    if (isLoggedIn) {
      $('#addBookModal').modal('show');
    } else {
      window.gDataTable.ifNotLoggedIn();
    }
  }

  _getFieldsFromModal() {
    const fieldsData = $('#add-book-form').serializeArray();
    const oData = new Object();
    fieldsData.map(item => {
      oData[item.name] = item.value;
    });
    // console.log(oData, "book data 1");
    return oData;
  }

  _bookInLine() {
    // console.log('book in line');

    const bookData = this._getFieldsFromModal();
    // console.log(bookData, "book Data 2");
    const noBookCover = '../public/assets/books/noCover.jpg';

    if (bookData.title === '') {
      $('#title-text').addClass('required');
      const errorMessage = $('<p>', { class: 'text-danger' });
      errorMessage.text('Please complete missing fields');
      $('.booksInLine').html(errorMessage);
      return;
    }
    if (bookData.author === '') {
      $('#title-text').removeClass('required');
      $('#author').addClass('required');
      const errorMessage = $('<p>', { class: 'text-danger' });
      errorMessage.text('Please complete missing fields');
      $('.booksInLine').html(errorMessage);
      return;
    }

    $('#title-text').removeClass('required');
    $('#author').removeClass('required');

    const file = document.querySelector('#file-upload').files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      // console.log(reader, "READER");
      reader.onload = function () {
        // console.log(reader.result);
        bookData.cover = reader.result;
      };
    } else {
      bookData.cover = noBookCover;
    }

    let count = 0;
    for (let i = 0; i < window.gDataTable.allBooks.length; i++) {
      if (window.gDataTable.allBooks[i].title === bookData.title && window.gDataTable.allBooks[i].author === bookData.author) {
        $('#failure-modal').modal('show');
        $('#failure-modal').find('.modal-footer').html('This title and author already exist in the Library!');
        return count++;
      }
    }
    if (count === 0) {
      this._tempBookshelf.push(bookData);
    }
    const booksToAdd = $('<p>', { class: 'booksToAdd text-success' });
    booksToAdd.text(`Books to be added: ${this._tempBookshelf.length}`);
    $('.booksInLine').html(booksToAdd);
    $('#add-book-form')[0].reset();
  }

  _saveBook() {
    // console.log('before await');
    this._bookInLine();
    // console.log('after await');
    setTimeout(() => {
      // console.log(this._tempBookshelf, 'Temp Bookshelf');
      $.ajax({
        url: `${this.libraryURL}${'/library'}`,
        method: 'POST',
        dataType: 'json',
        headers: { 'x-access-token': sessionStorage.getItem('jwt_token') },
        data: { bookshelf: this._tempBookshelf },
        success: () => {
          window.gDataTable._getAllBooks();
          renderSuccessModal();

          this._tempBookshelf = new Array();
          $('#add-book-form')[0].reset();
          $('.booksInLine').empty();
          $('#addBookModal').modal('hide');
          // console.log(data, "log 2: back from DB");
        },
        error: () => {
          $('#failure-modal').modal('show');
          const errorMessage = $('<p>', { class: 'text-danger' });
          errorMessage.text('Oops! Something went wrong! Please try again!');
          $('#failure-modal').find('.modal-footer').html(errorMessage);
          $('.booksInLine').empty();
          this._tempBookshelf = new Array();
        },
      });
    }, 100);
  }

}
