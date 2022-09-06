'use strict'

// === Book Constructor ===
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn =isbn;
}

// === UI Constructor ===
function UI() {}

// === Add book to list ===
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `
  list.appendChild(row);
}
// === delete book ===
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}
// === UI Clear Field ===
UI.prototype.clearField = function()
 {
  document.getElementById('title').value = '',
  document.getElementById('author').value = '',
  document.getElementById('isbn').value = '';
 }

 // === message ===
 UI.prototype.showAlert = function(message, className) {
  // === create div and class ===
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  // === get parent ====
  const conatiner = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  conatiner.insertBefore(div, form);
  // === timeout remove alert after 3 seconds===
  setTimeout(function() {
    document.querySelector('.alert').remove()
  }, 3000)
 }
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

  // === show alert ===
  ui.showAlert('Book Removed!!!', 'success')
  e.preventDefault()
})