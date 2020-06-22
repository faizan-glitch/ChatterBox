document.addEventListener('DOMContentLoaded', () => {
  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  let emailField = document.getElementById('emailField');
  let passwordField = document.getElementById('passwordField');
  let confirmPasswordField = document.getElementById('confirmPasswordField');

  let updateBtn = document.getElementById('updateBtn');

  updateBtn.addEventListener('click', () => {
    if (passwordField.value === confirmPasswordField.value) {
      fetch('/auth/reset/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          email: emailField.value,
          newPassword: passwordField.value
        })
      });
    }
  });
});