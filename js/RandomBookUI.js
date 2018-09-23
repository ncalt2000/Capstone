class RandomBook {
  constructor() {
    this.allBooks = [];
    this.libraryURL = 'http://127.0.0.1:3002/library/'
  }

  _init() {
    this._bindEvents();
    return;
  };

  _bindEvents() {
    $('button#random-book-btn').on('click', this._showRandomBook.bind(this));
    return;
  };

  _createRandomBook(book) {
    this._openRandomBookModal()
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

  _openRandomBookModal() {
    $('#randomBookModal').modal('show');
    return;
  };

  _showRandomBook() {
    let allBooks = gDataTable._getGlobalBooks();
    if (allBooks.length === 0) {
      return null;
    }
    let randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];

    if(randomBook){
      this._openRandomBookModal();
    $('#randomBookModal').find('.modal-body').html(this._createRandomBook(randomBook));
    }
    else {
      alert("Your library is empty!")
    }
    return;
  };

};

$(function() {
  window.gRandomBook = new RandomBook();
  window.gRandomBook._init();
});
