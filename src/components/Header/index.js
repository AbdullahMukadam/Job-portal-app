'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Briefcase, User, Activity, Crown } from 'lucide-react';
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
            variant="outline"
            className={`${className} ${isMobile ? 'justify-start w-full' : 'h-9'} gap-2 rounded-xl border-2 border-black font-mono`}
            onClick={onClick}
        >
            <Link href={item.href} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
            </Link>
        </Button>
    ));
};

export default function Header({ userDetails }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentTheme, setcurrentTheme] = useState("dark")
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
        setcurrentTheme(theme)
        theme === "dark" ? setTheme("dark") : setTheme("light")
    }

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
            ? 'bg-white/80 backdrop-blur-lg border-b shadow-sm'
            : 'bg-white'
            }`}>
            <div className="container mx-auto">
                <div className="flex h-16 items-center justify-between px-4">
                    {/* Logo and Desktop Navigation */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/favicon.ico"
                                alt="Logo"
                                width={100}
                                height={100}
                                className="h-8 w-auto"
                            />
                        </Link>

                        <nav className="hidden md:flex items-center gap-1">
                            <NavItems authStatus={authStatus} userDetails={userDetails} />
                        </nav>

                        <Button className="hidden md:block" onClick={() => currentTheme === "dark" ? updateCurrentTheme("light") : updateCurrentTheme("dark")}>
                            {currentTheme === "dark" ?
                                <Moon className=" h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                : <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />}
                        </Button>



                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72 p-6">
                            <Link href="/" className="flex items-center gap-2 mb-8">
                                <Image
                                    src="/assets/logo-job.jpg"
                                    alt="Logo"
                                    width={100}
                                    height={100}
                                    className="h-8 w-auto"
                                />
                            </Link>
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
                    <div className="flex items-center gap-4">
                        {authStatus && (
                            <UserButton
                                afterSignOutUrl="/sign-in"
                                appearance={{
                                    elements: {
                                        avatarBox: {
                                            width: 32,
                                            height: 32,
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
        </header >
    );
}