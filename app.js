// Book Clas
class Book {
  constructor(title, author, isbn) {
    title = this.title;
    author = this.author;
    isbn = this.isbn;
  }
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

  static displayBooks() {
    const StoredBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: "123",
      },
      {
        title: "Cake Baker",
        author: "Evelyn",
        isbn: "456",
      },
    ];
    const books = StoredBooks;
    books.forEach((book) => UI.addBookToList(book));
  }
}
// Store Class
// Event to Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Events for Adding and Removing books
