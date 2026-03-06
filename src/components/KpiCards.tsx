"use client";

import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { KpiData } from "@/lib/types";

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
        return <KpiSkeleton />;
    }

    return (
        <Card className="relative overflow-hidden border-zinc-200 border-l-4 border-l-blue-500 transition-shadow hover:shadow-md h-full">
            <CardContent className="flex h-full flex-col justify-center p-8">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="font-medium text-zinc-500 text-lg">
                            Pólizas Vigentes
                        </p>
                        <p className="text-5xl font-bold tracking-tight text-zinc-900">
                            {data.totalVigentes.toString()}
                        </p>
                        <p className="text-sm text-zinc-400">Activas actualmente</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                        <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
