var DataTable = function() {
  Library.call(this);
  this.$container = $('#book-table');
  var _titleToDelete = '';
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  this.getStorage();
  this._updateTable();
  this._bindEvents();
  this._bindCustomListeners();
};

DataTable.prototype._bindEvents = function() {
  //add native events here
  $('.delete').on('click', $.proxy(this._handleModalOpen, this));
};

DataTable.prototype._bindCustomListeners = function() {
  $(document).on('objUpdate', $.proxy(this._updateTable, this));

  $('#confirm-delete-btn').on('click', $.proxy(this._handleDeleteBook, this));

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
    $tbody.append(_self._createRow(book));
  });
};

DataTable.prototype._handleModalOpen = function(e) {
  var title = $(e.target).data('title');
  this._titleToDelete = title;
  console.log(this._titleToDelete, 'title');
  $('#confirm-delete-modal').modal('show')
};

DataTable.prototype._handleDeleteBook = function() {

  var bookDeleted = false;
  for (var i = 0; i < window.bookshelf.length; i++) {
    if (window.bookshelf[i]['title'] === this._titleToDelete) {
      bookDeleted = true;
      window.bookshelf.splice(i, 1)
      localStorage.setItem("bookshelf", JSON.stringify(window.bookshelf))
    }
  }
  this._handleEventTrigger("objUpdate", {booksAdded: "The book is added"});

  if (bookDeleted) {
    return true + " The book is deleted!"
  }
  return false + " The book is not found!";
};


DataTable.prototype._createHeader = function() {
  var book = new Book();
  var tr = document.createElement('tr');

  for (var key in book) {
    var th = document.createElement('th');
    var thAttr = document.createAttribute("scope");
    thAttr.value = "col";
    th.setAttributeNode(thAttr);
    $(th).text(key);
    tr.append(th);
    if (key === 'synopsis') {
      $(th).hide();
    }
    if (key === 'deleteCol') {
      $(th).text("delete");
    }
  }
  return tr;
};

DataTable.prototype._createRow = function(book) {
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
  var editIcon = $('<i>', {class: 'far fa-edit fa-lg edit'});

  for (var key in book) {
    var td = document.createElement('td');
    if (key === 'synopsis') {
      $(td).hide();
    } else if (key === 'deleteCol') {
      $(td).append(deleteIcon)
      $(td).append(editIcon)
    } else if (key === 'publishDate') {
      var parsedDate = window.parseDate(book[key])
      $(td).append(parsedDate)
    } else {
      $(td).text(book[key]);
    }
    tr.append(td);
  }
  // console.log(tr);
  return tr;
};

$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
