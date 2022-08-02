// Book Clas
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
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
    //   Delete Book
    static deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }

    

  //   Clear Fields
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
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
const form = document.querySelector("#book-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  
  
  if(title === "" || author === "" || isbn === ""){
    alert("Please fill in all fields");
  }
  else{
    const book = new Book(title, author, isbn);
    // Add Book to UI
    UI.addBookToList(book);
    // Clear Input Fields
    UI.clearFields();
  }
  
});

// Events for Removing books
document.querySelector(".book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target);
    
})