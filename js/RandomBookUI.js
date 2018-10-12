class RandomBookOrAuthor {

  _init() {
    this._bindEvents();
  };

  _bindEvents() {
    $('button#random-book-btn').on('click', this._showRandomBook.bind(this));
    $('button#random-author-btn').on('click', this._showRandomAuthor.bind(this));
    $('button#showAllAuthorsBtn').on('click', this._handleShowAuthors.bind(this));
  };

  _createRandomBook(book) {
    var form = $('<form>', {'class': 'form-inline'})
    var image = $('<img>', {
      'class': 'img-thumbnail col-md-4',
      'src': `${book.cover}`,
      'alt': 'random book cover'
    })
    var div = $('<div>', {'class': 'col-md-6'});

    image.text(book.cover);
    var title = $('<h5>').text(book.title);
    var author = $('<h6>').text(book.author);
    var genre = $('<h6>').text(book.genre);
    var pages = $('<h6>').text(book.pages);
    var synopsis = $('<h6>').text(book.synopsis);
    div.append(title).append(author).append(genre).append(pages).append(synopsis);
    form.append(image).append(div);
    form.append(div);
    return form;
  };

  _showRandomBook() {
    let allBooks = gDataTable._getGlobalBooks();
    let randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];

    if(randomBook){
      $('#randomBookModal').modal('show');
      $('#randomBookModal').find('.modal-body').html(this._createRandomBook(randomBook));
      $('#randomBookModal').find('.modal-title').html('Universe Suggests ...')
    }
    else {
      $('#book-table').empty();
      var message = $('<h1>', {class: 'text-danger text-center' }).html("Your Library is Empty!  🙁")
      $('#book-table').append(message);
    }
    return;
  };

  _showRandomAuthor(){
    let allBooks = gDataTable._getGlobalBooks();
    let randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
    if(randomBook){
      const body = $('<div>', {'class': 'text-center'})
      const author = $('<h4>').text(randomBook.author);
      body.append(author);
      $('#randomBookModal').modal('show');
      $('#randomBookModal').find('.modal-body').html(body);
      $('#randomBookModal').find('.modal-title').html('Universe sends you ...')
    }
    return;
  };

  _handleShowAuthors () {
    let allBooks = gDataTable._getGlobalBooks();
    var resultArr = [];
    for (var i = 0; i < allBooks.length; i++) {
      resultArr.push(allBooks[i]['author']);
    }

    var finalArr = resultArr.reduce(function(a, b) {
      if (a.indexOf(b) < 0) {
        a.push(b)
      }
      return a;
    }, [])

    if(finalArr.length){
      const ol = $('<ol>');
      for (var i = 0; i < finalArr.length; i++) {
        const li = $('<li>');
        $(li).text(finalArr[i]);
        ol.append(li);
      }
      $('#randomBookModal').modal('show');
      $('#randomBookModal').find('.modal-body').html(ol);
      $('#randomBookModal').find('.modal-title').html('Authors in your Universe: ')
    }
    else {
      $('#book-table').empty();
      var message = $('<h1>', {class: 'text-danger text-center' }).html("Your Library is Empty!  🙁")
      $('#book-table').append(message);
    }
    return;
  };


};

$(function() {
  window.gRandomBook = new RandomBookOrAuthor();
  window.gRandomBook._init();
});
