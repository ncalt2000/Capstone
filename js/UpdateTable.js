class DataTable {
  constructor() {
    //placeholder for an id='addBooksModal'
    // allow us to access anythign in the Library
    // Library.call(this);
    // temp bookshelf is to hold multiple books, then pass it in addBooks function, and tie to Add btn.
    this.libraryURL = 'http://127.0.0.1:3002/library/'
    this.allBooks = [];
  }


// var DataTable () {
//   Library.call(this);
//   this.$container = $('#book-table');
//   var _titleToDelete = '';
//   var _titleToEdit = '';
//   var _keepRating = 0;
//   var _sorted = false;
//   var currentCover;
// };

// DataTable.prototype = Object.create(Library.prototype);

_init () {
  // when the page initially loads
  this._getAllBooks();
  // this._updateTable();
  this._bindEvents();
  this._bindCustomListeners();
  this._ratingBook();
};

_reload () {
  //after addind, editing, deleting, these methods must run to add event handlers back to the btns!
  this._updateTable();
  this._bindEvents();
  this._ratingBook();
};

_bindEvents () {
  //add native events here
  //Must run this._bindEvents() to attach event handlers to the btns.
  $('.delete').on('click', $.proxy(this._openDeleteModal, this));
  $('.edit').on('click', $.proxy(this._openEditModal, this));
};

_bindCustomListeners () {
  //every time table updates, this._bindEvents must reload again.
  $(document).on('objUpdate', $.proxy(this._reload, this));
  $('#confirm-cancel-btn').on('click', $.proxy(this._closeModalOnCancel, this));
  $('#confirm-delete-btn').on('click', $.proxy(this._handleDeleteBook, this));

  $('#save-edit-btn').on('click', $.proxy(this._editBook, this));

  $("#sort-title").on('click', $.proxy(this._sortBy, this));
  $("#sort-author").on('click', $.proxy(this._sortBy, this));
  $("#sort-genre").on('click', $.proxy(this._sortBy, this));
  $("#sort-rating").on('click', $.proxy(this._sortBy, this));
};

_closeModalOnCancel () {
  $('.confirm-delete-text').empty();
  $('#confirm-delete-modal').modal('hide')
};

_getAllBooks(){
  $.ajax({
    url: this.libraryURL,
    method: 'GET',
    dataType: 'json',
    success: (data) => {
      $('#display-data').empty();
      this.allBooks = data;
      console.log(this.allBooks, 'All Books from DB');
      this._updateTable();
    }
  })
}

_updateTable () {
  // alert(e.detail.data);
  var $tbody = $('#table-body');
  $tbody.empty();

  var $thead = $('thead');
  $thead.empty();

  $thead.append(this._createHeader());
  $.each(this.allBooks, (index, book) => {
    $tbody.append(this._createRow(index, book));
  });
};

_openDeleteModal (e) {
  this._titleToDelete = $(e.target).data('title');
  // console.log(this._titleToDelete, 'title');
  var strong = $('<span>', {class: 'text-danger font-weight-bold'})
  var styledTitle = strong.append(this._titleToDelete);
  // console.log(styledTitle);
  var deleteText = $('<p>', {id: 'delete-text'});
  deleteText.html(`Are you sure you want to delete ${styledTitle[0].textContent}?`)
  var confirmDeleteText = $('.confirm-delete-text').append(deleteText)
  $('#confirm-delete-modal').modal('show')
};

_openEditModal (e) {

  // 1. open modal:
  $('#edit-book-modal').modal('show')
  // 2. get the title fo the book you are clicking on:
  this._titleToEdit = $(e.target).data('title');
  // 3. getBookByTitle(it comes in as an array):
  var bookToEdit = this.getBookByTitle(this._titleToEdit)[0];
  // 4. grab all the values from the book and put it in the modal:
  var parsedDate = window.parseFormDate(bookToEdit.publishDate);
  // console.log(bookToEdit.cover);
  this.currentCover = bookToEdit.cover;
  // console.log(this.currentCover, 'from OpenModal');
  $('#title-edit').val(bookToEdit.title);
  $('#author-edit').val(bookToEdit.author);
  $('#genre-edit').val(bookToEdit.genre);
  $('#pages-edit').val(bookToEdit.pages);
  $('#publicationDate-edit').val(parsedDate);
  $('#synopsis-edit').val(bookToEdit.synopsis);
  this._keepRating = bookToEdit.rating;
};

_handleDeleteBook () {
  if (this.removeBook(this._titleToDelete)) {
    $('#success-modal').modal('show');
    setTimeout(function () {
      $('#success-modal').removeClass('zoomIn');
      $('#success-modal').addClass('zoomOut');
    }, 1000);
    setTimeout(function () {
      $('#success-modal').modal('hide');
      $('#success-modal').removeClass('zoomOut');
      $('#success-modal').addClass('zoomIn');
    }, 1500);    $('.confirm-delete-text').empty();
  }
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
  var tr = $('<tr>', {id: 'row', class: 'animated fadeIn'});
  var deleteIcon = $('<i>', {
    class: 'far fa-times-circle fa-lg delete',
    'data-title': book['title']
  });
  var editIcon = $('<i>', {
    class: 'far fa-edit fa-lg edit',
    'data-title': book['title']
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
      'data-value': i + 1
    });
    if (book.rating && book.rating > i) {
      $(ratingItem).addClass('selected');
    }
    var star = $('<i>', {
      class: 'fa fa-star',
      'data-title': book['title']
    });
    var rating = $(ratingItem).append(star);
    $(ratingList).append(rating);
  }

  $(tr).append($('<td>').append(book.cover))
  $(tr).append($('<td>').append(book.title))
  $(tr).append($('<td>').append(book.author))
  $(tr).append($('<td>').append(book.genre))
  $(tr).append($('<td>').append(book.pages))
  $(tr).append($('<td>').append(parseDate(book.pubDate)))
  $(tr).append($('<td>').append(ratingList).addClass('rating-stars'))
  $(tr).append($('<td>').append(deleteIcon))
  $(tr).append($('<td>').append(editIcon))

  return tr;
};

