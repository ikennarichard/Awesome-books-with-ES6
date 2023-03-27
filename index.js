import Helpers from './modules/Helpers.js';
import {
  toggleSections, changeLinksColor, clearInputs, displayDate,
} from './modules/DisplayUtility.js';

const form = document.querySelector('form');
const awesomeBooks = new Helpers();
const navLinks = [...document.querySelectorAll('.link')];

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

navLinks.forEach((link) => link.addEventListener('click', (e) => {
  e.preventDefault();
  toggleSections(e);
  changeLinksColor(e);
}));

window.onload = () => {
  setInterval(() => displayDate(), 1000);
  awesomeBooks.displayBooks();
};