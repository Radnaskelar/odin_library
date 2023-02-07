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

Book.prototype.toggleRead = function () {};

function addBookToLibrary(bookObj) {
  // eslint-disable-next-line no-alert
  myLibrary.push(bookObj);
}

// loop through array and display books on page
const wrapper = document.querySelector(".wrapper");

function displayBook() {
  wrapper.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let bookDiv = document.createElement("div");
    bookDiv.setAttribute("data-index", myLibrary.indexOf(myLibrary[i]));
    wrapper.appendChild(bookDiv).innerHTML = myLibrary[i].info();
    const removeButton = document.createElement("button");
    removeButton.setAttribute("data-index", myLibrary.indexOf(myLibrary[i]));
    const content = document.createTextNode("Remove");
    removeButton.appendChild(content);
    bookDiv.appendChild(removeButton);
  }
}

// event listener on submit button
const addBookButton = document.querySelector(".add-book");

const form = document.querySelector("form");

const submitBookButton = form.querySelector("button");

submitBookButton.addEventListener("click", (event) => {
  event.preventDefault();
  let newBook = new Book(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").value
  );
  console.log(newBook);
  addBookToLibrary(newBook);
  displayBook();
  clearForm();
  form.classList.remove("visible");
});

// display form button
addBookButton.addEventListener("click", () => {
  form.classList.add("visible");
});

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").value = "";
}
