var Search = function() {
  Library.call(this);
  this.$container = $('#banner');
};
Search.prototype = Object.create(Library.prototype);

Search.prototype.init = function() {
  this._bindEvents();
  return;
};
Search.prototype._bindEvents = function() {
  $('button#search-btn').on('click', $.proxy(this._getSearchResults, this));
  // return;
};

Search.prototype._getSearchResults = function(e) {
  e.preventDefault();

  var inputTerm = $("#search-input").val();
  // console.log(inputTerm, 'input');
  var result = this.search(inputTerm);
  // console.log(result, 'result');
  var searchResult = $("<div>", {class:"col-md-12 mb-4 text-white font-weight-bold text-center"});
  searchResult.text(result.length > 0 ? `Found: ${result.length}` : 'Nothing is found! Try Again...');
  $("#searchResults").empty();
  $("#searchResults").append(searchResult);

  if (result.length > 0) {
    for (var i = 0; i < result.length; i++) {
      var container=$('<div>', {class: 'custom-container'});
      var back = $('<div>', {class: 'front back text-center'});
      var columnDiv = $('<div>', {class: "col-md-10 flipper"});
      var span = $('<span>', {class: 'front'});
      var cardDiv = $('<div>', {class: 'card card-inverse card-info animated zoomIn'});
      var bookCover = $('<img>', {class: 'card-img-top book-card'}).text(result[i].cover);
      bookCover.attr("src", "assets/books/hkeller.jpg").attr("alt", "Book Cover");
      var innerDiv = $("<div>", {class: "card-block p-2"});
      var cardTitle = $("<h5>", {class: "card-title "}).text(result[i].title);
      var cardAuthor = $("<h6>", {class: "card-author "}).text(result[i].author);
      var cardText = $("<p>", {class: "card-text"}).text(result[i].synopsis);

      span.html(cardDiv);
      cardDiv.html(bookCover).append(innerDiv);
      innerDiv.html(cardTitle);
      innerDiv.append(cardAuthor)
      back.html(cardText);
      columnDiv.append(back);
      columnDiv.append(span)
      container.append(columnDiv);

      $("#searchResults").append(container);
    }
  }
  window.location='/#mainDivStart';
$("#search-input").val('');

return;
};

$(function() {
  window.gSearch = new Search();
  window.gSearch.init();
});
