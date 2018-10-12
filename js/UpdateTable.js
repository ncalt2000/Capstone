class DataTable {
  constructor() {
    this.libraryURL = 'http://127.0.0.1:3002/library/'
    this.allBooks = [];
    const bookId = null;
  }

_init () {
  // when the page initially loads
  this._getAllBooks();
  this._bindCustomListeners();
};

_getGlobalBooks(){
  //make this.allBooks available in other classes
  //and avoid making another API call
  return this.allBooks;
}

_reload () {
  this._updateTable();
  this._bindEvents();
};

_bindEvents () {
  $('.delete').on('click', this._openDeleteModal.bind(this));
  $('.edit').on('click', this._openEditModal.bind(this));
  $('.star').on('click', this._rateBook.bind(this));

};

_bindCustomListeners () {
  $('#confirm-cancel-btn').on('click', this._closeModalOnCancel.bind(this));
  $('#confirm-delete-btn').on('click', this._confirmDeleteBook.bind(this));
  $('#save-edit-btn').on('click', this._editBook.bind(this));

  $("#sort-title").on('click', this._sortBy.bind(this));
  $("#sort-author").on('click', this._sortBy.bind(this));
  $("#sort-genre").on('click', this._sortBy.bind(this));
  $("#sort-rating").on('click', this._sortBy.bind(this));
};

_closeModalOnCancel () {
  $('.confirm-delete-text').empty();
  $('#confirm-delete-modal').modal('hide')
};

_getAllBooks(){
  console.log("get all books");
  this._activateLoader();
  $.ajax({
    url: this.libraryURL,
    method: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data.length){
        $('#display-data').empty();
        this.allBooks = data;
        console.log('get all books success');
        // console.log(this.allBooks, 'All Books from DB');
        this._reload();
      } else{
        $('#book-table').empty();
        var message = $('<h1>', {class: 'text-danger text-center' }).html("Your Library is Empty!  🙁")
        $('#book-table').append(message);
      }
    }
  })
}

_activateLoader(){
  var $thead = $('thead');
  $thead.empty();
  var $tbody = $('#table-body');
  $tbody.empty();
  var loader = $('<div>', {class: 'loader text-center'})
  $('#table-body').append(loader);
}

_updateTable () {
  console.log('update table');
  var $tbody = $('#table-body');
  $tbody.empty();

  var $thead = $('thead');
  $thead.empty();

  var message = $('<h1>', {class: 'text-danger text-center' }).html("Your Library is Empty!  🙁")

  this.allBooks.length
  ? (
    $thead.append(this._createHeader()) &&
    $.each(this.allBooks, (index, book) => {
      $tbody.append(this._createRow(index, book))
    })
    )
  : $tbody.html(message);

};

ifNotLoggedIn(){
  const body = $('<div>', {'class': 'h4 text-center'})
  const link = $('<a>', {href: '../login.html', class: 'u-link btn btn-outline-primary'}).text('Sign In');
  body.append(link);
  $('#randomBookModal').modal('show');
  $('#randomBookModal').find('.modal-body').html(body);
  $('#randomBookModal').find('.modal-title').html('Please sign-in to alter your Library!')
}

_openDeleteModal (e) {
  let isLoggedIn = window.gHome.isLoggedIn;
  if (isLoggedIn){
    this.bookId = $(e.target).data('id');
    const _titleToDelete = $(e.target).data('title');
    let deleteText = $('<p>', {id: 'delete-text'});
    deleteText.html(`Are you sure you want to delete ${_titleToDelete}?`)
    let confirmDeleteText = $('.confirm-delete-text').append(deleteText)
    $('#confirm-delete-modal').modal('show');
  } else {
    this.ifNotLoggedIn();
  };
}

