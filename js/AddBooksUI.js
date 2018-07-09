// create a contructor: addBooksUI
var AddBooksUI = function(){
  // allow us to access anythign in the Library
  Library.call(this);
  // temp bookshelf is to hold multiple books, then pass it in addBooks function, and tie to Add btn.
  this._tempBookshelf = new Array();
  // what's a container? what does is do?
  this.$container = container;
};
// new instance of Library.prototype is created
AddBooksUI.prototype = Object.create(Library.prototype);

//data-target and data-value are removed from html. This will be added in js.

// init fires whatever is in the _bindEvents.
AddBooksUI.prototype.init = function(){
  this._bindEvents();
};

// this pens the modal
// proxy is doing similar ot call(this)
AddBooksUI.prototype._bindEvents = function(){
  // add an id=''
  $('#add-book-btn').on('click', $proxy(this._handleModalOpen, this))
};

// even handler
AddBooksUI.prototype._handleModalOpen - function(){
  this.$container.modal('show');
}


$(function(){
  window.gAddBooksUI = new AddBooksUI($('#addBooksModal'));
  window.gAddBooksUI.init();
});
