
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { AuthOptions } from '../../auth/[...nextauth]/AuthOptions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16'
})

export async function POST(request: NextRequest) {

    const session = await getServerSession(AuthOptions);

    if (!session || !session.user) {
        return NextResponse.json("Unauthorized access please login first", { status: 403 })
    }

    const body = await request.json();

    try {

        const stripeSession = await stripe.checkout.sessions.create({
            metadata: {
                userEmail: session.user?.email as string,
                planeItems: JSON.stringify(body)
            },
            customer_email: session.user?.email as string,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: body.name
                        },
                        unit_amount: body.price * 100
                    },
                    quantity: 1
                }
            ],

            mode: "payment",
            success_url: process.env.NODE_ENV === "production" ? "https://ourwebiste.com/dashboard/user" : "http://localhost:3000/dashboard/user",
            cancel_url: process.env.NODE_ENV === "production" ? "https://ourwebiste.com/cancel" : "http://localhost:3000/cancel",
        })

        return NextResponse.json(stripeSession)

    } catch (error) {
        console.log("error at stripe session", error);
        return NextResponse.json("server error", { status: 500 })
    }
}