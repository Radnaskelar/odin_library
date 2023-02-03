let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages}, ${read}`;
  };
}

function addbookToLibrary(bookObj) {
  // eslint-disable-next-line no-alert
  myLibrary.push(bookObj);
}
