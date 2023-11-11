import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowNarrowRight } from "react-icons/hi";
import CTA from "../../public/CTA.jpg";


export default function Home() {
  return (
    <main className="">

      <section className="overflow-hidden sm:grid sm:grid-cols-2">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-50 md:text-5xl">
              Control every step of your business.
            </h2>

            <p className="hidden text-gray-500 md:mt-4 md:block text-2xl">
              The internet&apos;s only source for productivity to reach heights.
            </p>

            <div className="mt-4 md:mt-8">
              <Button as={Link} href="/products" variant="ghost" color="success" endContent={<HiArrowNarrowRight className="text-xl" />}>
                Get started
              </Button>
            </div>
          </div>
        </div>

        <Image alt="Book CTA" placeholder="blur" src={CTA} className="h-56 w-full object-cover sm:h-full" />
      </section>
    </main>
  )
}
