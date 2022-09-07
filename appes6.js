'use strict'

// === Book Constructor ===
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// === UI Constructor ===
class UI {
  constructor() { }
  // === Add book to list ===
  addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
    list.appendChild(row);
  }
  // === delete book ===
  deleteBook(target) {
    if (target.className === 'delete') {
      window.confirm('Are your sure you want to remove book?');
      target.parentElement.parentElement.remove()
    }
  }
  // === Clear Field ===
  clearField() {
    document.getElementById('title').value = '',
      document.getElementById('author').value = '',
      document.getElementById('isbn').value = '';
  }
  // === message ===
  showAlert(message, className) {
    // === create div and class ===
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    // === get parent ====
    const conatiner = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    conatiner.insertBefore(div, form);
    // === timeout remove alert after 3 seconds===
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }
}

// === local storage ===
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }
  static displayBook() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI;

      // Add book to UI
      ui.addBookToList(book)
    })
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM load Event ===
document.addEventListener('DOMContentLoaded', Store.displayBook)
// === Event Linstener ===
document.getElementById('book-form').addEventListener('submit', function(e) {
  // === get form values ===
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  // === Instantiate book ===
  const book = new Book(title, author, isbn)

  // === instantiate UI ===
  const ui = new UI();

  // === validate === 
  if (title === '' || author === '' || isbn === '') {
    // === error alert ===
    ui.showAlert('Please fill in all fields', 'error')
  } else {
     // === Add book to list ===
    ui.addBookToList(book);
    // Add book to LS ===
    Store.addBook(book)
    // === ui clear field ===
    ui.clearField();
    // === success alert ===
    ui.showAlert('Input Filled', 'success')
  }

  e.preventDefault();
});

// === add event listener for delete book ===
document.getElementById('book-list').addEventListener('click', function(e) {
  // === instantiate UI ===
  const ui = new UI();

  ui.deleteBook(e.target);

  // remove from LS ===
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // === show alert ===
  ui.showAlert('Book Removed!!!', 'success')
  e.preventDefault()
})  