import Stripe from "stripe";
import { stripe } from "@/utils/stripe"
import { addUserOffer } from "@/actions/payment_managment";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.log("❌ STRIPE_PAYMENT_ERR:", err)
    return new Response(
      'Webhook error',
      {
        status: 400,
      }
    )
  }

  if (event.type === 'checkout.session.completed') {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    if (checkoutSession === null) return;

    const user_id = checkoutSession.client_reference_id as string | null;
    if (user_id === null) return;

    try {
      // base offer is equal to 5
      await addUserOffer(user_id, 5);
    } catch (error: any) {
      console.error("could not finish adding offer; error:", error)
      return new Response(JSON.stringify({ received: false }));
    }
  }

  return new Response(JSON.stringify({ received: true }));
}
