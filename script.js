// eslint-disable-next-line prefer-const
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
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < myLibrary.length; i++) {
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("class", "book-card");

    wrapper.appendChild(bookDiv).innerHTML = myLibrary[i].info();

    const removeButton = document.createElement("button");

    myLibrary[i].index = myLibrary.indexOf(myLibrary[i]);

    removeButton.setAttribute("data-index", myLibrary.indexOf(myLibrary[i]));

    const content = document.createTextNode("Remove");
    removeButton.appendChild(content);

    bookDiv.appendChild(removeButton);

    removeButton.addEventListener("click", () => {
      bookDiv.remove();

      let dataIndex = removeButton.getAttribute("data-index");
      console.log(dataIndex);
      myLibrary.splice(dataIndex, 1);
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < myLibrary.length; j++) {
        myLibrary[j].index = myLibrary.indexOf(myLibrary[j]);
        Array.from(wrapper.getElementsByTagName("button")).forEach((element) =>
          element.removeAttribute("data-index")
        );
        Array.from(wrapper.getElementsByTagName("button")).forEach((element) =>
          element.setAttribute("data-index", myLibrary.indexOf(myLibrary[j]))
        );
      }
    });
  }
}

// event listener on submit button
const addBookButton = document.querySelector(".add-book");

const form = document.querySelector("form");

const submitBookButton = form.querySelector("button");

function clearForm() {
  form.reset();
}

submitBookButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newBook = new Book(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").value
  );

  addBookToLibrary(newBook);
  displayBook();
  clearForm();
  form.classList.remove("visible");
});

// display form button
addBookButton.addEventListener("click", () => {
  form.classList.add("visible");
});
