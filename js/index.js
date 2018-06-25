// BUILDING AN API:
// 1. Create a Library obj
var Library = function() {
  // this creates a new private array, that gLib or gLibTwo has a reference to
  this._bookshelf = new Array();
  // this._book = new Book();
};

// 2. Create a Book object:
var Book = function(title, author, pages, date){
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.date = new Date("December 17, 1995")
};
// Methods:

Library.prototype.addBook = function(book) {
  //Purpose: Add a book object to your books array.
  // Return:boolean true if it is not already added, false if it is already added.
  // console.log(book, 'book')
        this._bookshelf.push(bookObj);
        return true;

  // if (bookTitle && typeof bookTitle === 'string') {
  //   this._bookshelf.push(bookTitle)
  //   return "The book has been added!";
  // } else {
  //   console.log('Error!')
  // }
  // return false;
};
Library.prototype.removeBook = function(bookTitle) {
  // Purpose: Remove book from from the books array by its title.
  // Return:boolean true if the book(s) were removed, false if no books match
  if (bookTitle && typeof bookTitle === 'string') {
    for (var i = 0; i < this._bookshelf.length; i++) {
      if (this._bookshelf[i] === bookTitle) {
        // delete this.bookshelf[i];
        this._bookshelf.splice(-1,i);
        return "The book has been deleted!"
      }
    }
  } else {
    return "Error: enter a valid book title!"
  }
};
// Library.prototype.removeBookByAuthor(authorName){
//   // Purpose: Remove a specific book from your books array by the author name.
//   // Return: booleantrue if the book(s) were removed, false if no books match
// };
// Library.prototype.getRandomBook(){
// // Purpose: Return a random book object from your books array
// // Return: book object if you find a book, null if there are no books
// };
// Library.prototype.getBookByTitle(title){
// // Purpose: Return all books that completely or partially matches the string title passed into the function
// // Return: array of book objects if you find books with matching titles, empty array if no books are found
// };
// // 4. create a new instance
// Library.prototype.getBooksByAuthor(authorName){
// // Purpose: Finds all books where the author’s name partially or completely match-es the authorName argument passed to the function.
// //Return:array of books if you find books with match authors, empty array if no books match
// };
// Library.prototype.addBooks(books){
// // Purpose: Takes multiple books, in the form of an array of book objects, and adds the objects to your books array.
// // Return: number number of books successfully added, 0 if no books were added
// };
// Library.prototype.getAuthors(){
// // Purpose: Find the distinct authors’ names from all books in your library
// // Return: array of strings the names of all distinct authors, empty array if no books exist or if no authors exist
// };
// Library.prototype.getRandomAuthorName(){
// // Purpose: Retrieves a random author name from your books collection
// // Return: string author name, null if no books exist
// };

document.addEventListener('DOMContentLoaded', function() {
  // console.log(gLibrary);
  window.gLibrary = new Library();
  // window.bookObj = new Book('IT', 'S.King', 234, 'December 25, 2000');
  window.bookObj = new Book('Harry Potter', 'S.King', 234, 'December 25, 2000');


});
