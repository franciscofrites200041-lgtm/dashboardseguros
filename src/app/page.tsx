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
import { CotizadorWidget } from "@/components/CotizadorWidget";
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

      <main className="flex-1 px-8 py-8 lg:py-10 max-w-screen-2xl mx-auto w-full">
        {/* Main 3-column Grid based on the refined wireframe */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">

          {/* Left Column (Alerts Table) - Takes 4 columns */}
          <div className="col-span-12 lg:col-span-4 flex flex-col">
            <AlertsTable
              polizas={expiringPolizas}
              allPolizas={polizas}
              loading={loading}
            />
          </div>

          {/* Middle Column (KPIs and Buttons) - Takes 4 columns */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">

            {/* Top: KPI Vigentes */}
            <div>
              <KpiCards data={kpis} loading={loading} />
            </div>

            {/* Middle: 4 Big Action Buttons (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/"
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md group aspect-[4/3]"
              >
                <div className="rounded-full bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                  <LayoutDashboard className="h-8 w-8 text-blue-600" />
                </div>
                <span className="text-lg font-medium text-zinc-900">Dashboard</span>
              </Link>

              <Link
                href="/polizas"
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md group aspect-[4/3]"
              >
                <div className="rounded-full bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                  <ClipboardList className="h-8 w-8 text-blue-600" />
                </div>
                <span className="text-lg font-medium text-zinc-900">Pólizas</span>
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md group aspect-[4/3] w-full">
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
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md group aspect-[4/3] w-full"
              >
                <div className="rounded-full bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                  <UserPlus className="h-8 w-8 text-blue-600" />
                </div>
                <span className="text-lg font-medium text-zinc-900">Crear Cliente</span>
              </button>
            </div>
          </div>

          {/* Right Column (Cotizador) - Takes 4 columns */}
          <div className="col-span-12 lg:col-span-4 flex flex-col">
            <CotizadorWidget />
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
