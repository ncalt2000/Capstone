var ShowAuthorsUI = function(container) {
  // placeholder for #allAuthorModal
  this.$container = container;
  Library.call(this);//set the this keyword to Library so that we can call anything in the library using 'this': "resetting scope"
};

//make a new reference to the Library
ShowAuthorsUI.prototype = Object.create(Library.prototype);

//make an initialization function - put things you want immediately loaded here
ShowAuthorsUI.prototype.init = function () {
  //separate concerns - recover should be in the Library not here
  //use return to make sure the function finishes
    // this is my call to get stuff out of local storage
  // this.getAuthorsFromStorage();
  this._bindEvents();
  return;
};

//function to bind jquery events to button
ShowAuthorsUI.prototype._bindEvents = function () {
  //using proxy to force 'this' to be the scope and not the element
  //use id on my button to bind to a click event
  $('button#showAllAuthorsBtn').on('click', $.proxy(this._handleShowAuthors, this));
  return;
};

//function to show authors
ShowAuthorsUI.prototype._handleShowAuthors = function () {
  //console.log(this.getAuthors());
  //make a holding array for the results of getAuthors
  // var authors = this.getAuthors();
  var authors = this.getAuthorsFromStorage();
  //if there are authors in the array, show the modal and append <li>
  // console.log(authors);

  if(authors.length){
    this.$container.modal('show');
    //use _createUlOfAuthors to make this function less complecated
    //find the class labelled modal body and add html
    this.$container.find('.modal-body').html(this._createUlOfAuthors(authors));
  }
  else {
    alert('Nothing in library!')
  }
  return;
};

ShowAuthorsUI.prototype._createUlOfAuthors = function (authors){
  // console.log(authors);

  //create unordered list
  var ul = document.createElement('ul');
  //for elements returned from getAuthors create an <li> with text from getAuthors
  for (var i = 0; i < authors.length; i++) {
    //create element
    var li = document.createElement('li');
    //add text
    $(li).text(authors[i]);
    //append to ul element
    ul.append(li);
  }
  return ul;
};


//use singleton to start up the process
$(function(){
  //creating a new instance here will create a new instance of library
  //can access anything on the Library
  //creating references to original - sorta protects it

  // window.gShowAuthUI = new ShowAuthorsUI(); //first round of code

  window.gShowAuthUI = new ShowAuthorsUI($('#allAuthorsModal'));//refactored to make a holding variable
  //initialize with your init function
  window.gShowAuthUI.init();
  // window.gShowAuthUI.getAuthorsFromStorage();
  // window.gShowAuthUI._createUlOfAuthors();
});
