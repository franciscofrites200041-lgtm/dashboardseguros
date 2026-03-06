"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Wifi, LayoutDashboard, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/polizas", label: "Pólizas", icon: ClipboardList },
];

export function Header() {
    const pathname = usePathname();

    const today = new Date().toLocaleDateString("es-AR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <div className="flex h-16 items-center justify-between px-8">
                {/* Left: Logo + Title + Nav */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo-inncome.png"
                            alt="Inncome Logo"
                            width={36}
                            height={36}
                            className="rounded-lg"
                        />
                        <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
                            Inncome Gestión
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden items-center gap-1 sm:flex">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-blue-50 text-blue-700"
                                            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Date + Status */}
                <div className="flex items-center gap-5">
                    <span className="hidden text-sm text-zinc-500 lg:block">
                        {today.charAt(0).toUpperCase() + today.slice(1)}
                    </span>
                    <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
                        <Wifi className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-xs font-medium text-emerald-700">
                            Conectado
                        </span>
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
