"use client";

import Link from "next/link";
import { Calculator, ShieldAlert, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CotizadorWidget() {
    return (
        <Card className="border-zinc-200 flex flex-col relative overflow-hidden bg-white group">
            <CardHeader className="pb-4 shrink-0 relative z-10 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Calculator className="h-5 w-5 text-blue-600" />
                        <h2 className="text-base font-semibold text-zinc-900">Cotizar</h2>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100">
                        Rápido y fácil
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-6 flex flex-col relative z-10 gap-6">
                <Link
                    href="/cotizador"
                    className="flex flex-col items-center justify-center gap-3 rounded-xl bg-blue-600 p-8 text-center text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"
                >
                    <Zap className="h-8 w-8 text-blue-200" />
                    <span className="text-xl font-bold tracking-tight">Seguros AP</span>
                    <span className="text-xs font-medium text-blue-200 bg-blue-700/50 px-3 py-1 rounded-full">Automotores Próximamente</span>
                </Link>

                <button
                    disabled
                    className="flex flex-col items-center justify-center gap-3 rounded-xl bg-zinc-50 border-2 border-dashed border-zinc-200 p-8 text-center text-zinc-400 cursor-not-allowed transition-all hover:bg-zinc-100"
                >
                    <ShieldAlert className="h-8 w-8 text-zinc-300" />
                    <span className="text-xl font-bold tracking-tight text-zinc-500">Sepelios</span>
                    <span className="text-xs font-medium bg-zinc-200 text-zinc-600 px-3 py-1 rounded-full">Próximamente</span>
                </button>
            </CardContent>

            {/* Background Watermark text */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
                <div className="origin-center -rotate-90 md:rotate-0 whitespace-nowrap">
                    <h2 className="text-8xl font-black tracking-tighter text-blue-900">
                        INNCOME
                    </h2>
                </div>
            </div>
        </Card>
    );
}
