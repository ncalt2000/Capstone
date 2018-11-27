export default class Search {

  _init() {
    this._bindEvents();
  }

  _bindEvents() {
    $('button#search-btn').on('click', this._getSearchResults.bind(this));
  }

  _bindCustomEvents() {
    $('button#clearSearchResults').on('click', this._clearSearchResults.bind(this));
  }

  _clearSearchResults() {
    $('#searchResults').empty();
    window.location='/public/#body';
  }

  _getSearchResults(e) {
    e.preventDefault();
    const allBooks = window.gDataTable.allBooks;

    const inputTerm = $('#search-input').val();

    const resultArr = allBooks.filter((book) => {
      const search = inputTerm.toLowerCase();
      return book.title.toLowerCase().indexOf(search) > -1 || book.author.toLowerCase().indexOf(search) > -1 || book.pubDate >= search;
    });

    const searchResult = $('<div>', { class: 'col-md-12 mt-5 h3 font-weight-bold text-center animated fadeIn' });
    searchResult.text(resultArr.length > 0 ? `Search result: ${resultArr.length}` : 'Nothing is found! Try Again...');
    $('#searchResults').empty();
    $('#searchResults').append(searchResult);

    if (resultArr.length > 0) {
      for (let i = 0; i < resultArr.length; i++) {
        const media = $('<div>', {class: 'media w-100 shadow p-3 m-2 bg-beige rounded animated zoomIn'});
        const bookCover = $('<img>', { class: 'align-self-center mr-3', src: `${resultArr[i].cover}`, style: 'width: 80px' });
        const mediaBody = $('<div>', {class: 'media-body'});
        const cardTitle = $('<h5>', { class: 'my-1 font-weight-bold' }).text(resultArr[i].title);
        const cardAuthor = $('<h6>', { class: 'mt-0 font-italic' }).text(`by ${resultArr[i].author}`);
        const synopsis = $('<p>').text(resultArr[i].synopsis);

        resultArr[i].synopsis === '' ? synopsis.html('No Synopsis Available!') : synopsis.html(resultArr[i].synopsis);

        media.append(bookCover).append(mediaBody);
        mediaBody.append(cardTitle).append(cardAuthor).append(synopsis);

        $('#searchResults').append(media);
      }
      const bottomDiv = $('<div>', { class: 'col-md-12 mt-3 d-flex justify-content-end' });
      const clearResultsBtn = $('<button>', { class: 'col-2 btn btn-warning font-weight-bold shadow', text: 'Clear the Results', id: 'clearSearchResults' });
      bottomDiv.append(clearResultsBtn);
      $('#searchResults').append(bottomDiv);
    }

    window.location = '/public/#mainDivStart';
    $('#search-input').val('');
    this._bindCustomEvents();
  }
}
