let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

console.log(searchButton);

searchButton.addEventListener('click', () => {
  console.log(searchInput.value);
  fetch('/room/name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': csrfToken
    },
    body: JSON.stringify({
      name: searchInput.value
    })
  })
  .then(async res => {
    res = await res.json();
    console.log(res);
    $('#searchList').html(`<li class="list-group-item text-left"> ${res.name} </li>`);
    $('#collapseSearch').collapse();
  })
  .catch(err => {
    console.log(err);       
  })
  
})