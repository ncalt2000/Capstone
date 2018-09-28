class DataTable {
  constructor() {
    this.libraryURL = 'http://127.0.0.1:3002/library/'
    this.allBooks = [];
    const bookId = null;
    const data = "";
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
  // console.log("RELOADED!!!");
  //after addind, editing, deleting, updating these methods must run to add event handlers back to the btns!
  this._updateTable();
  this._bindEvents();
};

_bindEvents () {
  //add native events here
  //Must run this._bindEvents() to attach event handlers to the btns.
  $('.delete').on('click', this._openDeleteModal.bind(this));
  $('.edit').on('click', this._openEditModal.bind(this));
  $('.star').on('click', this._rateBook.bind(this));

};

_bindCustomListeners () {
  //every time table updates, this._bindEvents must reload again.
  // $(document.gDataTable).on('Updated', this._getAllBooks.bind(this));
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
  // console.log("News books comming in");
  $.ajax({
    url: this.libraryURL,
    method: 'GET',
    dataType: 'json',
    success: (data) => {
      $('#display-data').empty();
      this.allBooks = data;
      // console.log(this.allBooks, 'All Books from DB');
      this._reload();
    }
  })
}

_updateTable () {
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

_openDeleteModal (e) {
  this.bookId = $(e.target).data('id');
  const _titleToDelete = $(e.target).data('title');
  let deleteText = $('<p>', {id: 'delete-text'});
  deleteText.html(`Are you sure you want to delete ${_titleToDelete}?`)
  let confirmDeleteText = $('.confirm-delete-text').append(deleteText)
  $('#confirm-delete-modal').modal('show');
  return;
};

_openEditModal (e) {
  $('#edit-book-modal').modal('show')

  this.bookId = $(e.target).data('id');
  let bookToEdit = this.allBooks.filter(item => {
    return item._id === this.bookId
  })

  let parsedDate = parseFormDate(bookToEdit[0].pubDate);
  // console.log(parsedDate);
  // this.currentCover = bookToEdit[0].cover;
  // console.log(this.currentCover, 'from OpenModal');
  $('#title-edit').val(bookToEdit[0].title);
  $('#author-edit').val(bookToEdit[0].author);
  $('#genre-edit').val(bookToEdit[0].genre);
  $('#pages-edit').val(bookToEdit[0].pages);
  $('#publicationDate-edit').val(parsedDate);
  $('#synopsis-edit').val(bookToEdit[0].synopsis);
  this._keepRating = bookToEdit.rating;
};

_saveEditedBook(id){
  const newTitle = $('#title-edit').val();
  const newAuthor = $('#author-edit').val();
  const newGenre = $('#genre-edit').val();
  const newPages = $('#pages-edit').val();
  const newPubDate = $('#publicationDate-edit').val();
  const newSynopsis = $('#synopsis-edit').val();

  const editedBook = {
    // cover: newCover     //when available
    title: newTitle,
    author: newAuthor,
    genre: newGenre,
    pages: newPages,
    pubDate: newPubDate,
    synopsis: newSynopsis
  }
  // console.log(editedBook, 'Book to send to DB');

  $.ajax({
    url: `${this.libraryURL}${id}`,
    method: 'PUT',
    dataType: 'json',
    data: editedBook,
    success: (data) => {
      // console.log(data, 'Edited Book from DB');
      this._getAllBooks();
    }
  })
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
    data: id, //this is our request
    success: (data) => { //this is the response from DB
      this.data = data;
      this._getAllBooks();
      // console.log(data, "Success");;
    }
  })
  if (this.data !== "") {
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
    src: `${book.cover}`, //keep this line until you figure out Base64
    alt: 'book cover'
  })
  // console.log(bookImg, 'BookImg');
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

  // console.log(e, 'event');
  this.bookId = $(e.target).data('id');
  // console.log(this.bookId, 'Book ID');
  var onStar = parseInt($(e.target).data('value'), 10); // The star currently selected
  // console.log(onStar, 'onStar');
  $.ajax({
    url: `${this.libraryURL}${this.bookId}`,
    method: 'PUT',
    dataType: 'json',
    data: {rating: onStar},
    success: (data) => {
      // console.log(data, 'Edited Book with rating from DB');
      this._getAllBooks();
    }
  })
}

ratingBook () {
  // console.log("From Rating");
  /* 1. Visualizing things on Hover - See next part for action on click */
  $('.stars li').on('mouseover', function() {
    var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
    // console.log(this);
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
    // console.log(e, 'event');
    this.bookId = $(e.target).data('id');
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

editBook () {

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
    // this._handleEventTrigger("objUpdate", {bookEdited: "Book is Edited!"});

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