_ratingBook () {
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
  $('.stars li').on('click', function(e) {
    var currentTitle = $(e.target).data('title');
    // console.log(currentTitle, 'currentTitle');
    var onStar = parseInt($(this).data('value'), 10); // The star currently selected
    // console.log(onStar, 'onStar');
    var stars = $(this).parent().children('li.star');
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
    for (var y = 0; y < window.bookshelf.length; y++) {
      if (window.bookshelf[y].title === currentTitle) {
        window.bookshelf[y].rating = onStar;
      }
    }
    localStorage.setItem("bookshelf", JSON.stringify(window.bookshelf));
  });
};

_editBook () {

  var newTitle = $('#title-edit').val();
  var newAuthor = $('#author-edit').val();
  var newGenre = $('#genre-edit').val();
  var newPages = $('#pages-edit').val();
  var newPubDate = $('#publicationDate-edit').val();
  var newSynopsis = $('#synopsis-edit').val();

  editThisBook = function(cover) {
    if(newTitle === ""){
      $('#title-edit').addClass('required animated pulse');
      return;
    }
    if(newAuthor === ""){
      $('#title-edit').removeClass('required');
      $('#author-edit').addClass('required animated pulse');
      return;
    }

    var newBook = new Book(cover, newTitle, newAuthor, newGenre, newPages, newPubDate, this._keepRating, '', newSynopsis, '');
    var index;
    var isSuccessful = false;
    for (var i = 0; i < window.bookshelf.length; i++) {
      if (window.bookshelf[i].title === this._titleToEdit) {
        index = i;
        isSuccessful = true;
      }
    }

    window.bookshelf.splice(index, 1, newBook);

    this.setStorage();
    this._handleEventTrigger("objUpdate", {bookEdited: "Book is Edited!"});

    $('#edit-book-modal').modal('hide');

    if (isSuccessful) {
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
    }
  }.bind(this);

  var file = document.querySelector('#file-upload-edit').files[0];
  // console.log('file', file);
  var reader = new FileReader();
  var coverToEdit;
  if (file) {
    // console.log('If file');
    reader.readAsDataURL(file);
    reader.onload = function() {
      coverToEdit = reader.result;
      editThisBook(coverToEdit);
    };
  } else {
    // console.log('if NO file');
    coverToEdit = this.currentCover;
    // console.log(this.currentCover, 'from else');
    // this.currentCover = null;
    editThisBook(coverToEdit);
  }
  document.getElementById("file-upload-edit").value = "";
};

_sortBy (e, book) {
  var val = $(e.target).data("sort");
  // console.log(val);
  window.bookshelf.sort((a, b) => {
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

  this._handleEventTrigger("objUpdate");
};

};

$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable._init();
});
