"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    LayoutDashboard,
    ClipboardList,
    Building2,
    UserPlus,
    Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CompanyChart } from "./CompanyChart";
import { NewPolizaModal } from "./NewPolizaModal";
import { Poliza } from "@/lib/types";

interface HeaderProps {
    companyData?: { name: string; value: number }[];
    loading?: boolean;
    polizas?: Poliza[];
    onPolizasChange?: (polizas: Poliza[]) => void;
}

const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/polizas", label: "Pólizas", icon: ClipboardList },
];

export function Header({
    companyData = [],
    loading = false,
    polizas = [],
    onPolizasChange,
}: HeaderProps) {
    const pathname = usePathname();
    const [showChart, setShowChart] = useState(false);
    const [showNewPoliza, setShowNewPoliza] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);
    const chartBtnRef = useRef<HTMLButtonElement>(null);

    const today = new Date().toLocaleDateString("es-AR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // Close popover on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                chartRef.current &&
                !chartRef.current.contains(event.target as Node) &&
                chartBtnRef.current &&
                !chartBtnRef.current.contains(event.target as Node)
            ) {
                setShowChart(false);
            }
        }
        if (showChart) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showChart]);

    const handlePolizaCreated = (newPoliza: Poliza) => {
        if (onPolizasChange) {
            onPolizasChange([...polizas, newPoliza]);
        }
    };

    return (
        <>
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

                            {/* Compañías popover button */}
                            <div className="relative">
                                <button
                                    ref={chartBtnRef}
                                    onClick={() => setShowChart((prev) => !prev)}
                                    className={cn(
                                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                        showChart
                                            ? "bg-blue-50 text-blue-700"
                                            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                                    )}
                                >
                                    <Building2 className="h-4 w-4" />
                                    Compañías
                                </button>

                                {/* Chart popover */}
                                {showChart && (
                                    <div
                                        ref={chartRef}
                                        className="absolute left-0 top-full mt-2 w-[420px] rounded-xl border border-zinc-200 bg-white p-0 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-[60]"
                                    >
                                        <CompanyChart
                                            data={companyData}
                                            loading={loading}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Cotizar button */}
                            <Link
                                href="/cotizador"
                                className={cn(
                                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    pathname === "/cotizador"
                                        ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                                )}
                            >
                                <Calculator className="h-4 w-4" />
                                Cotizar
                            </Link>
                        </nav>
                    </div>

                    {/* Right: Date + Cotizar + Crear Cliente */}
                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm text-zinc-500 lg:block">
                            {today.charAt(0).toUpperCase() + today.slice(1)}
                        </span>

                        {/* Crear Cliente button */}
                        <button
                            onClick={() => setShowNewPoliza(true)}
                            className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50"
                        >
                            <UserPlus className="h-4 w-4" />
                            Crear Cliente
                        </button>
                    </div>
                </div>
            </header>

            {/* New Poliza Modal */}
            <NewPolizaModal
                open={showNewPoliza}
                onClose={() => setShowNewPoliza(false)}
                onCreated={handlePolizaCreated}
            />
        </>
    );
}
