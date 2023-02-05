let myLibrary = [
  "Harry Potter",
  "Fight Club",
  "Game of Thrones",
  "Lord of the Rings",
  "IT",
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages}, ${read}`;
  };
}

Book.prototype.toggleRead = function () {};

function addBookToLibrary(bookObj) {
  // eslint-disable-next-line no-alert
  myLibrary.push(bookObj);
}

// loop through array and display books on page
const wrapper = document.querySelector(".wrapper");

function displayBook() {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < myLibrary.length; i++) {
    let bookDiv = document.createElement("div");
    wrapper.appendChild(bookDiv).textContent = myLibrary[i];
  }
}

function createBook() {
  let newBook = new Book();
}

// event listener on button
const addBookButton = document.querySelector(".add-book");

const form = document.querySelector("form");

addBookButton.addEventListener("click", () => {
  form.classList.remove("invisible");
  form.classList.add("visible");
});
