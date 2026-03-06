"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { PolizasTable } from "@/components/PolizasTable";
import { AiChatWidget } from "@/components/AiChatWidget";
import { Poliza } from "@/lib/types";
import { fetchPolizas } from "@/lib/api";

export default function PolizasPage() {
    const [polizas, setPolizas] = useState<Poliza[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchPolizas();
                setPolizas(data);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-50/50">
            <Header />
            <main className="px-8 py-8">
                <PolizasTable
                    polizas={polizas}
                    onPolizasChange={setPolizas}
                    loading={loading}
                />
            </main>
            <AiChatWidget />
        </div>
    );
}
