"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ShieldCheck, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
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
                toast.error(error.message || "Login failed");
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans selection:bg-red-600 selection:text-white pb-20">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200 shadow-sm px-4 sm:px-6 lg:px-12 py-4 flex flex-col lg:flex-row justify-between items-center gap-4 transition-all">
                <div className="flex items-center space-x-3 cursor-pointer">
                    <Image src="/logo.png" alt="ApexBank Logo" width={150} height={40} className="h-10 w-auto object-contain" priority />
                </div>

                <nav className="flex flex-wrap justify-center gap-2">
                    <Link href="#" className="px-4 py-2 text-sm font-bold text-red-700 border-b-2 border-red-600 bg-red-50 hover:bg-red-100 rounded-t-lg transition-all" style={{ color: '#b91c1c', textDecoration: 'none' }}>Personal</Link>
                    <Link href="#" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all" style={{ color: '#4b5563', textDecoration: 'none' }}>Small Business</Link>
                    <Link href="#" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all" style={{ color: '#4b5563', textDecoration: 'none' }}>Commercial</Link>
                    <Link href="#" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all" style={{ color: '#4b5563', textDecoration: 'none' }}>Wealth Management</Link>
                </nav>
            </header>

            <main className="max-w-[1400px] mx-auto pt-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Side (Banner) */}
                <div className="lg:col-span-8 relative bg-[url('https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center rounded-[2rem] overflow-hidden shadow-2xl h-[450px] md:h-[650px] group">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent transition-all duration-700 group-hover:from-gray-900/100" />

                    {/* Floating decorative elements */}
                    <div className="absolute top-10 left-10 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hidden md:block">
                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>

                    <div className="relative p-8 md:p-16 h-full flex flex-col justify-center max-w-2xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
                            Master your wealth. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Design your future.</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-300 mb-10 font-medium leading-relaxed max-w-xl">
                            Experience next-generation banking with ApexBank. Tailored financial solutions, elite security, and unparalleled service.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transform hover:-translate-y-1 flex items-center gap-2">
                                Explore Services <ChevronRight className="w-5 h-5" />
                            </button>
                            <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl text-base font-bold transition-all hover:border-white/40">
                                Open an Account
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side (Sign On Form) */}
                <div className="lg:col-span-4 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 overflow-hidden flex flex-col transform transition-all duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <h2 className="text-2xl font-black text-white tracking-tight relative z-10 flex items-center gap-3">
                            Sign In
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 flex-1 flex flex-col">
                        <div className="space-y-6 flex-1">
                            <div className="group">
                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider group-focus-within:text-red-600 transition-colors">Email Address</label>
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 text-black font-semibold focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all bg-gray-50/50 focus:bg-white placeholder-gray-400"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="group">
                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider group-focus-within:text-red-600 transition-colors">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        className="w-full border-2 border-gray-200 rounded-xl pl-4 pr-12 py-3.5 text-black font-semibold focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all bg-gray-50/50 focus:bg-white placeholder-gray-400"
                                        placeholder="Enter your password"
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors p-2 bg-white rounded-lg"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center group cursor-pointer">
                                    <input type="checkbox" id="saveUsername" className="h-4 w-4 text-red-600 border-2 border-gray-300 rounded cursor-pointer transition-colors focus:ring-red-600 group-hover:border-red-400" />
                                    <label htmlFor="saveUsername" className="ml-2.5 block text-sm font-semibold text-gray-600 cursor-pointer group-hover:text-gray-900 transition-colors">Remember me</label>
                                </div>
                                <Link href="#" className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors" style={{ color: '#dc2626', textDecoration: 'none' }}>Forgot Password?</Link>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : "Secure Login"}
                            </button>

                            <div className="mt-8 text-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-sm text-gray-500 font-semibold mb-1">New to ApexBank?</p>
                                <Link href="/signup" className="text-sm font-black text-red-600 hover:text-red-700 transition-colors" style={{ color: '#dc2626', textDecoration: 'none' }}>Enroll in Online Banking</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            {/* Quick Links Section */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Credit Cards', desc: 'Find the card that fits your lifestyle and earns premium rewards.', icon: <span className="text-2xl">💳</span> },
                    { title: 'Home Loans', desc: 'Get a personalized rate and start your journey home today.', icon: <span className="text-2xl">🏠</span> },
                    { title: 'Wealth Management', desc: 'Expert guidance to help you build and protect your legacy.', icon: <span className="text-2xl">📈</span> },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)] transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-50 group-hover:scale-110 transition-all">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">{item.title}</h3>
                        <p className="text-base text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