_openEditModal (e) {
  let isLoggedIn = window.gHome.isLoggedIn;
  if (isLoggedIn){
    $('#edit-book-modal').modal('show')

    this.bookId = $(e.target).data('id');
    let bookToEdit = this.allBooks.filter(item => {
      return item._id === this.bookId
    })

    let parsedDate = parseFormDate(bookToEdit[0].pubDate);

    console.log(bookToEdit, "BOOK to EDIT");
    $('#title-edit').val(bookToEdit[0].title);
    $('#author-edit').val(bookToEdit[0].author);
    $('#genre-edit').val(bookToEdit[0].genre);
    $('#pages-edit').val(bookToEdit[0].pages);
    $('#publicationDate-edit').val(parsedDate);
    $('#synopsis-edit').val(bookToEdit[0].synopsis);
    $('#file-upload-edit').val(bookToEdit[0].cover);
  } else {
    this.ifNotLoggedIn();
  }
};

_saveEditedBook(id){
  const newTitle = $('#title-edit').val();
  const newAuthor = $('#author-edit').val();
  const newGenre = $('#genre-edit').val();
  const newPages = $('#pages-edit').val();
  const newPubDate = $('#publicationDate-edit').val();
  const newSynopsis = $('#synopsis-edit').val();
  let newCover = $('#file-upload-edit').val();
  const noBookCover = '../assets/books/noCover.jpg';

  const file = document.querySelector('#file-upload-edit').files[0];
  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
    reader.onload = function() {
      // console.log(reader.result);
      newCover = reader.result;
    };
  } else {
    newCover = noBookCover;
  }

  setTimeout(() => {
    const editedBook = {
      cover: newCover,
      title: newTitle,
      author: newAuthor,
      genre: newGenre,
      pages: newPages,
      pubDate: newPubDate,
      synopsis: newSynopsis
    }
    $.ajax({
      url: `${this.libraryURL}${id}`,
      method: 'PUT',
      dataType: 'json',
      headers: {"x-access-token": localStorage.getItem("jwt_token")},
      data: editedBook,
      success: (data) => {
        // console.log(data, 'Edited Book from DB');
        $('#success-modal').modal('show');
        setTimeout(function () {
          $('#success-modal').removeClass('zoomIn');
          $('#success-modal').addClass('zoomOut');
        }, 1000);
        setTimeout(function () {
          $('#success-modal').modal('hide');
          $('#success-modal').removeClass('zoomOut');
          $('#success-modal').addClass('zoomIn');
        }, 1500);
        this._getAllBooks();
      }
    })
  }, 100);

  $('#edit-book-modal').modal('hide');
}

_editBook () {
  this._saveEditedBook(this.bookId);
}

_confirmDeleteBook () {
  this._handleDeleteBook(this.bookId);
  return;
}

_handleDeleteBook (id) {
  $.ajax({
    url: `${this.libraryURL}${id}`,
    method: 'DELETE',
    dataType: 'json',
    headers: {"x-access-token": localStorage.getItem("jwt_token")},
    data: id,
    success: (data) => {
      if (data) {
        $('#success-modal').modal('show');
        setTimeout(function () {
          $('#success-modal').removeClass('zoomIn');
          $('#success-modal').addClass('zoomOut');
        }, 1000);
        setTimeout(function () {
          $('#success-modal').modal('hide');
          $('#success-modal').removeClass('zoomOut');
          $('#success-modal').addClass('zoomIn');
        }, 1500);
      $('.confirm-delete-text').empty();
      }
      this._getAllBooks();
    }
  })
  return;
};

_createHeader () {
  var book = new Book();
  var tr = document.createElement('tr');

  // ************Number the rows*********
  var rowNumber = document.createElement('th');
  $(rowNumber).text('');
  $(tr).append(rowNumber);
  // ************************

  var sortIcon = $('<i>', {class: "fas fa-arrow-down ml-1"})
  for (var key in book) {
    var th = document.createElement('th');
    var thAttr = document.createAttribute("scope");
    thAttr.value = "col";
    th.setAttributeNode(thAttr);
    // ********Capitalize Columns names**********
    var keyName = key.split(/(?=[A-Z])/).join(' ')
    var headerName = keyName.charAt(0).toUpperCase() + keyName.substr(1);
    // ********************

    $(th).text(headerName);
    tr.append(th);

    if (key === 'synopsis') {
      $(th).hide();
    }
    if (key === 'deleteCol') {
      $(th).text("Delete");
    }
  }
  return tr;
};

