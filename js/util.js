// create window.bookshelf:
var bookshelf = new Array();

// Enable tooltips everywhere:
$(function() {
  $('[data-toggle="tooltip"]').tooltip()
});

//formate a date methods here:
function parseDate(pubDate) {
  var date = new Date(pubDate);
  // var day = date.getDate();
  var month = date.getMonth();
  var arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sepember', 'October', 'November', 'December']
  month = arr[month]
  var year = date.getFullYear();
  return `${month} ${year}`
}

{/* <tr>
  <th scope="row">${i+1}</th>
  <td><img class="img-thumbnail" src="assets/books/GGatsby.jpg" alt=""></td>
  <td data-toggle="modal" data-target="#synopsisModal">${book.title}</td>
  <td>${book.author}</td>
  <td>${book.genre}</td>
  <td>${book.publishDate}</td>
  <td>${book.numberOfPages}</td>
  <td class='rating-stars'>
    <ul class='stars'>
      <li class='star' data-value='1'>
        <i class='fa fa-star'></i>
      </li>
      <li class='star' data-value='2'>
        <i class='fa fa-star'></i>
      </li>
      <li class='star' data-value='3'>
        <i class='fa fa-star'></i>
      </li>
      <li class='star' data-value='4'>
        <i class='fa fa-star'></i>
      </li>
      <li class='star' data-value='5'>
        <i class='fa fa-star'></i>
      </li>
    </ul>
  </td>
  <td id="edit-delete">
    <i class="far fa-edit fa-lg edit" ></i>
    <i class="far fa-times-circle fa-lg delete" data-title=${book.title}></i>
  </td>
</tr> */}
