class ShowAuthorsUI {
  constructor(){


  }

_init () {
  this._bindEvents();
  return;
};

_bindEvents () {
  $('button#showAllAuthorsBtn').on('click', this._handleShowAuthors.bind(this));
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
    $('#allAuthorsModal').modal('show');
    $('#allAuthorsModal').find('.modal-body').html(this._createUlOfAuthors(finalArr));
  }
  else {
    $('#book-table').empty();
    var message = $('<h1>', {class: 'text-danger text-center' }).html("Your Library is Empty!  🙁")
    $('#book-table').append(message);
  }
  return;
};

_createUlOfAuthors (authors){
  const ol = $('<ol>');
  for (var i = 0; i < authors.length; i++) {
    const li = $('<li>');
    $(li).text(authors[i]);
    ol.append(li);
  }
  return ol;
};

};

$(function(){
  //creating a new instance here will create a new instance of library
  //can access anything on the Library
  //creating references to original - sorta protects it

  // window.gShowAuthUI = new ShowAuthorsUI(); //first round of code

  gShowAuthUI = new ShowAuthorsUI();//refactored to make a holding variable
  //initialize with your init function
  gShowAuthUI._init();
});
