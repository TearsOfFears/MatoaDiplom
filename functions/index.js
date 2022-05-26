const admin = require("firebase-admin");
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51KXSe4HmNGaKPzbCzg4RfXoFPFMcsWoleOI4cBf1LSjBFSzg94N7EwtdDE20lSaDechC0TBX467BRNCNx3QXsF1A00TPMW6MjY');

const app = express();
const deleteUser = express();

app.use(cors({
  origin: true
}));
app.use(express.json());

deleteUser.use(cors({
  origin: true
}));
deleteUser.use(express.json());

app.post('/payments/create', async (req, res) => {
  try {
    const {
      amount,
      shipping
    } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: 'UAH'
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
  res
    .status(404)
    .send('404, Not Found.');
});

deleteUser.post("", async (req, res) => {

  admin.initializeApp(functions.config().firebase);

  const userID = req.body.uid;

  admin.auth().getUser(userID)
    .then(() => {
      return admin.auth().deleteUser(userID)
    })
    .then(() => {
      console.log("Successful delete user");
      res.status(200).send("delete user");
      return
    })
    .catch(err => {
      console.log("Err during delete", err);
      res.status(500).send("FAIL DELET");
    })

})


exports.api = functions.https.onRequest(app);

exports.deleteUserById = functions.https.onRequest(deleteUser)