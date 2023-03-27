/* eslint-disable class-methods-use-this */
import Book from './Book.js';

export default class Helpers {
  constructor() {
    this.bookStore = JSON.parse(localStorage.getItem('book_store')) || [];
  }

  addBook(title, author) {
    const book = new Book(title, author);

    if (title === '' || author === '') return;

    this.addToBookList(book);
    this.updateStorage();
    this.displayBooks();
  }

  updateStorage() {
    localStorage.setItem('book_store', JSON.stringify(this.bookStore));
  }

  displayBooks() {
    document.querySelector('.book_display').style.display = 'flex';

    if (this.bookStore.length === 0) {
      document.querySelector('.book_display').style.display = '';
    }
    document.querySelector('.book_display').innerHTML = `
    <ul class='book_details'>
    ${this.setListItems(this.bookStore)}
    </ul>
    `;
  }

  setListItems(arr) {
    let listItems = '';
    for (let i = 0; i < arr.length; i += 1) {
      listItems += `
      <div>
      <li><b>"${arr[i].title.trim()}"</b><span>by</span><strong>${arr[i].author}</strong></li>
      <button type='button' class='remove_book' data-id='${i}'>Remove</button>
      <hr/>
      </div>
      `;
    }
    return listItems;
  }

  removeBook(i) {
    this.bookStore.splice(i, 1);
    this.updateStorage();
    this.displayBooks();
  }

  addToBookList(item) {
    this.bookStore.push(item);
  }
}