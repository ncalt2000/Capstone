var DeleteBook = function(container){
  this.$container = container;
  Library.call(this);
  AddBooksUI.call(this);
};

DeleteBook.prototype = Object.create(Library.prototype);

DeleteBook.prototype.init = function(){
  this._bindEvents();
  return;
};

DeleteBook.prototype._bindEvents = function(){
  $('#delete-icon').on('click', $.proxy(this._handleDeleteBook, this));
  return;
};

DeleteBook.prototype._handleDeleteBook = function () {
  console.log('deleting');
};

$(function(){
  window.gDeleteBook = DeleteBook($('#delete-icon'));
  window.gDeleteBook.init();
});
