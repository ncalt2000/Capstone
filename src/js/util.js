
// from 02/01/2000 into "February 2000":
export function parseDate(pubDate) {
  // console.log("parseDate function");
  const date = new Date(pubDate);
  let month = date.getMonth();
  const arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sepember', 'October', 'November', 'December'];
  month = arr[month];
  const year = date.getFullYear();
  return `${month} ${year}`;
}

// from "February 2000" into 02/01/2000:
export function parseFormDate(pubDate) {
  // console.log("it's working");
  const date = new Date(pubDate);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDay().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export function Book(cover, title, author, genre, pages, publishDate, rating, deleteCol, synopsis, edit) {
  this.cover = cover;
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.publishDate = new Date(String(publishDate));
  this.rating = rating;
  this.deleteCol = deleteCol;
  this.synopsis = synopsis;
  this.edit = edit;
};

export function renderSuccessModal(){
  $('#success-modal').modal('show');
  setTimeout(() => {
    $('#success-modal').removeClass('zoomIn');
    $('#success-modal').addClass('zoomOut');
  }, 1000);
  setTimeout(() => {
    $('#success-modal').modal('hide');
    $('#success-modal').removeClass('zoomOut');
    $('#success-modal').addClass('zoomIn');
  }, 1500);
}
