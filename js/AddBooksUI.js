class AddBooksUI {
  constructor() {
    this._tempBookshelf = new Array();
    this._encodedImg;
    this.libraryURL = 'http://127.0.0.1:3002/library/'
  }

  _init() {
    this._bindEvents();
  };

  _bindEvents() {
    $('button#add-book-btn').on('click', this._handleModalOpen.bind(this));
    $('button#add-another-btn').on('click', this._bookInLine.bind(this));
    $('button#save-book-btn').on('click', this._saveBook.bind(this));
    $('button#cancelAdd').on('click', this._cancelAdd.bind(this));
    $('button#cancel-adding').on('click', this._cancelAdd.bind(this));
  };

  _cancelAdd(){
    $('#addBookModal').modal('hide');
    $('#title-text').removeClass('required');
    $('#author').removeClass('required');
    $('.booksInLine').empty();
    $('#add-book-form')[0].reset();
  }

  _handleModalOpen() {
    let isLoggedIn = window.gHome.isLoggedIn;
    if (isLoggedIn){
      $('#addBookModal').modal('show');
    } else {
      gDataTable.ifNotLoggedIn();
    }
  }

  _getFieldsFromModal () {
    let fieldsData = $('#add-book-form').serializeArray();
    let oData = new Object();
    fieldsData.map((item, index) => {
      oData[item.name] = item.value;
    })
    return oData;
  };

  _bookInLine() {

    const bookData = this._getFieldsFromModal ();
    let noBookCover = '../assets/books/noCover.jpg';

    if (bookData.title === "") {
      $('#title-text').addClass('required');
      var errorMessage = $('<p>', {class: 'text-danger'});
      errorMessage.text("Please complete missing fields");
      $('.booksInLine').html(errorMessage);
      return;
    }
    if (bookData.author === "") {
      $('#title-text').removeClass('required');
      $('#author').addClass('required');
      var errorMessage = $('<p>', {class: 'text-danger'});
      errorMessage.text("Please complete missing fields");
      $('.booksInLine').html(errorMessage);
      return;
    }

    $('#title-text').removeClass('required');
    $('#author').removeClass('required');

   const file = document.querySelector('#file-upload').files[0];
   const reader = new FileReader();
   if (file) {
     reader.readAsDataURL(file);
     console.log(reader, "READER");
     reader.onload = function() {
       // console.log(reader.result);
       bookData.cover = reader.result;
     };
   } else {
     bookData.cover = noBookCover;
   }

   for (var i = 0; i < gDataTable.allBooks.length; i++) {
     if(gDataTable.allBooks[i].title === bookData.title && gDataTable.allBooks[i].author === bookData.author){
       $('#failure-modal').modal('show');
       $('#failure-modal').find('.modal-footer').html("This title and author already exist in the Library!");
       return;
     }
   }
    this._tempBookshelf.push(bookData);
    // console.log(this._tempBookshelf, "TEMP SHelf");

    const booksToAdd = $('<p>', {'class': 'booksToAdd text-success'});
      booksToAdd.text(`Books to be added: ${this._tempBookshelf.length}`);
      $('.booksInLine').html(booksToAdd);
      $('#add-book-form')[0].reset();
  };

  _saveBook() {
    this._bookInLine();

    setTimeout(() => {
      $.ajax({
        url: this.libraryURL,
        method: 'POST',
        dataType: 'json',
        headers: {"x-access-token": localStorage.getItem("jwt_token")},
        data: { bookshelf: this._tempBookshelf },
        success: (data) => {
          gDataTable._getAllBooks();

          $('#success-modal').modal('show');
          setTimeout(function () {
            $('#success-modal').removeClass('zoomIn');
            $('#success-modal').addClass('zoomOut');
          }, 1000);
          setTimeout(function () {
            $('#success-modal').modal('hide');
            $('#success-modal').removeClass('zoomOut');
            $('#success-modal').addClass('zoomIn');
          }, 1500);

          this._tempBookshelf = new Array();
          $('#add-book-form')[0].reset();
          $('.booksInLine').empty();
          $('#addBookModal').modal('hide');
          console.log(data, 'log 2: back from DB');
        },
        error: ()  => {
          $('#failure-modal').modal('show')
          var errorMessage = $('<p>', {class: 'text-danger'});
          errorMessage.text("Oops! Something went wrong! Please try again!");
          $('#failure-modal').find('.modal-footer').html(errorMessage);
          $('.booksInLine').empty();
          this._tempBookshelf = new Array();
        },
      })
    }, 100);
  };

};


$(function() {
  window.gAddBooksUI = new AddBooksUI();
  window.gAddBooksUI._init();
});
