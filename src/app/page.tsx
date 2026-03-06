"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  Building2,
  UserPlus,
  Calculator,
  ShieldAlert
} from "lucide-react";
import { Header } from "@/components/Header";
import { KpiCards } from "@/components/KpiCards";
import { AlertsTable } from "@/components/AlertsTable";
import { AiChatWidget } from "@/components/AiChatWidget";
import { CompanyChart } from "@/components/CompanyChart";
import { NewPolizaModal } from "@/components/NewPolizaModal";
import { Poliza, KpiData } from "@/lib/types";
import { fetchPolizas } from "@/lib/api";
import {
  calculateKpis,
  getExpiringPolizas,
  groupByCompany,
} from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

export default function DashboardPage() {
  const [polizas, setPolizas] = useState<Poliza[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPoliza, setShowNewPoliza] = useState(false);

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

  const kpis: KpiData = loading
    ? { totalVigentes: 0, montoProyectado: 0, montoEnRiesgo: 0 }
    : calculateKpis(polizas);

  const expiringPolizas = loading ? [] : getExpiringPolizas(polizas, 30);
  const companyData = loading ? [] : groupByCompany(polizas);

  const handlePolizaCreated = (newPoliza: Poliza) => {
    setPolizas([...polizas, newPoliza]);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 flex flex-col">
      <Header
        companyData={companyData}
        loading={loading}
        polizas={polizas}
        onPolizasChange={setPolizas}
      />

      <main className="flex-1 px-8 py-8 h-[calc(100vh-64px)] overflow-hidden">
        {/* Main 2-column Grid based on wireframe */}
        <div className="grid h-full grid-cols-12 gap-8">

          {/* Left Column (Alerts Table) - Takes 5 columns */}
          <div className="col-span-12 lg:col-span-5 h-full overflow-hidden flex flex-col">
            <AlertsTable
              polizas={expiringPolizas}
              allPolizas={polizas}
              loading={loading}
            />
          </div>

          {/* Right Column - Takes 7 columns */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 h-full overflow-hidden">

            {/* Top: KPI Vigentes */}
            <div className="h-40 shrink-0">
              <KpiCards data={kpis} loading={loading} />
            </div>

            {/* Middle: 4 Big Action Buttons (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-4 shrink-0">
              <Link
                href="/"
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md group"
              >
                <div className="rounded-full bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                  <LayoutDashboard className="h-8 w-8 text-blue-600" />
                </div>
                <span className="text-lg font-medium text-zinc-900">Dashboard</span>
              </Link>

              <Link
                href="/polizas"
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md group"
              >
                <div className="rounded-full bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                  <ClipboardList className="h-8 w-8 text-blue-600" />
                </div>
                <span className="text-lg font-medium text-zinc-900">Pólizas</span>
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md group h-full w-full">
                    <div className="rounded-full bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                      <Building2 className="h-8 w-8 text-blue-600" />
                    </div>
                    <span className="text-lg font-medium text-zinc-900">Compañías</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogTitle className="sr-only">Compañías</DialogTitle>
                  <CompanyChart data={companyData} loading={loading} />
                </DialogContent>
              </Dialog>

              <button
                onClick={() => setShowNewPoliza(true)}
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md group"
              >
                <div className="rounded-full bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                  <UserPlus className="h-8 w-8 text-blue-600" />
                </div>
                <span className="text-lg font-medium text-zinc-900">Crear Cliente</span>
              </button>
            </div>

            {/* Bottom: Cotizador Banner */}
            <div className="flex-1 rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden flex flex-col justify-center min-h-0">
              <div className="flex h-full items-center justify-between p-8">
                {/* Left Side Cotizar Buttons */}
                <div className="flex flex-col justify-center gap-4 w-1/3">
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">Cotizar</h3>

                  <Link
                    href="/cotizador"
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 px-6 text-lg font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
                  >
                    <Calculator className="h-6 w-6" />
                    Seguros AP
                  </Link>

                  <button
                    disabled
                    className="flex items-center justify-center gap-2 rounded-xl bg-zinc-100 py-4 px-6 text-lg font-semibold text-zinc-400 border border-zinc-200 cursor-not-allowed"
                    title="Próximamente"
                  >
                    <ShieldAlert className="h-6 w-6" />
                    Sepelios
                  </button>
                </div>

                {/* Right Side Big Logo */}
                <div className="flex flex-1 items-center justify-end pl-12 opacity-10">
                  <h2 className="text-7xl font-black tracking-tighter text-blue-900 flex items-center gap-4">
                    LOGO
                    <span className="text-8xl">INNCOME</span>
                  </h2>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Floating AI Chat */}
      <AiChatWidget />

      {/* New Poliza Modal */}
      <NewPolizaModal
        open={showNewPoliza}
        onClose={() => setShowNewPoliza(false)}
        onCreated={handlePolizaCreated}
      />
    </div>
  );
}
