const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const PORT = Number(process.env.PORT) || 2000;

const stripeRoutes = require('./routes/stripeRoutes')

const app = express();

app.use(
    cors({
      origin: [
          "http://localhost:5173",
          "https://checkout.stripe.com",
          "https://anycloth.netlify.app/",
    ],
    })
  );

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));


app.get('/', (req, res, next) => {
    return res.status(200).json({ success: true,  })
})


app.use('/api/stripe', stripeRoutes);

// app.use("*", req, res, next) => {
//     return res.status(404).json({ success: false, message: "Oops! page not found"})
// }



app.listen(PORT, () => console.log(`App listening on port: ${PORT}`) );

