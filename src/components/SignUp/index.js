"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            terms: false,
        },
    })

    const onSubmit = (data) => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
            })
        }, 1000)
    }

    return (
        <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg shadow-lg">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-gray-500 dark:text-gray-400">Create your account to get started</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John Doe"
                                        {...field}
                                        {...form.register("name", {
                                            required: "Name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Name must be at least 2 characters"
                                            }
                                        })}
                                    />
                                </FormControl>
                                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
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
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters"
                                            }
                                        })}
                                    />
                                </FormControl>
                                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        {...form.register("terms", {
                                            required: "You must accept the terms and conditions"
                                        })}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Accept terms and conditions
                                    </FormLabel>
                                    <FormDescription>
                                        You agree to our Terms of Service and Privacy Policy.
                                    </FormDescription>
                                </div>
                                <FormMessage>{form.formState.errors.terms?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing up..." : "Sign up"}
                    </Button>
                    <div className="w-full p-2 text-center">
                        <Link className="text-gray-800 font-[300]" href={"/Signin"}>Go to SignIn</Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}

