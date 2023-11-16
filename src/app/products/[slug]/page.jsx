import { Button, Image } from "@nextui-org/react";
import { HiBadgeCheck } from "react-icons/hi";
import { supabase } from "../../../../supabase";


const ProductPage = async ({ params }) => {

    const slug = params.slug;

    let { data: product, error } = await supabase
        .from('product')
        .select("*")
        .eq('slug', slug)
        .single();




    return (
        <div>
            <div>
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                    {/* Product details */}
                    <div className="lg:max-w-lg lg:self-end">

                        <div className="mt-4">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-slate-50 sm:text-4xl">{product.name}</h1>
                        </div>

                        <section aria-labelledby="information-heading" className="mt-4">
                            <h2 id="information-heading" className="sr-only">
                                Product information
                            </h2>

                            <div className="flex items-center">
                                <p className="text-lg text-gray-900 sm:text-xl">{product.price}</p>
                            </div>

                            <div className="mt-4 space-y-6">
                                <p className="text-base text-gray-500">{product.description}</p>
                            </div>

                        </section>
                    </div>

                    {/* Product image */}
                    <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
                        <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                            <Image src={product.imageURL} alt={product.name} className="w-full h-full object-center object-cover" />
                        </div>
                    </div>



                    {/* Product form */}
                    <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
                        <section aria-labelledby="options-heading">
                            <h2 id="options-heading" className="sr-only">
                                Product options
                            </h2>
                            {/* as={Link} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" */}
                            <form>
                                <div className="mt-10">
                                    <Button color="primary" className="w-full border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white">
                                        Buy a plan
                                    </Button>
                                </div>
                                <div className="mt-6 text-center">
                                    <a href="#" className="group inline-flex text-base font-medium">
                                        <HiBadgeCheck className="flex-shrink-0 mr-2 h-6 w-6 text-green-400" aria-hidden="true" />
                                        <span className="text-gray-500 hover:text-gray-700">Lifetime Access</span>
                                    </a>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage