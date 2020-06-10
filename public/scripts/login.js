document.addEventListener('DOMContentLoaded', () => {
  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  let emailField = document.getElementById('emailField');
  let passwordField = document.getElementById('passwordField');
  let loginBtn = document.getElementById('loginBtn');

  loginBtn.addEventListener('click', () => {
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
        if(res.status == 200) {
          window.location.assign(res.url)
        }
      });
  });
});