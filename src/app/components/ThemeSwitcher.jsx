// app/components/ThemeSwitcher.tsx
"use client";

import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div>
            <Button isIconOnly onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                <HiOutlineSun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
                <HiOutlineMoon className="hidden h-5 w-5 dark:block" />
            </Button>
        </div>
    )
};