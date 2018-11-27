export default class RateBook {
  constructor() {
    // this.libraryURL = `${process.env.CONNECTION_PATH_REST}/library`;
    this.libraryURL = 'http://localhost:3002'
    this.bookId = null;
    this._rateBook = (e) => {
      this.bookId = $(e.target).data('id');
      const onStar = parseInt($(e.target).data('value'), 10);

      $.ajax({
        url: `${this.libraryURL}/library/${this.bookId}`,
        method: 'PUT',
        dataType: 'json',
        headers: { 'x-access-token': sessionStorage.getItem('jwt_token') },
        data: { rating: onStar },
        success: (data) => {
          if (data) {
            window.gDataTable._getAllBooks();
          } else {
            window.gDataTable.ifNotLoggedIn();
          }
        },
      });
    };
  }

}
