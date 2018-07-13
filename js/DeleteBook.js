var DeleteBook = function(container){
  this.$container = container;
  Library.call(this);
  // AddBooksUI.call(this);
};

DeleteBook.prototype = Object.create(Library.prototype);

DeleteBook.prototype.init = function(){
  this._bindEvents();
  // return;
};

DeleteBook.prototype._bindEvents = function(){
  $('.delete').on('click',
  $.proxy(this._handleModalOpen, this));

  $('#confirm-delete-btn').on('click', $.proxy(this._handleDeleteBook, this));

};

DeleteBook.prototype._handleModalOpen = function () {
  this.$container.modal('show');
  return;
};

DeleteBook.prototype._handleDeleteBook = function() {
  // console.log($(event.target).data('value'), 'target');
  var value = $('#delete-btn');
  var title = value.data('title');
  console.log(title, 'title');
this.removeBook($(event.target).data('value'));
  // location.reload();
  console.log('deleting');
};


$(function(){
  window.gDeleteBook = new DeleteBook($('#confirm-delete-modal'));
  window.gDeleteBook.init();

});
