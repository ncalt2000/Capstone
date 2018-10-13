class DeleteBook {
  constructor(){

  }
  // this.$container = $('#confirm-delete-modal');
  // this.$container = $('#table-body');
  // Library.call(this);

// DeleteBook.prototype = Object.create(Library.prototype);

_init (){
  // this.getStorage();
  this._bindEvents();
  // return;
};

_bindEvents (){
  // $('.delete').on('click',
  // $.proxy(this._handleModalOpen, this));

  // $('#confirm-delete-btn').on('click', this._handleDeleteBook.bind(this));
  $('.delete').on('click', this._handleDeleteBook.bind(this));

};

// DeleteBook.prototype._handleModalOpen = function () {
//   console.log("delete modal");
//   // this.$container.modal('show');
//   this.$container.modal('show');
//   return;
// };

_handleDeleteBook () {
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

};

$(function(){
  window.gDeleteBook = new DeleteBook();
  window.gDeleteBook._init();
});
