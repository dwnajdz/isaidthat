import { fetchUser } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const priceId = process.env.STRIPE_PRODUCT_PRICE_ID ?? null;

export async function POST(request: Request) {
  const supabase = createClient(cookies());
  const user = await fetchUser(supabase);
  if (user === null) 
    throw new Error("user not fund");

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      client_reference_id: user?.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/startups/management?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/startups/management/publish?canceled=true`,
    });

    return Response.redirect(session.url, 301)
  } catch (err: any) {
    console.log(err)
    return redirect("/pricing?error=true")
  }
}