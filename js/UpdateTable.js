var DataTable = function(){
  Library.call(this);
  this.$container = $('#book-table');
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  this.getStorage();
  this._updateTable();
  this._bindEvents();
  this._bindCustomListeners();
};

DataTable.prototype._bindEvents = function () {
  //add native events here
};

DataTable.prototype._bindCustomListeners = function () {
  $(document).on('objUpdate', $.proxy(this._updateTable, this));
};

DataTable.prototype._updateTable = function (book) {
  // alert(e.detail.data);
  var _self = this;
  var $tbody = this.$container.find('tbody');
  $tbody.empty();

  var $thead = this.$container.find('thead');
  $thead.empty();

  $thead.append(_self._createHeader());
  $.each(window.bookshelf, function(index, book){
    $tbody.append(_self._createRow(book));
  });
  return $tbody;
};

DataTable.prototype._createHeader = function () {
  var book = new Book();
  var tr = document.createElement('tr');

  for(var key in book){
    var th = document.createElement('th');
    var thAttr = document.createAttribute("scope");
    thAttr.value="col";
    th.setAttributeNode(thAttr);
    $(th).text(key);
    tr.append(th);
    if(key === 'synopsis'){
      $(th).hide();
    }
    if(key === 'deleteCol'){
      $(th).text("delete");
    }
  }
  return tr;
};

DataTable.prototype._createRow = function (book) {
  var tr = document.createElement('tr');
  var deleteIcon = document.createElement('i');
  var deleteIconAttr = document.createAttribute("class");
  deleteIconAttr.value = "far fa-times-circle fa-lg delete";
  deleteIcon.setAttributeNode(deleteIconAttr);
  var editIcon = $('<i>', {class: 'far fa-edit fa-lg edit'})

  for(var key in book){
    var td = document.createElement('td');
    if(key === 'synopsis'){
      $(td).hide();
    }

    $(td).text(book[key]);
    if(key === 'deleteCol'){
      $(td).append(deleteIcon)
      $(td).append(editIcon)
    }
    tr.append(td);
  }
  return tr;
};


$(function(){
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
