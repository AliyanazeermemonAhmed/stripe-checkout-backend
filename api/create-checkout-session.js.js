const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1R9D4JGGNueOoYjKL6P1akN8',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'https://www.capturify.io/thank-you',
      cancel_url: 'https://www.capturify.io',
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
