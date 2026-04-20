"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function SignUp() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        pin: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/dashboard");
            } else {
                const error = await res.json();
                toast.error(error.message || "Sign up failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10">
                <div className="flex items-center gap-2 mb-8 justify-center">
                    <Image src="/logo.png" alt="Modern Bank Logo" width={180} height={50} className="h-12 w-auto object-contain" priority />
                </div>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create your account</h2>
                    <p className="text-sm text-gray-500">Secure your future with Modern Bank</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    placeholder="e.g. John"
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    placeholder="e.g. Doe"
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="john.doe@example.com"
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <div className="mt-1">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    required
                                    placeholder="+1 (555) 000-0000"
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Create Password</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    placeholder="••••••••"
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-black"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label className="block text-sm font-medium text-gray-700">Secure 6-Digit PIN</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    name="pin"
                                    maxLength={6}
                                    required
                                    placeholder="• • • • • •"
                                    className="appearance-none block w-full max-w-[50%] px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-center tracking-[0.5em] text-black"
                                    onChange={handleChange}
                                />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Used for quick mobile access and transfers</p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-gray-500">Already have an account? </span>
                    <Link href="/login" className="font-medium text-red-600 hover:text-red-500">
                        Sign In
                    </Link>
                </div>

                <div className="mt-12 text-center text-xs text-gray-400 space-x-4">
                    <Link href="#" className="hover:underline">Privacy Policy</Link>
                    <Link href="#" className="hover:underline">Terms of Service</Link>
                    <Link href="#" className="hover:underline">Security</Link>
                </div>
                <p className="text-center text-xs text-gray-400 mt-2">
                    © 2024 Modern Bank. All rights reserved.
                </p>
            </div>
        </div>
    );
}
