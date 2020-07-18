let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

searchButton.addEventListener('click', () => {
  console.log(csrfToken);
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
        $('#searchList').html(`<li class="list-group-item text-left"> 
        <a class="nav-link openroom" id="v-pills-home-tab" onclick=($('#joinUser').modal('show')) data-toggle="pill" role="tab" href='#${res.name}'
          aria-controls="v-pills-home" aria-selected="true">
          <div class="row justify-content-between px-1">
            <span> ${res.name} </span>
            <span class="badge badge-pilsl badge-danger d-flex align-items-center">1</span>
          </div>
        </a>
        </li>`);
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