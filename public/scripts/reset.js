document.addEventListener('DOMContentLoaded', () => {
  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  let emailField = document.getElementById('emailField');
  let resetBtn = document.getElementById('resetBtn');
  let alert = document.getElementById('alert2');
  let alertMessage = document.getElementById('alert-message');
  let loadingSpinner = document.getElementById('loadingSpinner');

  resetBtn.addEventListener('click', () => {
    loadingSpinner.classList.remove('d-none');
    fetch('/auth/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken
      },
      credentials: 'same-origin', 
      body: JSON.stringify({
        email: emailField.value,
      })
    })
    .then(res => {
      loadingSpinner.classList.add('d-none');
      return res.json();        
    })
    .then(res => {
      alertMessage.innerText = res.message;
      alert.classList.remove('d-none');
    })
    .catch(err => {
      loadingSpinner.classList.add('d-none');
      alertMessage.innerText = err.message;
      alert.classList.remove('d-none');
    });
  });
});