const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_tu_clave_secreta');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const { cartItems } = req.body;

    const line_items = cartItems.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items,
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ url: session.url });
});

app.listen(4000, () => console.log('Servidor backend en http://localhost:4000'));
