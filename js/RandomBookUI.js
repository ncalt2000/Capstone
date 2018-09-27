class RandomBookOrAuthor {
  constructor() {

  }

  _init() {
    this._bindEvents();
  };

  _bindEvents() {
    $('button#random-book-btn').on('click', this._showRandomBook.bind(this));
    $('button#random-author-btn').on('click', this._showRandomAuthor.bind(this));
  };

  _createRandomBook(book) {
    // $('#randomBookModal').modal('show');
    var form = $('<form>', {'class': 'form-inline'})
    var image = $('<img>', {
      'class': 'img-thumbnail col-md-4',
      // 'src': 'book.cover',  //uncomment later
      'alt': 'random cover'
    })
    var div = $('<div>', {'class': 'col-md-6'});

    // image.text(book.cover);
    var title = $('<h5>').text(book.title);
    var author = $('<h6>').text(book.author);
    var genre = $('<h6>').text(book.genre);
    var pages = $('<h6>').text(book.pages);
    var synopsis = $('<h6>').text(book.synopsis);
    div.append(title).append(author).append(genre).append(pages).append(synopsis);
    // form.append(image).append(div);
    form.append(div);
    return form;
  };

  _showRandomBook() {
    let allBooks = gDataTable._getGlobalBooks();
    if (allBooks.length === 0) {
      return null;
    }
    let randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];

    if(randomBook){
      $('#randomBookModal').modal('show');
      $('#randomBookModal').find('.modal-body').html(this._createRandomBook(randomBook));
    }
    else {
      alert("Your library is empty!")
    }
    return;
  };

  _createRandomAuthor(randomAuthorName){
    const form = $('<form>', {'class': 'form-inline'})
    const author = $('<h4>').text(randomAuthorName);
    form.append(author);
    return form;
  }

  _showRandomAuthor(){
    let allBooks = gDataTable._getGlobalBooks();
    let randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
    if(randomBook){
      $('#randomAuthorModal').modal('show');
      $('#randomAuthorModal').find('.modal-body').html(this._createRandomAuthor(randomBook.author));
    }
    return;
  }

};

$(function() {
  window.gRandomBook = new RandomBookOrAuthor();
  window.gRandomBook._init();
});
