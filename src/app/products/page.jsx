import { Button, Card, CardFooter, CardHeader, Chip, Image } from "@nextui-org/react";
import { supabase } from "../../../supabase";
import Link from "next/link";

const Products = async () => {


    let { data: products, error } = await supabase.from('product').select('*')
    // console.log("🚀 ~ file: page.jsx:8 ~ Products ~ data:", products)

    return (
        <div className="max-w-[900px] my-10 mx-auto gap-2 grid grid-cols-10 grid-rows-3 px-8">
            {products.map((product, i) => (
                <Card key={i} isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <Chip color="primary" variant="shadow">{product.category}</Chip>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                        src={product.imageURL}
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                            <p className="text-black text-lg">{product.name}</p>
                            {/* <p className="text-black text-sm">$45</p> */}
                        </div>
                        <Button as={Link} href={`/products/${product.slug}`}  className="" color="success" radius="full" size="md">
                            See more
                        </Button>
                    </CardFooter>
                </Card>
            ))}

            
        </div>
    )
}

export default Products