const ul = document.querySelector('.list')
ul.addEventListener('click', e => {
  const t = e.target || e.srcElement
  if (t.classList.contains('item')) {
    getInfo(t.id)
  } else {
    id = t.parentElement.id
    if (t.classList.contains('edit')) {
      edit(id)
    } else if (t.classList.contains('delete')) {
      del(id)
    }
  }
})
