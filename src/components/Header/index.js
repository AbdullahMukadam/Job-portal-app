'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { useSelector } from 'react-redux'


const NavItems = ({ className = '', onClick = () => { }, authStatus }) => (
    <>
        <Button variant="ghost" className={className} onClick={onClick}>
            <Link href="/">Home</Link>
        </Button>
        <Button variant="ghost" className={className} onClick={onClick}>
            <Link href={authStatus ? "/Jobs" : "/sign-in"}>{authStatus ? "Jobs" : "Sign In"}</Link>
        </Button>
        <Button variant="ghost" className={className} onClick={onClick}>
            <Link href={authStatus ? "/Profile" : "/sign-up"}>{authStatus ? "Profile" : "Sign Un"}</Link>
        </Button>
    </>
)

export default async function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const userId = useSelector((state) => state.status)
    const [authStatus, setauthStatus] = useState(false)

    if (userId === null) {
        setauthStatus(false)
    } else if (userId) {
        setauthStatus(true)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            YourLogo
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <NavItems authStatus={authStatus} />
                    </nav>
                </div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <nav className="flex flex-col space-y-4">
                            <NavItems className="w-full justify-start" onClick={() => setIsOpen(false)} authStatus={authStatus} />
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* You can add a search component here if needed */}
                    </div>
                    <nav className="flex items-center">
                        {/* You can add user-related components here, like a profile dropdown */}
                    </nav>
                </div>
            </div>
        </header>
    )
}

