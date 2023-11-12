import { stripe } from "@/utils/stripe";
import { Chip } from "@nextui-org/react";
import { HiOutlineCheck, HiStar, HiTrendingUp } from "react-icons/hi";
import CheckoutButton from "../components/CheckoutButton";


const Pricing = async () => {
    const { data: prices } = await stripe.prices.list();
    const tiers = [];

    for (const price of prices) {
        const product = await stripe.products.retrieve(price.product);
        if (product.active === true) {
            tiers.push({
                name: product.name,
                id: price.id,
                price: price.unit_amount / 100,
                interval: price.recurring.interval,
                description: product.description,
            })
        }
    }

    const features = [
        'Pariatur quod similique',
        'Sapiente libero doloribus modi nostrum',
        'Vel ipsa esse repudiandae excepturi',
        'Itaque cupiditate adipisci quibusdam',
    ]

    // async function onCheckout(planId) {
    //     console.log(planId);
    //     const response = await fetch(`${SITE_URL}/api/checkout/${planId}`)
    //     const data = await response.json()
    //     const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    //     await stripe.redirectToCheckout({ sessionId: data?.id })
    // }

    return (
        <div>
            <div className="">
                <div className="pt-12 sm:pt-16 lg:pt-24">
                    <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
                            <h2 className="text-lg leading-6 font-semibold dark:text-gray-300 text-gray-800 uppercase tracking-wider">Pricing</h2>
                            <p className="text-3xl font-extrabold dark:text-slate-50 text-black sm:text-4xl lg:text-5xl">
                                The right price for you, whoever you are
                            </p>
                            <p className="text-xl text-gray-300">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum sequi unde repudiandae natus.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pb-12 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
                    <div className="relative">
                        <div className="absolute inset-0 h-3/4 " />
                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
                                {tiers.slice(0).reverse().map((tier) => (
                                    <div key={tier.name} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                        <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                                            <div className="mb-6">
                                                <Chip startContent={tier.interval == 'year' ? <HiTrendingUp size={18} /> : <HiStar size={18} />} color="primary" variant="flat">{tier.interval == 'year' ? 'Most chosen' : 'Best value'}</Chip>
                                            </div>
                                            <div className="mt-4 text-black flex items-baseline text-6xl font-extrabold">
                                                ₹{tier.price}
                                                <span className="ml-1 text-2xl font-medium text-gray-500">/{tier.interval}</span>
                                            </div>
                                            <p className="mt-5 text-lg text-gray-500">{tier.description}</p>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                                            <ul role="list" className="space-y-4">
                                                {features.map((feature) => (
                                                    <li key={feature} className="flex items-start">
                                                        <div className="flex-shrink-0">
                                                            <HiOutlineCheck className="h-6 w-6 text-green-500" aria-hidden="true" />
                                                        </div>
                                                        <p className="ml-3 text-base text-gray-700">{feature}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="rounded-md">
                                                <CheckoutButton planId={tier.id} />
                                                {/* <Button
                                                    onClick={() => onCheckout(tier.id)}
                                                    className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
                                                    aria-describedby="tier-standard"
                                                >
                                                    Get started
                                                </Button> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Pricing