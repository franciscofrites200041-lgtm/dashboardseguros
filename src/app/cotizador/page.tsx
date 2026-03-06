"use client";

import { Header } from "@/components/Header";

export default function CotizadorPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            <div className="flex-1 w-full overflow-hidden">
                <iframe
                    src="/cotizador-iframe"
                    title="Cotizador Innmed"
                    className="w-full h-full border-none"
                    style={{ minHeight: "calc(100vh - 64px)" }}
                    allow="payment"
                />
            </div>
        </div>
    );
}
