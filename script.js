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

let checkbox = document.querySelector("input[type=checkbox]");

function readStatus() {
  if (checkbox.checked) {
    return true;
  }
  if (!checkbox.checked) {
    return false;
  }
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
    removeButton.setAttribute("data-index", i);
    removeButton.setAttribute("class", "remove-btn");
    const content = document.createTextNode("Remove");
    removeButton.appendChild(content);
    bookDiv.appendChild(removeButton);

    removeButton.addEventListener("click", (e) => {
      const dataIndex = e.target.getAttribute("data-index");
      e.target.parentElement.remove();

      myLibrary.splice(dataIndex, 1);
      // eslint-disable-next-line no-plusplus

      const removeButtons = Array.from(
        wrapper.getElementsByClassName("remove-btn")
      );
      const readButtons = Array.from(
        wrapper.getElementsByClassName("read-btn")
      );

      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < removeButtons.length; j++) {
        removeButtons[j].removeAttribute("data-index");
        removeButtons[j].setAttribute("data-index", j);
        readButtons[j].removeAttribute("data-index");
        readButtons[j].setAttribute("data-index", j);
      }
    });

    // toggle book read
    const toggleButton = document.createElement("button");
    toggleButton.setAttribute("class", "read-btn");
    toggleButton.setAttribute("data-index", i);
    const read = document.createTextNode("Read");
    toggleButton.appendChild(read);
    bookDiv.appendChild(toggleButton);

    if (myLibrary[i].read === true) {
      toggleButton.classList.add("read");
    } else toggleButton.classList.add("unread");

    toggleButton.addEventListener("click", (e) => {
      let readIndex = e.target.getAttribute("data-index");
      myLibrary[readIndex].toggleRead();
      if (myLibrary[i].read === true) {
        toggleButton.classList.replace("unread", "read");
      } else if (myLibrary[i].read === false) {
        toggleButton.classList.replace("read", "unread");
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

submitBookButton.addEventListener("click", (e) => {
  e.preventDefault();
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
