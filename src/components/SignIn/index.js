"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export default function SignInForm() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (data) => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast({
                title: "Sign-in attempt",
                description: "You've attempted to sign in. In a real app, we would validate your credentials here.",
            })
            console.log(data)
        }, 1000)
    }

    return (
        <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg shadow-lg">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign In</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back! Please sign in to your account</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="johndoe@example.com"
                                        {...field}
                                        {...form.register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message: "Please enter a valid email address"
                                            }
                                        })}
                                    />
                                </FormControl>
                                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="********"
                                        {...field}
                                        {...form.register("password", {
                                            required: "Password is required",
                                        })}
                                    />
                                </FormControl>
                                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                    <div className="w-full p-2 text-center">
                        <Link className="text-gray-800 font-[300]" href={"/Signup"}>Go to SignUp</Link>
                    </div>
                </form> 
            </Form>
        </div>
    )
}

