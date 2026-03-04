"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
    Bell, Settings, Landmark, HandCoins, ArrowRightLeft, ScrollText,
    PiggyBank, CreditCard, Plus, ArrowUpRight, Zap, LogOut
} from "lucide-react";
import { transactions } from "@/data/transactions";

export default function Dashboard() {
    const router = useRouter();
    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
            router.refresh(); // Refresh to ensure middleware drops caching of auth state
        } catch (error) {
            console.error(error);
        }
    };

    const latestMonthTransactions = transactions.filter(tx => tx.date.includes('Mar') && tx.date.includes('2026') && tx.amount < 0);
    const grouped = latestMonthTransactions.reduce((acc, tx) => {
        let cat = tx.type;
        if (!['Housing', 'Food & Drink', 'Shopping', 'Transfer', 'Entertainment', 'Groceries'].includes(cat)) cat = 'Other';
        if (cat === 'Food & Drink' || cat === 'Groceries') cat = 'Food';
        if (cat === 'Entertainment' || cat === 'Transfer') cat = 'Other';
        acc[cat] = (acc[cat] || 0) + Math.abs(tx.amount);
        return acc;
    }, {} as Record<string, number>);

    const data = [
        { name: "Housing", value: grouped['Housing'] || 0, color: "#EF4444" },
        { name: "Food", value: grouped['Food'] || 0, color: "#FCA5A5" },
        { name: "Shopping", value: grouped['Shopping'] || 0, color: "#F87171" },
        { name: "Other", value: grouped['Other'] || 0, color: "#FECACA" },
    ].filter(d => d.value > 0);

    const totalSpend = data.reduce((sum, item) => sum + item.value, 0);

    // Calculate realistic Visa Platinum balance by aggregating recent standard card expenses (Food, Shopping, Services) across Feb and March 2026
    const ccBalance = transactions.reduce((acc, tx) => {
        const isRecent = tx.date.includes('2026'); // All 2026 (Jan/Feb/Mar) can be considered current revolving balance for this simulation
        if (isRecent && !['Housing', 'Transfer', 'Income'].includes(tx.type) && tx.amount < 0) {
            return acc + Math.abs(tx.amount);
        }
        return acc;
    }, 0);

    const savingsBalance = 42150.00; // Static realistic savings base

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans pb-10">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-4 md:px-8 py-4 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-40">
                <div className="flex items-center gap-4 lg:gap-12">
                    <div className="flex items-center gap-2 shrink-0 cursor-pointer">
                        <div className="bg-gradient-to-br from-red-600 to-red-700 p-2 rounded-lg shadow-sm shadow-red-600/20">
                            <Landmark className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-gray-900 tracking-tight">Apex<span className="text-red-600">Bank</span></span>
                    </div>
                    <div className="hidden md:flex space-x-2">
                        <a href="#" className="px-4 py-2 text-sm font-bold border-b-2 border-red-600 bg-red-50 hover:bg-red-100 rounded-t-lg transition-all" style={{ color: '#b91c1c', textDecoration: 'none' }}>Dashboard</a>
                        <a href="#" className="px-4 py-2 text-sm font-semibold hover:bg-gray-100 rounded-lg transition-all" style={{ color: '#4b5563', textDecoration: 'none' }}>Accounts</a>
                        <a href="#" className="px-4 py-2 text-sm font-semibold hover:bg-gray-100 rounded-lg transition-all" style={{ color: '#4b5563', textDecoration: 'none' }}>Transfers</a>
                        <a href="#" className="px-4 py-2 text-sm font-semibold hover:bg-gray-100 rounded-lg transition-all" style={{ color: '#4b5563', textDecoration: 'none' }}>Investments</a>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-6">
                    <div className="flex items-center gap-2 md:gap-3 relative">
                        <div className="flex flex-col text-right mr-1 md:mr-2">
                            <span className="text-xs text-gray-500">Welcome back,</span>
                            <span className="text-sm font-bold text-gray-900">EVANN J HALEY</span>
                        </div>
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="w-10 h-10 rounded-full bg-orange-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-bold text-orange-800 cursor-pointer hover:ring-2 hover:ring-red-100 transition-all focus:outline-none"
                        >
                            EH
                        </button>

                        {/* Profile Dropdown Menu */}
                        {showProfileMenu && (
                            <div className="absolute right-0 top-12 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                    <p className="text-sm font-bold text-gray-900">EVANN J HALEY</p>
                                    <p className="text-xs text-gray-500 truncate">Settings & Preferences</p>
                                </div>
                                <button className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                                    <div className="p-1.5 rounded-md bg-gray-100 text-gray-600 group-hover:bg-red-50 group-hover:text-red-600">
                                        <Bell className="w-4 h-4" />
                                    </div>
                                    Notifications
                                </button>
                                <button className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                                    <div className="p-1.5 rounded-md bg-gray-100 text-gray-600 group-hover:bg-red-50 group-hover:text-red-600">
                                        <Settings className="w-4 h-4" />
                                    </div>
                                    Account Settings
                                </button>
                                <div className="border-t border-gray-50 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <div className="p-1.5 rounded-md bg-red-100 text-red-600">
                                        <LogOut className="w-4 h-4" />
                                    </div>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 pt-8 px-6 lg:px-8">
                {/* Left Column (Main Feed) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Premium Checking Card */}
                    <div className="bg-gradient-to-br from-[#1a1b26] to-[#2a1b2a] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

                        <div className="flex justify-between items-start relative z-10 gap-4">
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold tracking-wider text-gray-300 uppercase mb-4 truncate">
                                    Premium Checking (....4321)
                                </p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 truncate">$187,000.00</h2>
                                <p className="flex items-center text-sm font-medium text-emerald-400">
                                    <ArrowUpRight className="w-4 h-4 mr-1 shrink-0" />
                                    <span className="truncate">+2.4% this month</span>
                                </p>
                            </div>
                            <span className="shrink-0 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full tracking-wide">
                                ACTIVE
                            </span>
                        </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: HandCoins, label: 'Deposit', action: () => setShowPaymentModal(true) },
                            { icon: ScrollText, label: 'Withdraw', action: () => setShowPaymentModal(true) },
                            { icon: ArrowRightLeft, label: 'Transfer', action: () => setShowPaymentModal(true) },
                            { icon: Landmark, label: 'Pay Bills', action: () => setShowPaymentModal(true) },
                        ].map((actionItem, i) => (
                            <button
                                key={i}
                                onClick={actionItem.action}
                                className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow group border border-gray-50"
                            >
                                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <actionItem.icon className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-bold text-gray-800">{actionItem.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-6 border border-gray-50">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
                            <button onClick={() => setShowAllTransactions(true)} className="text-sm font-bold text-red-600 hover:text-red-700">View All</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-400 uppercase font-semibold border-b border-gray-100">
                                    <tr>
                                        <th className="pb-4 pt-2">Date</th>
                                        <th className="pb-4 pt-2">Description</th>
                                        <th className="pb-4 pt-2">Type</th>
                                        <th className="pb-4 pt-2 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {transactions.slice(0, 5).map((tx, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 pr-4 text-gray-500 whitespace-nowrap">{tx.date}</td>
                                            <td className="py-4 px-4 font-semibold text-gray-900 whitespace-nowrap">{tx.description}</td>
                                            <td className="py-4 px-4 text-blue-500 font-medium whitespace-nowrap items-center flex gap-2">
                                                <span className="bg-blue-50/50 text-blue-600 py-1 px-3 rounded-full text-xs font-bold">{tx.type}</span>
                                            </td>
                                            <td className={`py-4 pl-4 text-right font-bold whitespace-nowrap ${tx.amount > 0 ? 'text-emerald-500' : 'text-gray-900'}`}>
                                                {tx.amount > 0 ? '+' : ''}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tx.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="space-y-6">

                    {/* Account Summary */}
                    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-6 border border-gray-50">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Account Summary</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-red-600">
                                        <PiggyBank className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Savings Account</p>
                                        <p className="text-xs text-gray-400">....8829</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-900">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(savingsBalance)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-red-600">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Visa Platinum</p>
                                        <p className="text-xs text-gray-400">....1102</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-900">
                                    -{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ccBalance)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Spending Insights */}
                    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-6 border border-gray-50">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Spending Insights</h3>

                        <div className="h-48 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Total</span>
                                <span className="text-xl font-black text-gray-900">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(totalSpend)}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            {data.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-xs font-semibold text-gray-600">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Send */}
                    <div className="bg-red-600 rounded-2xl shadow-lg p-6 relative overflow-hidden text-white">
                        <div className="absolute top-0 right-0 p-6 opacity-20">
                            <Zap className="w-16 h-16" />
                        </div>
                        <h3 className="text-lg font-bold mb-6 relative z-10 flex items-center justify-between">
                            Quick Send
                            <Zap className="w-5 h-5" />
                        </h3>

                        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide relative z-10">
                            <div className="flex flex-col items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={() => setShowPaymentModal(true)}
                                    className="w-12 h-12 rounded-full border border-white/30 border-dashed flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <Plus className="w-5 h-5 text-white" />
                                </button>
                                <span className="text-[10px] font-bold">New</span>
                            </div>
                            {[
                                { name: 'Sarah M.', id: 's' },
                                { name: 'James W.', id: 'j' },
                                { name: 'Emily C.', id: 'e' }
                            ].map((user, i) => (
                                <div
                                    key={i}
                                    onClick={() => setShowPaymentModal(true)}
                                    className="flex flex-col items-center gap-2 flex-shrink-0 opacity-80 hover:opacity-100 cursor-pointer transition-opacity"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white text-red-600 flex items-center justify-center font-bold shadow-sm">
                                        {user.id.toUpperCase()}
                                    </div>
                                    <span className="text-[10px] font-bold">{user.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="relative z-10 flex bg-white/20 rounded-lg p-1 backdrop-blur-sm">
                            <input
                                type="text"
                                placeholder="Amount"
                                className="bg-transparent border-none outline-none text-white placeholder-white/70 px-4 w-full text-sm font-semibold"
                            />
                            <button
                                onClick={() => setShowPaymentModal(true)}
                                className="bg-white text-red-600 px-6 py-2 rounded-md text-xs font-bold shadow-sm hover:bg-gray-50 transition-colors"
                            >
                                SEND
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            {/* Modal for all transactions */}
            {showAllTransactions && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10 shrink-0">
                            <h3 className="text-xl font-bold text-gray-900">All Transactions</h3>
                            <button onClick={() => setShowAllTransactions(false)} className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-colors">&times;</button>
                        </div>
                        <div className="p-0 overflow-y-auto w-full">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-400 uppercase font-semibold border-b border-gray-100 sticky top-0 bg-gray-50 shadow-sm z-10">
                                    <tr>
                                        <th className="pb-4 pt-4 pl-6 whitespace-nowrap pr-4">Date</th>
                                        <th className="pb-4 pt-4 px-4 whitespace-nowrap">Description</th>
                                        <th className="pb-4 pt-4 px-4 whitespace-nowrap">Type</th>
                                        <th className="pb-4 pt-4 pr-6 pl-4 text-right whitespace-nowrap">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {transactions.map((tx, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-5 pl-6 pr-4 text-gray-500 whitespace-nowrap">{tx.date}</td>
                                            <td className="py-5 px-4 font-bold text-gray-900 whitespace-nowrap">{tx.description}</td>
                                            <td className="py-5 px-4 text-blue-500 font-medium whitespace-nowrap">
                                                <span className="bg-blue-50/50 text-blue-600 py-1.5 px-3 rounded-full text-xs font-bold">{tx.type}</span>
                                            </td>
                                            <td className={`py-5 pr-6 pl-4 text-right font-black whitespace-nowrap ${tx.amount > 0 ? 'text-emerald-500' : 'text-gray-900'}`}>
                                                {tx.amount > 0 ? '+' : ''}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tx.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10 shrink-0">
                            <h3 className="text-xl font-bold text-gray-900">Action Required</h3>
                            <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-colors">&times;</button>
                        </div>
                        <div className="p-6">
                            <div className="mb-6 flex justify-center">
                                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                                    <Landmark className="w-8 h-8" />
                                </div>
                            </div>
                            <h4 className="text-center font-bold text-lg text-gray-900 mb-2">Pending Payment Due</h4>
                            <p className="text-center text-gray-600 text-sm mb-8">
                                A payment of <strong className="text-gray-900">$15,000.00</strong> is required before you can perform any transactions on this account. Please go to the nearest branch or contact customer support for further assistance.
                            </p>
                            <div className="flex flex-col gap-3">
                                <button className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-red-700 transition-colors shadow-sm">
                                    Contact Support
                                </button>
                                <button
                                    onClick={() => setShowPaymentModal(false)}
                                    className="w-full bg-gray-50 text-gray-600 font-bold py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
