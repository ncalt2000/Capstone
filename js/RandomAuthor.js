var RandomAuthor = function() {
  Library.call(this);
  this.$container = $('#randomAuthorModal');
};
RandomAuthor.prototype = Object.create(Library.prototype);

RandomAuthor.prototype.init = function() {
  this._bindEvents();
  return;
};
RandomAuthor.prototype._bindEvents = function() {
  $('button#random-author-btn').on('click', $.proxy(this._showRandomAuthor, this));
  return;
};

RandomAuthor.prototype._openRandomAuthorModal = function () {
  this.$container.modal('show');
  return;
};

RandomAuthor.prototype._showRandomAuthor = function () {
  var randomAuthor = this.getRandomAuthorName();
  // console.log(randomAuthor, 'randomAuthor');
  if(randomAuthor !== ""){
    this._openRandomAuthorModal();
    this.$container.find('.modal-body').html(this._createRandomAuthor(randomAuthor));
  }
  return;
};

RandomAuthor.prototype._createRandomAuthor = function (author) {
  var form = $('<form>', {'class': 'form-inline'})

  var author = $('<h4>').text(author);
  form.append(author);
  return form;
};

$(function() {
  window.gRandomAuthor = new RandomAuthor();
  window.gRandomAuthor.init();
});
