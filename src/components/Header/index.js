'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useClerk, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { login, logout } from '@/app/Slices/AuthSlice'

const NavItems = ({ className = '', onClick = () => { }, authStatus }) => (
    <>
        <Button variant="ghost" className={className} onClick={onClick}>
            <Link href="/">Home</Link>
        </Button>
        <Button variant="ghost" className={className} onClick={onClick}>
            <Link href={authStatus ? "/Jobs" : "/sign-in"}>{authStatus ? "Jobs" : "Sign In"}</Link>
        </Button>
        <Button variant="ghost" className={className} onClick={onClick}>
            <Link href={authStatus ? "/Profile" : "/sign-up"}>{authStatus ? "Profile" : "Sign Up"}</Link>
        </Button>
    </>
)

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const authStatus = useSelector((state) => state.auth.status)
    const { signOut } = useClerk()
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isLoaded) {
            if (user) {
                dispatch(login(user.id))
            } else {
                dispatch(logout())
            }
        }
    }, [user, isLoaded, dispatch])

    const handleLogout = async () => {
        try {
            await signOut()
            dispatch(logout())
            router.push('/sign-in')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                        {authStatus && <Button onClick={handleLogout}>Logout</Button>}
                    </nav>
                </div>
            </div>
        </header>
    )
}

