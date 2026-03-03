"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Landmark } from "lucide-react";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/dashboard");
            } else {
                const error = await res.json();
                alert(error.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center px-12">
                <div className="flex items-center space-x-2">
                    <Landmark className="h-8 w-8 text-red-600" />
                    <span className="text-xl font-bold text-red-600 tracking-tight">WELLS FARGO</span>
                </div>
                <nav className="flex space-x-6">
                    <Link href="#" className="text-sm font-semibold border-b-2 border-red-600 pb-1 text-gray-900">Personal</Link>
                    <Link href="#" className="text-sm font-medium text-gray-600 pb-1 hover:text-gray-900">Small Business</Link>
                    <Link href="#" className="text-sm font-medium text-gray-600 pb-1 hover:text-gray-900">Commercial</Link>
                    <Link href="#" className="text-sm font-medium text-gray-600 pb-1 hover:text-gray-900">Wealth Management</Link>
                </nav>
            </header>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Side (Banner) */}
                <div className="lg:col-span-2 relative bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl overflow-hidden shadow-sm h-[500px]">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative p-12 h-full flex flex-col justify-end w-3/4">
                        <h1 className="text-5xl font-black text-white leading-tight mb-4 drop-shadow-md">
                            Investing in your future starts today.
                        </h1>
                        <p className="text-lg text-white mb-8 drop-shadow-md font-medium">
                            Explore our personalized financial planning services to help you reach your goals, from buying a home to retirement.
                        </p>
                        <div>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded text-lg font-bold transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side (Sign On Form) */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="bg-red-600 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white">Sign On</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    className="w-full border border-gray-300 rounded pl-3 pr-10 py-2 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" id="saveUsername" className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                            <label htmlFor="saveUsername" className="ml-2 block text-sm text-gray-700">Save username</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition-colors mt-2"
                        >
                            Sign On
                        </button>

                        <div className="pt-4 space-y-3 flex flex-col text-sm font-medium">
                            <Link href="#" className="text-red-600 hover:underline">Forgot username or password?</Link>
                            <Link href="#" className="text-red-600 hover:underline">Security & Support</Link>
                            <Link href="/signup" className="text-red-600 hover:underline">Enroll now</Link>
                        </div>
                    </form>

                    <div className="bg-gray-50 p-4 border-t border-gray-200 mt-2 flex items-center gap-4">
                        <div className="w-10 h-14 bg-red-100 rounded flex items-center justify-center shrink-0">
                            <div className="w-4 h-6 border-2 border-red-500 rounded-sm"></div>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">Wells Fargo Mobile</h4>
                            <p className="text-xs text-gray-600">Secure banking on the go.</p>
                            <Link href="#" className="text-xs font-bold text-red-600 mt-1 block">Download app</Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sub Actions under banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { title: 'Credit Cards', desc: 'Find the card that fits your lifestyle and earns rewards.' },
                    { title: 'Home Loans', desc: 'Get a personalized rate and start your journey home.' },
                    { title: 'Savings', desc: 'Start saving for what matters most with high-yield options.' },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 text-red-600 mb-4 bg-red-50 rounded flex items-center justify-center">
                            <Landmark size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
