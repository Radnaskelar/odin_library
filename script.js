// eslint-disable-next-line prefer-const
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages.`;
  };
}

Book.prototype.toggleRead = function () {
  if (this.read === false) {
    this.read = true;
  } else this.read = false;
};

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
    myLibrary[i].index = myLibrary.indexOf(myLibrary[i]);

    // book div
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("class", "book-card");
    wrapper.appendChild(bookDiv).innerHTML = myLibrary[i].info();

    // book remove button
    const removeButton = document.createElement("button");
    removeButton.setAttribute("data-index", myLibrary.indexOf(myLibrary[i]));
    const content = document.createTextNode("Remove");
    removeButton.appendChild(content);
    bookDiv.appendChild(removeButton);
    removeButton.addEventListener("click", () => {
      bookDiv.remove();

      const dataIndex = removeButton.getAttribute("data-index");

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

    // toggle book read
    const toggleButton = document.createElement("button");
    toggleButton.setAttribute("class", "read unread");
    const read = document.createTextNode("Read");
    toggleButton.appendChild(read);
    bookDiv.appendChild(toggleButton);

    toggleButton.addEventListener(
      "click",
      () => (myLibrary[i].toggleRead())
    );
  }
}

// event listener on submit button
const addBookButton = document.querySelector(".add-book");

const form = document.querySelector("form");

const submitBookButton = form.querySelector("button");

function clearForm() {
  form.reset();
}

let checkbox = document.querySelector("input[type=checkbox]");

function readStatus() {
  if (checkbox.checked) {
    return true;
  } if (!checkbox.checked) {
    return false;
  }
}

submitBookButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newBook = new Book(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    readStatus()
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
