import {
  parseDate,
  Book,
} from "./util.js";


export default class DataTable {
  constructor() {
    // console.log(process.env.CONNECTION_PATH_REST, 'path');
    // this.libraryURL = `${process.env.CONNECTION_PATH_REST}/library`;
    this.libraryURL='http://localhost:3002'
    this.allBooks = [];
  }

  _init() {
    this._getAllBooks();
  }

  _bindEvents() {

    $('.star').on('click', window.gRateBook._rateBook);

    $('.delete').on('click', window.gDeleteBook._openDeleteModal);

    $('.edit').on('click', window.gEditBook._openEditModal);

    $('#sort-title').on('click', window.gSortBook._sortBy);
    $('#sort-author').on('click', window.gSortBook._sortBy);
    $('#sort-genre').on('click', window.gSortBook._sortBy);
    $('#sort-rating').on('click', window.gSortBook._sortBy);
  }

  _reload() {
    this._updateTable();
  }

  _getAllBooks() {
  // console.log("get all books");
    this._activateLoader();
    $.ajax({
      url: `${this.libraryURL}/library`,
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        if (data.length) {
          $('#display-data').empty();
          this.allBooks = data;
          this._reload();
        } else {
          $('#book-table').empty();
          const message = $('<h1>', { class: 'text-danger text-center' }).html('Your Library is Empty!  🙁');
          $('#book-table').append(message);
        }
      },
    });
  }

  _activateLoader() {
    const $thead = $('thead');
    $thead.empty();
    const $tbody = $('#table-body');
    $tbody.empty();
    const loader = $('<div>', { class: 'loader text-center' });
    $('#table-body').append(loader);
  }

  _updateTable() {
    const $tbody = $('#table-body');
    $tbody.empty();

    const $thead = $('thead');
    $thead.empty();

    const message = $('<h1>', { class: 'text-danger text-center' }).html('Your Library is Empty!  🙁');

    this.allBooks.length
      ? (
        $thead.append(this._createHeader())
        && $.each(this.allBooks, (index, book) => { $tbody.append(this._createRow(index, book));})
      )
      : $tbody.html(message);

    this._bindEvents();
  }

  ifNotLoggedIn() {
    const body = $('<div>', { class: 'h4 text-center' });
    const link = $('<a>', { href: '../public/login.html', class: 'u-link btn btn-outline-primary' }).text('Sign In');
    body.append(link);
    $('#randomBookModal').modal('show');
    $('#randomBookModal').find('.modal-body').html(body);
    $('#randomBookModal').find('.modal-title').html('Please sign-in to update your Library!');
  }

  _createHeader() {
    // eslint-disable-next-line
    const book = new Book();
    const tr = document.createElement('tr');

    // ************Number the rows*********
    const rowNumber = document.createElement('th');
    $(rowNumber).text('');
    $(tr).append(rowNumber);
    // ************************

    for (const key in book) {
      const th = document.createElement('th');
      const thAttr = document.createAttribute('scope');
      thAttr.value = 'col';
      th.setAttributeNode(thAttr);
      // ********Capitalize Columns names**********
      const keyName = key.split(/(?=[A-Z])/).join(' ');
      const headerName = keyName.charAt(0).toUpperCase() + keyName.substr(1);
      // ********************

      $(th).text(headerName);
      tr.append(th);

      if (key === 'synopsis') {
        $(th).hide();
      }
      if (key === 'deleteCol') {
        $(th).text('Delete');
      }
    }
    return tr;
  }

  _createRow(index, book) {
  // console.log("row created!");
    const tr = $('<tr>', { id: 'row', class: 'animated fadeIn' });
    const deleteIcon = $('<i>', {
      class: 'far fa-times-circle fa-lg delete',
      'data-title': book.title,
      'data-id': book._id,
    });
    const editIcon = $('<i>', {
      class: 'far fa-edit fa-lg edit',
      'data-title': book.title,
      'data-id': book._id,
    });
    const ratingList = $('<ul>', {
      class: 'stars w-100 d-flex flex-nowrap',
      id: 'ratingStar',
    });

    const rowNumber = $('<td>');
    $(rowNumber).text(index + 1);
    $(tr).append(rowNumber);

    // *** book cover cell
    // console.log(book, 'book');
    const bookImg = $('<img>', {
      class: 'coverToEdit',
      src: `${book.cover}`,
      alt: 'book cover',
    });
    // end book cover cell ***

    for (let i = 0; i < 5; i++) {
      const ratingItem = $('<li>', {
        class: 'star',
      });
      if (book.rating && book.rating > i) {
        $(ratingItem).addClass('selected');
      }
      const star = $('<i>', {
        class: 'fa fa-star',
        'data-id': book._id,
        'data-value': i + 1,
        'data-title': book.title,
      });
      const rating = $(ratingItem).append(star);
      $(ratingList).append(rating);
    }

    $(tr).append($('<td>').append(bookImg));
    $(tr).append($('<td>', { class: 'h5' }).append(book.title));
    $(tr).append($('<td>').append(book.author));
    $(tr).append($('<td>').append(book.genre));
    $(tr).append($('<td>').append(book.pages));
    $(tr).append($('<td>').append(parseDate(book.publishDate)));
    $(tr).append($('<td>').append(ratingList).addClass('rating-stars'));
    $(tr).append($('<td>', { class: 'text-center' }).append(deleteIcon));
    $(tr).append($('<td>', { class: 'text-center' }).append(editIcon));

    return tr;
  }

}
