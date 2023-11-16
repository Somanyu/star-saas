"use client"

import { SITE_URL } from "@/utils";
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { FaStarOfLife } from "react-icons/fa";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function NavigationBar({ session }) {

    const supabase = createClientComponentClient()
    const router = useRouter()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        redirect('/')
    }

    const onManageBilling = async () => {
        const response = await fetch(`${SITE_URL}/api/billing`)
        const data = await response.json()
        console.log("🚀 ~ file: NavigationBar.jsx:23 ~ onManageBilling ~ data:", data)
        if (data) {
            window.location.href = data.url
        }
    }

    return (
        <Navbar isBordered>
            <NavbarContent>
                <NavbarBrand as={Link} href={'/'} color="foreground">
                    <FaStarOfLife className="text-2xl" />
                    <p className="ml-2 font-bold text-inherit">Star SaaS</p>
                </NavbarBrand>
            </NavbarContent>

            {session ?
                <>
                    <NavbarContent justify="end">
                        <NavbarItem>
                            <Button as={Link} className="dark:text-slate-50 text-black" color="primary" href="/products" variant="bordered">
                                Products
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onClick={onManageBilling} className="dark:text-slate-50 text-black" color="primary" variant="bordered">
                                Billing
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onClick={handleSignOut} color="danger" variant="solid">
                                Logout
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <ThemeSwitcher />
                        </NavbarItem>
                    </NavbarContent>
                </>
                :
                <>
                    <NavbarContent justify="end">
                        <NavbarItem>
                            <Button as={Link} className="dark:text-slate-50 text-black" color="primary" href="/pricing" variant="bordered">
                                Pricing
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/login" variant="solid">
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <ThemeSwitcher />
                        </NavbarItem>
                    </NavbarContent>
                </>}


            {/* <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} className="dark:text-slate-50 text-black" color="primary" href="/pricing" variant="bordered">
                        Pricing
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="/login" variant="solid">
                        Login
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent> */}
        </Navbar>
    );
}
