document.addEventListener('DOMContentLoaded', () => {
  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  let displayNameField = document.getElementById('displayNameField');
  let emailField = document.getElementById('emailField');
  let passwordField = document.getElementById('passwordField');
  let signupBtn = document.getElementById('signupBtn');
  let loadingSpinner = document.getElementById('loadingSpinner');
  let alert = document.getElementById('alert2');
  let alertMessage = document.getElementById('alert-message');

  signupBtn.addEventListener('click', () => {
    loadingSpinner.classList.remove('d-none');
    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken
      },
      credentials: 'same-origin', 
      body: JSON.stringify({
        displayName: displayNameField.value,
        email: emailField.value,
        password: passwordField.value,
      })
    })
      .then(res => {
        loadingSpinner.classList.add('d-none');
        return res.json();        
      })
      .then(res => {
        console.log(res);
        alertMessage.innerText = res.message;
        alert.classList.remove('d-none');
      })
      .catch(err => {
        loadingSpinner.classList.add('d-none');
        alertMessage.innerText = err.message;
        alert.classList.remove('d-none');
        console.log(err);
        
      })
  });
});