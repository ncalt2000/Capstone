export default class RandomBookOrAuthor {
  _init() {
    this._bindEvents();
  }

  _bindEvents() {
    $('button#random-book-btn').on('click', this._showRandomBook.bind(this));
    $('button#random-author-btn').on('click', this._showRandomAuthor.bind(this));
    $('button#showAllAuthorsBtn').on('click', this._handleShowAuthors.bind(this));
  }

  _createRandomBook(book) {
    const form = $('<form>', { class: 'form-inline' });
    const image = $('<img>', {
      class: 'img-thumbnail col-md-4',
      src: `${book.cover}`,
      alt: `${book.title} cover`,
      style: 'width: 50px'
    });
    const div = $('<div>', { class: 'col-md-8' });

    image.text(book.cover);
    const title = $('<h5>', {class: 'my-1 font-weight-bold'}).text(book.title);
    const author = $('<h6>').text(book.author);
    const synopsis = $('<h6>').text(book.synopsis);
    div.append(title).append(author).append(synopsis);
    form.append(image).append(div);
    form.append(div);
    return form;
  }

  _showRandomBook() {
    const allBooks = window.gDataTable.allBooks;
    const randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];

    if (randomBook) {
      $('#randomBookModal').modal('show');
      $('#randomBookModal').find('.modal-body').html(this._createRandomBook(randomBook));
      $('#randomBookModal').find('.modal-title').html('Universe Suggests you to read...');
    } else {
      $('#book-table').empty();
      const message = $('<h1>', { class: 'text-danger text-center' }).html('Your Library is Empty!  🙁');
      $('#book-table').append(message);
    }
  }

  _showRandomAuthor() {
    const allBooks = window.gDataTable.allBooks;
    const randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
    if (randomBook) {
      const body = $('<div>');
      const author = $('<h4>', { class: 'text-center' }).text(randomBook.author);
      const list = $('<ol>');
      allBooks.filter(book => book.author === randomBook.author)
        .forEach(bookByAuthor => {
          const listItem = $('<li>');
          listItem.text(bookByAuthor.title);
          list.append(listItem);
        });
      const text = $('<p>').text('And this author\'s books:');
      body.append(author).append(text).append(list);
      $('#randomBookModal').modal('show');
      $('#randomBookModal').find('.modal-body').html(body);
      $('#randomBookModal').find('.modal-title').html('Universe sends you ...');
    } else {
      $('#book-table').empty();
      const message = $('<h1>', { class: 'text-danger text-center' }).html('Your Library is Empty!  🙁');
      $('#book-table').append(message);
    }
  }

  _handleShowAuthors() {
    const allBooks = window.gDataTable.allBooks;
    const resultArr = [];
    for (var i = 0; i < allBooks.length; i++) {
      resultArr.push(allBooks[i].author);
    }

    const finalArr = resultArr.reduce((a, b) => {
      if (a.indexOf(b) < 0) {
        a.push(b);
      }
      return a;
    }, []);

    if (finalArr.length) {
      const ol = $('<ol>');
      for (var y = 0; y < finalArr.length; y++) {
        const li = $('<li>');
        $(li).text(finalArr[y]);
        ol.append(li);
      }
      $('#randomBookModal').modal('show');
      $('#randomBookModal').find('.modal-body').html(ol);
      $('#randomBookModal').find('.modal-title').html('Authors in your Universe: ');
    } else {
      $('#book-table').empty();
      const message = $('<h1>', { class: 'text-danger text-center' }).html('Your Library is Empty!  🙁');
      $('#book-table').append(message);
    }
  }
}
