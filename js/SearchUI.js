class Search {
constructor(){

}

_init () {
  this._bindEvents();
  return;
};

_bindEvents () {
  $('button#search-btn').on('click', $.proxy(this._getSearchResults, this));
  // return;
};

_getSearchResults (e) {
  e.preventDefault();
  let allBooks = gDataTable._getGlobalBooks();

  var inputTerm = $("#search-input").val();

  var resultArr = allBooks.filter((book) => {
    var search = inputTerm.toLowerCase();
    return book.title.toLowerCase().indexOf(search) > -1 || book.author.toLowerCase().indexOf(search) > -1 || book.pubDate >= search
  })

  var searchResult = $('<div>', {class:"col-md-12 mt-5 h3 font-weight-bold text-center"});
  searchResult.text(resultArr.length > 0 ? `Search result: ${resultArr.length}` : 'Nothing is found! Try Again...');
  $("#searchResults").empty();
  $("#searchResults").append(searchResult);

  if (resultArr.length > 0) {
    for (var i = 0; i < resultArr.length; i++) {
      var container=$('<div>', {class: 'custom-container'});
      var back = $('<div>', {class: 'back'});
      var columnDiv = $('<div>', {class: 'flipper'});
      var span = $('<span>', {class: 'front'});
      var card = $('<div>', {class: 'card card-inverse card-info animated zoomIn m-5'});
      var bookCover = $('<img>', {class: 'card-img-top book-card'}).text(resultArr[i].cover);
      bookCover.attr("src", `${resultArr[i].cover}`).attr("alt", `${resultArr[i].title} cover`);
      var cardBody = $("<div>", {class: "card-body p-2"});
      var cardTitle = $("<h5>", {class: "card-title "}).text(resultArr[i].title);
      var cardAuthor = $("<h6>", {class: "card-author "}).text(resultArr[i].author);
      var synopsis = $("<p>", {class: "card-text text-justify p-2"}).text(resultArr[i].synopsis);

      span.html(card);
      card.html(bookCover).append(cardBody);
      cardBody.html(cardTitle);
      cardBody.append(cardAuthor)
      resultArr[i].synopsis === "" ? back.html("No Synopsis Available!") : back.html(synopsis);
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

};

$(function() {
  window.gSearch = new Search();
  window.gSearch._init();
});
