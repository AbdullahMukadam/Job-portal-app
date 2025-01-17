'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useClerk, UserButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { login, logout } from '@/app/Slices/AuthSlice'
import Image from 'next/image'


const NavItems = ({ className = '', onClick = () => { }, authStatus, userDetails }) => (
    <>
        <Button variant="ghost" className={className} onClick={onClick}>
            <Link href="/">Home</Link>
        </Button>
        <Button variant="ghost" className={className} onClick={onClick}>
            <Link href={authStatus ? "/Jobs" : "/sign-in"}>{authStatus ? "Jobs" : "Sign In"}</Link>
        </Button>
        <Button variant="ghost" className={className} onClick={onClick}>
            <Link href={authStatus ? "/user-profile" : "/sign-up"}>{authStatus ? "Profile" : "Sign Up"}</Link>
        </Button>
        {userDetails?.role === "candidate" && <Button variant="ghost" className={className} onClick={onClick}>
            <Link href={"/activity"}>Activity</Link>
        </Button>}
        {authStatus && <Button variant="ghost" className={className} onClick={onClick}>
            <Link href={"/Membership"}> Membership</Link>
        </Button>}
    </>
)

export default function Header({ userDetails }) {
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
                            <Image
                                src={"/assets/logo-job.jpg"}
                                alt=" Logo"
                                width={100}
                                height={100}
                            />
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <NavItems authStatus={authStatus} userDetails={userDetails} />
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
                            <NavItems className="w-full justify-start" onClick={() => setIsOpen(false)} authStatus={authStatus} userDetails={userDetails} />
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        
                    </div>
                    <nav className="flex items-center">
                        {authStatus &&
                            <UserButton
                                afterSignOutUrl="/sign-in"
                                appearance={{
                                    elements: {
                                        avatarBox: {
                                            width: 40,
                                            height: 40,
                                        },
                                    },
                                }}
                                userProfileMode="navigation"
                                userProfileUrl="/Profile"
                                onSignOutClick={(e) => {
                                    e.preventDefault()
                                    handleLogout()
                                }}
                            />

                        }
                    </nav>
                </div>
            </div>
        </header>
    )
}

