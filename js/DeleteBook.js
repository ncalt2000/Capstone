var DeleteBook = function(container){
  this.$container = container;
  Library.call(this);
};

DeleteBook.prototype = Object.create(Library.prototype);

DeleteBook.prototype.init = function(){
  this._bindEvents();
  return;
};

DeleteBook.prototype._bindEvents = function(){
  $('.delete').on('click', $.proxy(this._handleDeleteBook, this));
  return;
};

DeleteBook.prototype._handleDeleteBook = function() {
  // var bookshelf = this.getStorage();
  // console.log($(event.target).data('title'), 'target');
  this.removeBook($(event.target).data('title'))
  // console.log(bookshelf);
  location.reload();
  console.log('deleting');
};


$(function(){
  window.gDeleteBook = new DeleteBook($('#edit-delete'));
  window.gDeleteBook.init();

});
