var RandomBook = function() {
  Library.call(this);
  this.$container = $('#randomBookModal');
};
RandomBook.prototype = Object.create(Library.prototype);

RandomBook.prototype.init = function() {
  this._bindEvents();
  return;
};
RandomBook.prototype._bindEvents = function() {
  $('button#random-book-btn').on('click', $.proxy(this._showRandomBook, this));
  return;
};

RandomBook.prototype._openRandomBookModal = function () {
  this.$container.modal('show');
  return;
};

RandomBook.prototype._showRandomBook = function () {
  var randomBook = this.getRandomBook();
  console.log(randomBook, 'randomBook');
  if(randomBook){
    this._openRandomBookModal();
    this.$container.find('.modal-body').html(this._createRandomBook(randomBook));
  }
  else {
    alert("Your library is empty!")
  }
  return;
};

RandomBook.prototype._createRandomBook = function (book) {
  var form = $('<form>', {'class': 'form-inline'})
  var image = $('<img>', {'class': 'img-thumbnail col-md-4',
'src': 'book.cover',
'alt': 'random book cover'})
  var div = $('<div>', {'class': 'col-md-6'});

  image.text(book.cover);
  var title = $('<h5>').text(book.title);
  var author = $('<h6>').text(book.author);
  var genre = $('<h6>').text(book.genre);
  var pages = $('<h6>').text(book.pages);
  var synopsis = $('<h6>').text(book.synopsis);
  div.append(title).append(author).append(genre).append(pages).append(synopsis);
  form.append(image).append(div);
  return form;
};

$(function() {
  window.gRandomBook = new RandomBook();
  window.gRandomBook.init();
});
