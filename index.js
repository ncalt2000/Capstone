import {
  parseDate,
  parseFormDate,
  Book,
} from "./src/js/util.js";
import DataTable from "./src/js/UpdateTable.js";
import AddBooksUI from "./src/js/AddBook.js";
import DeleteBook from "./src/js/DeleteBook.js";
import EditBook from "./src/js/EditBook.js";
import RateBook from "./src/js/RateBook.js";
import SortBook from "./src/js/SortBook.js";
import RandomBookOrAuthor from "./src/js/RandomControl.js";
import Search from "./src/js/Search.js";
import Auth from "./src/js/auth.js";
import Home from "./src/js/home.js";
import "./public/css/vendor/bootstrap.css" ;
import "./public/css/vendor/animate.css" ;
import "./public/css/vendor/web-fonts-with-css/css/fontawesome-all.css" ;
import "./public/css/main-styles.css";


$(() => {
  $('[data-toggle="tooltip"]').tooltip();

  window.gDataTable = new DataTable();
  window.gDataTable._init();

  window.gAddBooksUI = new AddBooksUI();
  window.gAddBooksUI._init();

  window.gDeleteBook = new DeleteBook();

  window.gEditBook = new EditBook();

  window.gRateBook = new RateBook();

  window.gSortBook = new SortBook();
  window.gSortBook._init();

  window.gRandomBook = new RandomBookOrAuthor();
  window.gRandomBook._init();

  window.gSearch = new Search();
  window.gSearch._init();

  window.gAuth = new Auth();
  window.gAuth._bindEvents();

  window.gHome = new Home();
  window.gHome._isLoggedIn();
  if (window.gHome.isLoggedIn) {
    window.gHome._getUserFromStorage();
    window.gHome._switchLogInHeader();
    window.gHome._bindEvents();
  }
});
