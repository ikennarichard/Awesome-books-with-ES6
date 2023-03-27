const toggleSections = (e) => {
  const { item } = e.currentTarget.dataset;
  document.querySelector('.show').classList.remove('show');
  document.querySelector(item).classList.add('show');
}

const changeLinksColor = (e) => {
  document.querySelector('.change_color').classList.remove('change_color');
  e.currentTarget.classList.add('change_color');
}

const clearInputs = () => {
  document.querySelector('.book_title').value = '';
  document.querySelector('.book_author').value = '';
}

const displayDate = () => {
  const date = new Date();
  document.querySelector('.date_display').innerHTML = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}${date.getHours() < 12 ? 'am' : 'pm'}`;
}

export {toggleSections, changeLinksColor, clearInputs, displayDate}