var ShowAuthorsUI = function(container){
  this.$container = container;
  Library.call(this);
};

ShowAuthorsUI.prototype = Object.create(Library.prototype);

ShowAuthorsUI.prototype.init = function () {
  this.recover();
  this._bindEvents();
  return false;
};

ShowAuthorsUI.prototype._bindEvents = function () {
  $('button#show-all').on('click', $.proxy(this._handleShowAuthors, this));
  return false;
};

ShowAuthorsUI.prototype._handleShowAuthors = function () {
  var authors = this.getAuthors();
  if(authors.length){
    this.$container.modal('show');
    this.$container.find('.modal-body').html(this._createUlOfAuthors(authors));
  } else {
    alert('Nothing in library!');
  }

  return false;
};

ShowAuthorsUI.prototype._createUlOfAuthors = function (authors) {
  var ul = document.createElement("ul");
  for (var i = 0; i < authors.length; i++) {
    var li = document.createElement("li");
    $(li).text(authors[i]);
    ul.append(li)
  }
  return ul;
};

$(function(){
  window.gShowAuthUI = new ShowAuthorsUI($('#allAuthorModal'));
  window.gShowAuthUI.init();
});
