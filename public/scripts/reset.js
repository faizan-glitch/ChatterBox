document.addEventListener('DOMContentLoaded', () => {
  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  let emailField = document.getElementById('emailField');
  let resetBtn = document.getElementById('resetBtn');
  
  resetBtn.addEventListener('click', () => {
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
      .then(response => {
        // window.location.assign('/reset');
      })
  });
});