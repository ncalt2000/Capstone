export default class SortBook {
  constructor() {
    this.bookId = null;
    this._sortBy = e => {
      const val = $(e.target).data('sort');
      // console.log(val, "VALUE");
      window.gDataTable.allBooks.sort((a, b) => {
        if (typeof a[val] === 'number') {
          return b[val] - a[val];
        }
        const itemA = a[val].toLowerCase();
        const itemB = b[val].toLowerCase();
        if (itemA < itemB) // sort string ascending
        { return -1; }
        if (itemA > itemB) return 1;
        return 0; // default return value (no sorting)
      });
      window.gDataTable._updateTable();
    };
  }

  _init() {
    window.gDataTable._bindEvents();
  }
}
