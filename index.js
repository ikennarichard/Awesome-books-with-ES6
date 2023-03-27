/* eslint-disable class-methods-use-this */
import Book from './modules/Book.js';

class AwesomeHelpers {
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

const form = document.querySelector('form');
const awesomeBooks = new AwesomeHelpers();

function clearInputs() {
  document.querySelector('.book_title').value = '';
  document.querySelector('.book_author').value = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const booKTitleValue = document.querySelector('.book_title').value;
  const booKAuthorValue = document.querySelector('.book_author').value;

  awesomeBooks.addBook(booKTitleValue, booKAuthorValue);
  clearInputs();
});

document.addEventListener('click', (e) => {
  const target = e.target.closest('.remove_book');
  if (target) {
    awesomeBooks.removeBook(Number(e.target.dataset.id));
  }
});

const navLinks = [...document.querySelectorAll('.link')];

function toggleSections(e) {
  const { item } = e.currentTarget.dataset;
  document.querySelector('.show').classList.remove('show');
  document.querySelector(item).classList.add('show');
}

function changeLinksColor(e) {
  document.querySelector('.change_color').classList.remove('change_color');
  e.currentTarget.classList.add('change_color');
}

navLinks.forEach((link) => link.addEventListener('click', (e) => {
  e.preventDefault();
  toggleSections(e);
  changeLinksColor(e);
}));

function displayDate() {
  const date = new Date();
  document.querySelector('.date_display').innerHTML = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}${date.getHours() < 12 ? 'am' : 'pm'}`;
}

window.onload = () => {
  setInterval(() => displayDate(), 1000);
  awesomeBooks.displayBooks();
};