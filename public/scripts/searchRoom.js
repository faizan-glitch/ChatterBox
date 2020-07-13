let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

searchButton.addEventListener('click', () => {
  console.log(searchInput.value);
  fetch('/room/name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': csrfToken
    },
    body: JSON.stringify({
      name: { '$regex': searchInput.value, '$options': 'i' }
    })
  })
    .then(async res => {
      res = await res.json();
      if (res) {
        $('#searchList').html(`<li class="list-group-item text-left"> ${res.name} </li>`);
      }
      else {
        $('#searchList').html(`<li class="list-group-item text-left"> No Room Found. <i class="fa fa-frown" aria-hidden="true"></i> </li>`);
      }
      $('#collapseSearch').collapse('show');
    })
    .catch(err => {
      console.log(err);
    })

})