"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    LayoutDashboard,
    ClipboardList,
    Building2,
    UserPlus,
    Calculator,
    Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CompanyChart } from "./CompanyChart";
import { NewPolizaModal } from "./NewPolizaModal";
import { Poliza } from "@/lib/types";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

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
    const [showNewPoliza, setShowNewPoliza] = useState(false);

    const today = new Date().toLocaleDateString("es-AR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handlePolizaCreated = (newPoliza: Poliza) => {
        if (onPolizasChange) {
            onPolizasChange([...polizas, newPoliza]);
        }
    };

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
                <div className="flex h-16 items-center justify-between px-8">
                    {/* Left: Logo/Menu Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="flex items-center gap-3 transition-opacity hover:opacity-80">
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
                            </button>
                        </SheetTrigger>

                        {/* Sidebar Drawer */}
                        <SheetContent side="left" className="flex w-80 flex-col border-r border-zinc-200 bg-white p-0">
                            <SheetHeader className="border-b border-zinc-100 p-6 text-left">
                                <SheetTitle className="flex items-center gap-3">
                                    <Image
                                        src="/logo-inncome.png"
                                        alt="Inncome Logo"
                                        width={32}
                                        height={32}
                                        className="rounded-lg"
                                    />
                                    <span>Inncome Gestión</span>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
                                {/* Top Nav Links */}
                                <nav className="space-y-1">
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                                    isActive
                                                        ? "bg-blue-50 text-blue-700"
                                                        : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
                                                )}
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.label}
                                            </Link>
                                        );
                                    })}

                                    {/* Sub Items using buttons for Modals/Popovers within Sidebar */}
                                    <div className="pt-4">
                                        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                            Acciones
                                        </p>

                                        <button
                                            onClick={() => { }} // Could open the chart modal or navigate
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/80 hover:text-zinc-900"
                                        >
                                            <Building2 className="h-4 w-4" />
                                            Compañías
                                        </button>

                                        <button
                                            onClick={() => setShowNewPoliza(true)}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/80 hover:text-zinc-900"
                                        >
                                            <UserPlus className="h-4 w-4" />
                                            Crear Cliente
                                        </button>

                                        <Link
                                            href="/cotizador"
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                                pathname === "/cotizador"
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
                                            )}
                                        >
                                            <Calculator className="h-4 w-4" />
                                            Cotizar
                                        </Link>
                                    </div>
                                </nav>

                                {/* Bottom Nav Link: Settings */}
                                <div className="border-t border-zinc-100 pt-4">
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/80 hover:text-zinc-900"
                                    >
                                        <Settings className="h-4 w-4" />
                                        Configuración
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Right: Date Only */}
                    <div>
                        <span className="text-sm text-zinc-500">
                            {today.charAt(0).toUpperCase() + today.slice(1)}
                        </span>
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
