import { SITE_URL } from "@/utils"
import { stripe } from "@/utils/stripe"

export async function GET(response, { params }) {

  const data = {
    name: 'John Doe',
    slug: params.slug
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: params.slug, quantity: 1 }],
    success_url: `${SITE_URL}/success`,
    cancel_url: `${SITE_URL}/pricing`
  })

  return Response.json({ id: session.id })
}