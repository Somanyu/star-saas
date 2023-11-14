import { stripe } from "@/utils/stripe";
import { NextResponse } from "next/server";
import { supabase } from "../../../../supabase";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const webhookSecret = process.env.STRIPE_SIGNING_SECRET;

export async function POST(req) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    switch (event?.type) {
      case "customer.subscription.updated":
        console.log("customer.subscription.updated");
        await updateSubscription(event);
        break;

      case "customer.subscription.deleted":
        console.log("customer.subscription.deleted");
        await deleteSubscription(event);
        break;
      default:
        // other events that we don't handle
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ received: true });
}

async function updateSubscription(event) {
  const subscription = event.data.object;
  const stripe_customer_id = subscription.customer;
  const subscription_status = subscription.status;
  const price = subscription.items.data[0].price.id;

  const { data: profile } = await supabase.from('profile').select('*').eq('stripe_customer_id', stripe_customer_id).single();

  if (profile) {
    const updatedSubscription = {
      subscription_status,
      price
    }

    await supabase.from('profile').update(updatedSubscription).eq('stripe_customer_id', stripe_customer_id);
  } else {
    const customer = await stripe.customers.retrieve(stripe_customer_id);

    const name = customer.name;
    const email = customer.email;

    const newProfile = {
      name,
      email,
      stripe_customer_id,
      subscription_status,
      price
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: newProfile
    })
  }
}

async function deleteSubscription(event) {

}
