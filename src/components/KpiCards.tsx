"use client";

import { Shield, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { KpiData } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface KpiCardsProps {
    data: KpiData;
    loading?: boolean;
}

function KpiSkeleton() {
    return (
        <Card className="relative overflow-hidden border-zinc-200">
            <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                    <div className="h-4 w-24 rounded bg-zinc-200" />
                    <div className="h-8 w-32 rounded bg-zinc-200" />
                    <div className="h-3 w-20 rounded bg-zinc-200" />
                </div>
            </CardContent>
        </Card>
    );
}

export function KpiCards({ data, loading }: KpiCardsProps) {
    if (loading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <KpiSkeleton />
                <KpiSkeleton />
                <KpiSkeleton />
            </div>
        );
    }

    const kpis = [
        {
            title: "Pólizas Vigentes",
            value: data.totalVigentes.toString(),
            subtitle: "Activas actualmente",
            icon: Shield,
            accentColor: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-l-blue-500",
        },
        {
            title: "Proyectado a Cobrar",
            value: formatCurrency(data.montoProyectado),
            subtitle: "Monto mensual vigente",
            icon: TrendingUp,
            accentColor: "text-emerald-600",
            bgColor: "bg-emerald-50",
            borderColor: "border-l-emerald-500",
        },
        {
            title: "Monto en Riesgo",
            value: formatCurrency(data.montoEnRiesgo),
            subtitle: "Pólizas impagas",
            icon: AlertTriangle,
            accentColor: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-l-red-500",
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kpis.map((kpi) => (
                <Card
                    key={kpi.title}
                    className={`relative overflow-hidden border-zinc-200 border-l-4 ${kpi.borderColor} transition-shadow hover:shadow-md`}
                >
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-zinc-500">
                                    {kpi.title}
                                </p>
                                <p className="text-2xl font-bold tracking-tight text-zinc-900">
                                    {kpi.value}
                                </p>
                                <p className="text-xs text-zinc-400">{kpi.subtitle}</p>
                            </div>
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg ${kpi.bgColor}`}
                            >
                                <kpi.icon className={`h-5 w-5 ${kpi.accentColor}`} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
