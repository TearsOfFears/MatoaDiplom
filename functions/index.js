const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51KXSe4HmNGaKPzbCzg4RfXoFPFMcsWoleOI4cBf1LSjBFSzg94N7EwtdDE20lSaDechC0TBX467BRNCNx3QXsF1A00TPMW6MjY');

const app = express();

app.use(cors({
  origin: true
}));
app.use(express.json());

app.post('/payments/create', async (req, res) => {
  try {
    const { amount, shipping } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: 'usd'
    });
    res
      .status(200)
      .send(paymentIntent.client_secret);
  } catch (err) {
    res
      .status(500)
      .json({
        statusCode: 500,
        message: err.message
      });
  }
})

app.get('/payments/create', (req, res) => {
  // const { amount, shipping } = req.body;
  // res 
  // .status(200)
  // .send(shipping)
  res
    .status(404)
    .send('404, Not Found.');
});

exports.api = functions.https.onRequest(app);