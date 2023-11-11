"use client"

import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { FaStarOfLife } from "react-icons/fa";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function NavigationBar() {

    return (
        <Navbar isBordered>
            <NavbarContent>
                <NavbarBrand as={Link} href={'/'} color="foreground">
                    <FaStarOfLife className="text-2xl" />
                    <p className="ml-2 font-bold text-inherit">Star SaaS</p>
                </NavbarBrand>
            </NavbarContent>


            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} className="dark:text-slate-50 text-black" color="primary" href="#" variant="bordered">
                        Pricing
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="solid">
                        Login
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
