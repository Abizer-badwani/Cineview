import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51Nz9eQSCIzn9p3wnlemZ6RTJVGc4ZDEQui455kYtO1s093ISI1Rf9B76L2gzCk6V1N50OzxbrTfPZCOVeG0fHxcW00MXqYuNRN')

const checkout = async (req, res) => {
    try {
        const ticket = req.body

        
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: "Ticket"
                    },
                    unit_amount: ticket.price * 100,
                },
                quantity: 1,

            }],
            mode: 'payment',
            success_url: `http://localhost:3000/`,
            cancel_url: 'http://localhost:3000/'
        })

        res.json({success: true, id: session.id})

    } catch (error) {
        console.log(error.message)
    }
}

export {checkout}