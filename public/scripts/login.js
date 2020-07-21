document.addEventListener('DOMContentLoaded', () => {
  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  let emailField = document.getElementById('emailField');
  let passwordField = document.getElementById('passwordField');
  let loginBtn = document.getElementById('loginBtn');
  let loadingSpinner = document.getElementById('loadingSpinner');
 
  loginBtn.addEventListener('click', () => {
    loadingSpinner.classList.remove('d-none');
    fetch('/auth/login', {
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
    })
      .then(res => {
        loadingSpinner.classList.add('d-none');
        if (res.status == 200) {
          window.location.assign(res.url);
          return;
        }
        window.location.assign('/login');
      })
      .catch(err => {
        loadingSpinner.classList.add('d-none');
        console.log(err);
      });
  });
});