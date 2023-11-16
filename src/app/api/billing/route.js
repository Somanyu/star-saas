import { SITE_URL } from "@/utils";
import { stripe } from "@/utils/stripe";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = createServerComponentClient({ cookies })

    const { data: { user } } = await supabase.auth.getUser();
    // console.log("🚀 ~ file: route.js:10 ~ POST ~ user:", user)

    if (!user) {
        // return response.status(401).json({ error: "Unauthorized" });
        return NextResponse.json({ error: "Unauthorized" }, {status: 401});
    }

    const { data: profile } = await supabase.from('profile').select("stripe_customer_id").eq("user_id", user.id).single()

    const session = await stripe.billingPortal.sessions.create({
        customer: profile.stripe_customer_id,
        return_url: SITE_URL
    })

    // response.send({ url: session.url })
    return NextResponse.json({ url: session.url });
}