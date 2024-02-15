import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from '../../../prisma/client'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16'
})

export async function POST(request: NextRequest) {

    if (request.method === "POST") {

        const _row = await request.text();

        const sig = request.headers.get('stripe-signature') as string;

        let event;

        try {

            event = stripe.webhooks.constructEvent(
                _row,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET!
            )

            switch (event.type) {

                case "checkout.session.completed":
                    const chargeSucceeded = event.data.object;

                    const planeItems = JSON.parse(chargeSucceeded?.metadata?.planeItems!);

                    const userEmail = chargeSucceeded?.metadata?.userEmail;

                    const userInfo = await prisma.user.findUnique({ where: { email: userEmail } })

                    const creditIncrement = Number(planeItems.credits);

                    try {
                        await prisma.user.update({
                            where: { email: userEmail },
                            data: {
                                credit: (userInfo?.credit ?? 0) + creditIncrement
                            }
                        })

                    } catch (error) {
                        console.log("error updaing user credit", error);
                        return NextResponse.json({ ok: false }, { status: 400 });
                    }
                    break;
            }

            return NextResponse.json({ ok: true }, { status: 200 });

        } catch (error) {
            console.log("error stripe wbehook", error);
            return NextResponse.json({ ok: false }, { status: 400 });
        }
    }
}