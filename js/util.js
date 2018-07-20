// create window.bookshelf:
var bookshelf = new Array();

// Enable tooltips everywhere:
$(function() {
  $('[data-toggle="tooltip"]').tooltip()
});

//formate a date methods here:
function parseDate(pubDate) {
  var date = new Date(pubDate);
  var month = date.getMonth();
  var arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sepember', 'October', 'November', 'December']
  month = arr[month]
  var year = date.getFullYear();
  return `${month} ${year}`
};

function parseFormDate (pubDate) {
  var date = new Date(pubDate);
  var month = (date.getMonth()+1).toString().padStart(2, '0');
  var day = date.getDay().toString().padStart(2, '0');
  var year = date.getFullYear();
  return `${year}-${month}-${day}`
};
