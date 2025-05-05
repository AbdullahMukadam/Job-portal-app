'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Briefcase, User, Activity, Crown, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useClerk, UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { login, logout } from '@/app/Slices/AuthSlice';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Moon, Sun } from "lucide-react"

const NavItems = ({ className = '', onClick = () => { }, authStatus, userDetails, isMobile = false }) => {
    const items = [
        {
            href: "/",
            label: "Home",
            icon: Home,
            show: true
        },
        {
            href: authStatus ? "/Jobs" : "/sign-in",
            label: authStatus ? "Jobs" : "Sign In",
            icon: Briefcase,
            show: true
        },
        {
            href: authStatus ? "/user-profile" : "/sign-up",
            label: authStatus ? "Profile" : "Sign Up",
            icon: User,
            show: true
        },
        {
            href: "/activity",
            label: "Activity",
            icon: Activity,
            show: userDetails?.role === "candidate"
        },
        {
            href: "/Membership",
            label: "Membership",
            icon: Crown,
            show: authStatus
        }
    ];

    return items.map((item, index) => item.show && (
        <Button
            key={index}
            variant={isMobile ? "default" : "ghost"}
            className={`${className} ${isMobile ? 'justify-start w-full mb-2' : 'h-10'} 
            px-4 gap-2 font-medium transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black`}
            onClick={onClick}
        >
            <Link href={item.href} className="flex items-center gap-2 w-full">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
            </Link>
        </Button>
    ));
};

export default function Header({ userDetails }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentTheme, setCurrentTheme] = useState("dark")
    const authStatus = useSelector((state) => state.auth.status);
    const { signOut } = useClerk();
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const dispatch = useDispatch();
    const { setTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            if (user) {
                dispatch(login(user.id));
            } else {
                dispatch(logout());
            }
        }
    }, [user, isLoaded, dispatch]);

    const handleLogout = async () => {
        try {
            await signOut();
            dispatch(logout());
            router.push('/sign-in');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const updateCurrentTheme = (theme) => {
        setCurrentTheme(theme)
        theme === "dark" ? setTheme("dark") : setTheme("light")
    }

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
            ? 'bg-white dark:bg-black backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm'
            : 'bg-white dark:bg-black'
            }`}>
            <div className="container mx-auto">
                <div className="flex h-16 items-center justify-between px-4">
                    {/* Logo and Desktop Navigation */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src={currentTheme === "dark" ? "/assets/vercel.svg" : "/favicon.ico"}
                                alt="Logo"
                                width={100}
                                height={100}
                                className="h-8 w-auto text-white"
                            />
                        </Link>

                        <nav className="hidden md:flex items-center gap-1">
                            <NavItems authStatus={authStatus} userDetails={userDetails} />
                        </nav>
                    </div>

                    {/* Theme toggle and user controls */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => currentTheme === "dark" ? updateCurrentTheme("light") : updateCurrentTheme("dark")}
                        >
                            {currentTheme === "dark" ?
                                <Moon className="h-5 w-5 text-gray-800 dark:text-white transition-all" />
                                : <Sun className="h-5 w-5 text-gray-800 dark:text-white transition-all" />}
                        </Button>

                        {/* Mobile Menu */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <Menu className="h-5 w-5 text-gray-800 dark:text-white" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-72 p-6 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800">
                                <div className="flex items-center justify-between mb-8">
                                    <Link href="/" className="flex items-center gap-2">
                                        <Image
                                            src="/favicon.ico"
                                            alt="Logo"
                                            width={100}
                                            height={100}
                                            className="h-8 w-auto"
                                        />
                                    </Link>
                                   
                                </div>
                                <nav className="flex flex-col gap-2">
                                    <NavItems
                                        className="justify-start"
                                        onClick={() => setIsOpen(false)}
                                        authStatus={authStatus}
                                        userDetails={userDetails}
                                        isMobile={true}
                                    />
                                </nav>
                            </SheetContent>
                        </Sheet>

                        {/* User Menu */}
                        {authStatus && (
                            <UserButton
                                afterSignOutUrl="/sign-in"
                                appearance={{
                                    elements: {
                                        avatarBox: {
                                            width: 40,
                                            height: 40,
                                            borderRadius: '100%',
                                            border: '2px solid #000000',
                                        },
                                        userButtonPopoverCard: {
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        },
                                    },
                                }}
                                userProfileMode="navigation"
                                userProfileUrl="/Profile"
                                onSignOutClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}