"use client"

import { Button, Input, Link } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

const Login = () => {

    const supabaseClient = createClientComponentClient();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState('')

    async function handleLogin(event) {
        setLoading(true)
        event.preventDefault();
        const email = event.target.elements.email.value;

        const { data, error } = await supabaseClient.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: false,
                emailRedirectTo: `${location.origin}/auth/callback`,
            }
        })
        console.log("🚀 ~ file: page.jsx:27 ~ handleLogin ~ data:", data)
        console.log("🚀 ~ file: page.jsx:20 ~ handleLogin ~ error:", error)
        // console.log(error.message);
        if (error) {
            setError(error.message);
            setLoading(false)
        } else {
            setError('')
            setLoading(false)
            setSubmitted(email)
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-slate-50 text-black">
                        Sign in to your account
                    </h2>
                </div>

                {submitted ?
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        Login submitted
                        Check your email ({submitted}) for a magic link
                    </div>
                    :
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleLogin} className="space-y-6" action="#" method="POST">
                            <div>

                                <div className="mt-2">
                                    <Input
                                        isRequired
                                        label="Email address"
                                        labelPlacement="outside"
                                        description="We'll send you a magic link to this email."
                                        variant="bordered"
                                        id="email"
                                        name="email"
                                        type="email"
                                        isInvalid={error ? true : false}
                                        errorMessage={error}
                                        placeholder="john@mail.com"
                                        className="block w-full border-0 text-black dark:text-slate-50 shadow-sm focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <Button
                                    isLoading={loading}
                                    isDisabled={loading}
                                    variant="solid"
                                    color="primary"
                                    type="submit"
                                    className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    Sign in
                                </Button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <Link color="primary" underline="hover" href="/pricing" className="text-sm">
                                See our plans and get started.
                            </Link>
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Login