/* eslint-disable max-classes-per-file */
// eslint-disable-next-line prefer-const

const checkbox = document.querySelector("input[type=checkbox]");
const wrapper = document.querySelector(".wrapper");
const addBookButton = document.querySelector(".add-book");
const form = document.querySelector("form");
const submitBookButton = form.querySelector("button");

class Library {
  constructor() {
    this.books = [];
  }

  addBookToLibrary(bookObj) {
    this.books.push(bookObj);
  }
}

const myLibrary = new Library();

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  get info() {
    return `${this.title} by ${this.author}, ${this.pages} pages.`;
  }

  toggleRead() {
    if (this.read === false) {
      this.read = true;
    } else this.read = false;
  }

  static readStatus() {
    if (checkbox.checked) return true;
  }

  displayBook() {
    wrapper.innerHTML = "";
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < myLibrary.books.length; i++) {
      // book div
      const bookDiv = document.createElement("div");
      bookDiv.setAttribute("class", "book-card");
      wrapper.appendChild(bookDiv).innerHTML = this.info;

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

        myLibrary.books.splice(dataIndex, 1);
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

      const toggleButton = document.createElement("button");
      toggleButton.setAttribute("class", "read-btn");
      toggleButton.setAttribute("data-index", i);

      bookDiv.appendChild(toggleButton);

      if (myLibrary.books[i].read === true) {
        toggleButton.classList.add("read");
        toggleButton.innerHTML = "Read!";
      } else {
        toggleButton.classList.add("unread");
        toggleButton.innerHTML = "Not read!";
      }

      toggleButton.addEventListener("click", (e) => {
        const readIndex = e.target.getAttribute("data-index");
        myLibrary.books[readIndex].toggleRead();
        if (myLibrary.books[i].read === true) {
          toggleButton.classList.replace("unread", "read");
          toggleButton.innerHTML = "Read!";
        } else if (myLibrary.books[i].read === false) {
          toggleButton.classList.replace("read", "unread");
          toggleButton.innerHTML = "Not read!";
        }
      });
    }
  }
}

function clearForm() {
  form.reset();
}

submitBookButton.addEventListener("click", () => {
  // e.preventDefault();
  const newBook = new Book(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    Book.readStatus()
  );

  myLibrary.addBookToLibrary(newBook);
  newBook.displayBook();
  clearForm();
  form.classList.remove("visible");
  submitBookButton.checkValidity();
  submitBookButton.reportValidity();
});

addBookButton.addEventListener("click", () => {
  form.classList.add("visible");
});
