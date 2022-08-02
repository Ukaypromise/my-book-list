// Book Clas
// class Book {
//   constructor(title, author, isbn) {
//     this.title = title;
//     this.author = author;
//     this.isbn = isbn;
//   }
// }

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Class
class UI {
  static addBookToList(book) {
    const list = document.querySelector(".book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);
  }
  //   Delete Book
  static deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }

  // Throw Alert
  static throwAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // Set Timeout
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  //   Clear Fields
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static displayBooks() {
    const StoredBooks = Store.getBooks(); // First initialized as an Array of books
    const books = StoredBooks;
    books.forEach((book) => UI.addBookToList(book));
  }
}
// Store Class
class Store {
  // Get Books
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  // Add Book
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  // Remove Book
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
// Event to Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Events for Adding and Removing books
const form = document.querySelector("#book-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  // Validates all fields
  if (title === "" || author === "" || isbn === "") {
    UI.throwAlert("Please fill in all fields", "danger");
  } else {
    const book = new Book(title, author, isbn);
    // Add Book to UI
    UI.addBookToList(book);
    // Add Book to Store
    Store.addBook(book);
    // Show success message
    UI.throwAlert("Your Book is Added", "success");
    // Clear Input Fields
    UI.clearFields();
  }
});

// Events for Removing books
document.querySelector(".book-list").addEventListener("click", (e) => {
  // Remove Book from UI
  UI.deleteBook(e.target);
  // Remove Book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Throw Alert
  UI.throwAlert("Your book is deleted", "success");
});
