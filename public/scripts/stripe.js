document.addEventListener('DOMContentLoaded', () => {
  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  let upgradePlanBtn = document.getElementById('upgradePlanBtn');

  const stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'en',
    token: (token) => {
      fetch('/payments/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'CSRF-Token': csrfToken
        },
        body: JSON.stringify({
          stripeTokenId: token.id
        })
      })
    }
  });
  
  upgradePlanBtn.addEventListener('click', () => {
    stripeHandler.open({
      amount: 500
    });
  });
});