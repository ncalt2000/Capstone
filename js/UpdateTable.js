var DataTable = function() {
  Library.call(this);
  this.$container = $('#book-table');
  var _titleToDelete = '';
  var _titleToEdit = '';
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  this._updateTable();
  this._bindEvents();
  this._bindCustomListeners();
  this._ratingBook();
};

DataTable.prototype._bindEvents = function() {
  //add native events here
  $('.delete').on('click', $.proxy(this._openDeleteModal, this));
  $('.edit').on('click', $.proxy(this._openEditModal, this));
};

DataTable.prototype._bindCustomListeners = function() {
  $(document).on('objUpdate', $.proxy(this._updateTable, this));

  $('#confirm-delete-btn').on('click', $.proxy(this._handleDeleteBook, this));

  $('#save-edit-btn').on('click', $.proxy(this._editBook, this));
};

DataTable.prototype._updateTable = function(book) {
  // alert(e.detail.data);
  var _self = this;
  var $tbody = this.$container.find('tbody');
  $tbody.empty();

  var $thead = this.$container.find('thead');
  $thead.empty();

  $thead.append(_self._createHeader());

  $.each(window.bookshelf, function(index, book) {
    $tbody.append(_self._createRow(index, book));
  });
};

DataTable.prototype._openDeleteModal = function(e) {
  this._titleToDelete = $(e.target).data('title');
  console.log(this._titleToDelete, 'title');
  $('#confirm-delete-modal').modal('show')
};

DataTable.prototype._openEditModal = function(e) {

  // 1. open modal:
  $('#edit-book-modal').modal('show')
  // 2. get the title fo the book you are clicking on:
  _titleToEdit = $(e.target).data('title');
  console.log(_titleToEdit, '_titleToEdit');
  // 3. getBookByTitle(it comes in as an array):
  var bookToEdit = this.getBookByTitle(_titleToEdit)[0];
  // console.log(bookToEdit, 'to edit');
  // 4. grab all the values from the book and put it in the modal:
  var parsedDate = window.parseFormDate(bookToEdit.publishDate);
  // console.log(parsedDate, 'parsed date');
  $('#title-edit').val(bookToEdit.title);
  $('#author-edit').val(bookToEdit.author);
  $('#genre-edit').val(bookToEdit.genre);
  $('#pages-edit').val(bookToEdit.pages);
  $('#publicationDate-edit').val(parsedDate);
  $('#synopsis-edit').val(bookToEdit.synopsis);
  // $('#file-upload-edit').val(bookToEdit.cover); throws error!!!
};

DataTable.prototype._handleDeleteBook = function() {
  this.removeBook(this._titleToDelete);
};

DataTable.prototype._createHeader = function() {
  var book = new Book();
  var tr = document.createElement('tr');

  // ************Number the rows*********
  var rowNumber = document.createElement('th');
  $(rowNumber).text('');
  $(tr).append(rowNumber);
  // ************************

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

DataTable.prototype._createRow = function(index, book) {
  var tr = document.createElement('tr');
  // *** create deleteIcon in vanillaJS: ***
  // var deleteIcon = document.createElement('i');
  // var deleteIconAttr = document.createAttribute("class");
  // deleteIconAttr.value = "far fa-times-circle fa-lg delete";
  // deleteIcon.setAttributeNode(deleteIconAttr);
  // *** create deleteIcon in jQuery: ***
  var deleteIcon = $('<i>', {
    class: 'far fa-times-circle fa-lg delete',
    'data-title': book['title']
  });
  var editIcon = $('<i>', {
    class: 'far fa-edit fa-lg edit',
    'data-title': book['title']
  });
  var ratingList = $('<ul>', {class: 'stars w-100'});
  // console.log(ratingList);
  var rowNumber = $('<td>');
  $(rowNumber).text(index+1);
  $(tr).append(rowNumber);

  for (var key in book) {
    var td = document.createElement('td');
    if (key === 'publishDate') {
      var parsedDate = window.parseDate(book[key])
      $(td).append(parsedDate)
    } else if (key === 'rating') {
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
      $(td).addClass('rating-stars');
      $(td).append(ratingList);
    } else if (key === 'deleteCol') {
      $(td).append(deleteIcon)
    } else if (key === 'synopsis') {
      $(td).hide();
    } else if (key === 'edit') {
      $(td).append(editIcon)
    } else {
      $(td).text(book[key]);
    }
    $(tr).append(td);
  }
  // console.log(tr);

  return tr;
};

DataTable.prototype._ratingBook = function() {
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
    console.log(currentTitle, 'currentTitle');
    var onStar = parseInt($(this).data('value'), 10); // The star currently selected
    console.log(onStar, 'onStar');
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

DataTable.prototype._editBook = function() {
  var newTitle = $('#title-edit').val();
  var newAuthor = $('#author-edit').val();
  var newGenre = $('#genre-edit').val();
  var newPages = $('#pages-edit').val();
  var newPubDate = $('#publicationDate-edit').val();
  var newSynopsis = $('#synopsis-edit').val();
  var newBook = new Book('', newTitle, newAuthor, newGenre, newPages, newPubDate, '', '', newSynopsis, '');
  var index;
  for (var i = 0; i < window.bookshelf.length; i++) {
    if (window.bookshelf[i].title === _titleToEdit) {
      index = i;
    }
  }
  for (var i = 0; i < window.bookshelf.length; i++) {
    if (newTitle === window.bookshelf[i].title) {
      alert("This book already exist!")
    }
  }
  window.bookshelf.splice(index, 1, newBook);
  this.setStorage();
};

$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
