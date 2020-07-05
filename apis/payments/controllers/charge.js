import Stripe from 'stripe';
import keys from '../../../config/keys.js';

const stripe = Stripe(keys.STRIPE.SECRET_KEY);

const chargeController = (req, res) => {
  const token = req.body.stripeTokenId;

  const charge = stripe.charges.create({
    amount: 500,
    currency: 'usd',
    source: token
  })
    .then((payment) => {
      console.log('Charge Successful');
      console.log(payment);
      
      req.user.updateOne({
        $set: {
          plan: 'premium'
        }
      })
        .then(user => {
          console.log(user);
          
          res.json({ message: 'Plan upgraded successfully.' });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Server Error " });
        });
    })
    .catch(err => {
      console.log('Charge Failed');
      res.status(500).json({ message: 'Plan ugraded failed' });
    })
};

export default chargeController;