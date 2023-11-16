import { Button } from "@nextui-org/react"
import Link from "next/link"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"

const Success = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center my-20">
                <div>
                    <div className="flex flex-col items-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1 className="text-4xl font-bold">Success !</h1>
                        <p className="text-center mb-10">Thank you for your interest! Check your email for a link to the guide.</p>
                        <Button className="mt-24" as={Link} href="/login" color="success" variant="solid" startContent={<HiOutlineArrowNarrowLeft />}>
                            Login to get started
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success