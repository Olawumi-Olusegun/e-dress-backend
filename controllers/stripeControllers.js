const dotenv = require('dotenv')
dotenv.config()

const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.stripePay = async (req, res, next) => {
    const { products, email, shippingAddress, amount, token } = req.body;
    try {

        // const lineItems = products?.map((product) => {
        //     return {
        //         price_data: { 
        //           currency: "USD", 
        //           product_data: { 
        //             name: product?.name,
        //             images: [product?.image],
        //           }, 
        //           unit_amount: product?.price * 100,
        //         }, 
        //         quantity: product?.quantity, 
        //       }, 
        // });

        // const session = await stripe.checkout.sessions.create({ 
        //   payment_method_types: ["card"],
        //   line_items,
        //   mode: "payment",
        //   customer_email: email,
        //    metadata: {
        //     // "orderId": order._id.toString(),
        //     "orderItems": JSON.stringify(orderItems),
        //     "shippingAddress": JSON.stringify(shippingAddress),
        //     "taxPrice": taxPrice,
        //     "shippingPrice": shippingPrice,
        //     "itemsPrice": itemsPrice,
        //     "totalPrice": totalPrice,
        //     userId,
        //     action: "shop",
        //     integration_check: 'accept_a_payment',
        //     payment_date: new Date(Date.now()),
        //    }
        //   success_url: "http://localhost:5173/success",
        //   cancel_url: "http://localhost:5173/cancel",
        // }); 

        const customer = await Stripe.charges.create({
            source: token?.id,
            amount: amount,
            currency: "usd",
        });


        // return res.status(200).json({ id: customer?.source, success: false, });

    } catch(error) {
  
        return res.status(500).json({ success: false, message: error?.message })
    }
}