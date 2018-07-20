var DeleteBook = function(){
  this.$container = $('#confirm-delete-modal');
  // this.$container = $('#table-body');
  Library.call(this);
};

DeleteBook.prototype = Object.create(Library.prototype);

DeleteBook.prototype.init = function(){
  // this.getStorage();
  this._bindEvents();
  // return;
};

DeleteBook.prototype._bindEvents = function(){
  // $('.delete').on('click',
  // $.proxy(this._handleModalOpen, this));

  $('#confirm-delete-btn').on('click', $.proxy(this._handleDeleteBook, this));

};

// DeleteBook.prototype._handleModalOpen = function () {
//   console.log("delete modal");
//   // this.$container.modal('show');
//   this.$container.modal('show');
//   return;
// };

DeleteBook.prototype._handleDeleteBook = function() {
  var value = $('.delete');
  var title = value.data('title');
  // console.log(title, 'title');
  // this.removeBook($(event.target).data('value'));
  var bookDeleted = false;
  for (var i = 0; i < window.bookshelf.length; i++) {
    if (window.bookshelf[i]['title'] === $(event.target).data('value')) {
      bookDeleted = true;
      window.bookshelf.splice(i, 1)
      localStorage.setItem("bookshelf", JSON.stringify(window.bookshelf))
    }
  }
  if (bookDeleted) {
    return true + " The book is deleted!"
  }
  return false + " The book is not found!";
  console.log('deleting');
};


$(function(){
  window.gDeleteBook = new DeleteBook();
  window.gDeleteBook.init();
});