_createRow (index, book) {
  // console.log("row created!");
  var tr = $('<tr>', {id: 'row', class: 'animated fadeIn'});
  var deleteIcon = $('<i>', {
    class: 'far fa-times-circle fa-lg delete',
    'data-title': book['title'],
    'data-id': book['_id']
  });
  var editIcon = $('<i>', {
    class: 'far fa-edit fa-lg edit',
    'data-title': book['title'],
    'data-id': book['_id']
  });
  var ratingList = $('<ul>', {
    class: 'stars w-100',
    id: 'ratingStar'
  });

  var rowNumber = $('<td>');
  $(rowNumber).text(index + 1);
  $(tr).append(rowNumber);

  // *** book cover cell
  // console.log(book, 'book');
  var bookImg = $('<img>', {
    class: 'coverToEdit',
    src: `${book.cover}`,
    alt: 'book cover'
  })
  // end book cover cell ***

  for (var i = 0; i < 5; i++) {
    var ratingItem = $('<li>', {
      class: 'star',
    });
    if (book.rating && book.rating > i) {
      $(ratingItem).addClass('selected');
    }
    var star = $('<i>', {
      class: 'fa fa-star',
      'data-id': book['_id'],
      'data-value': i + 1,
      'data-title': book['title']
    });
    var rating = $(ratingItem).append(star);
    $(ratingList).append(rating);
  }

  $(tr).append($('<td>').append(bookImg))
  $(tr).append($('<td>', {class: 'h5'}).append(book.title))
  $(tr).append($('<td>').append(book.author))
  $(tr).append($('<td>').append(book.genre))
  $(tr).append($('<td>').append(book.pages))
  $(tr).append($('<td>').append(parseDate(book.pubDate)))
  $(tr).append($('<td>').append(ratingList).addClass('rating-stars'))
  $(tr).append($('<td>', {class: 'text-center'}).append(deleteIcon))
  $(tr).append($('<td>', {class: 'text-center'}).append(editIcon))

  return tr;
};

_rateBook (e) {
  console.log('rate book');
  // console.log(e, 'event');
  this.bookId = $(e.target).data('id');
  // console.log(this.bookId, 'Book ID');
  var onStar = parseInt($(e.target).data('value'), 10); // The star currently selected

  $('.stars li').on('mouseover', function() {
    // var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
    // console.log(this);
    // console.log(onStar, 'first');

    // Now highlight all the stars that's not after the current hovered star
    $('li.star').each(function(e) {
      if (e < onStar) {
        $('li.star').addClass('hover');
      } else {
        $('li.star').removeClass('hover');
      }
    });
  }).on('mouseout', function() {
    $('li.star').each(function(e) {
      $('li.star').removeClass('hover');
    });
  });

  $.ajax({
    url: `${this.libraryURL}${this.bookId}`,
    method: 'PUT',
    dataType: 'json',
    data: {rating: onStar},
    success: (data) => {
      console.log('rate book success');
      // console.log(data, 'Edited Book with rating from DB');
      this._getAllBooks();
    }
  })
};

_sortBy (e, book) {
  var val = $(e.target).data("sort");
  // console.log(val, "VALUE");
  this.allBooks.sort((a, b) => {
    if (typeof a[val] === "number") {
      return b[val] - a[val]
    }
    var itemA = a[val].toLowerCase()
    var itemB = b[val].toLowerCase()
    if (itemA < itemB) //sort string ascending
      return -1
    if (itemA > itemB)
      return 1
    return 0 //default return value (no sorting)
  })
  this._reload();
};

};

$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable._init();
});
