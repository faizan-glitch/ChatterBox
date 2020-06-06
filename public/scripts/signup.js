document.addEventListener('DOMContentLoaded', () => {
  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  let emailField = document.getElementById('emailField');
  let passwordField = document.getElementById('passwordField');
  let signupBtn = document.getElementById('signupBtn');
  
  signupBtn.addEventListener('click', () => {
    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken
      },
      credentials: 'same-origin', 
      body: JSON.stringify({
        email: emailField.value,
        password: passwordField.value
      })
    });
  });
});