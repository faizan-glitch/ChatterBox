document.addEventListener('DOMContentLoaded', () => {
  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  let displayNameField = document.getElementById('displayNameField');
  let emailField = document.getElementById('emailField');
  let passwordField = document.getElementById('passwordField');
  let signupBtn = document.getElementById('signupBtn');
  let loadingSpinner = document.getElementById('loadingSpinner');

  
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
        password: passwordField.value
      })
    })
  });
});