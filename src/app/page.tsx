"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { KpiCards } from "@/components/KpiCards";
import { AlertsTable } from "@/components/AlertsTable";
import { CompanyChart } from "@/components/CompanyChart";
import { AiChatWidget } from "@/components/AiChatWidget";
import { Poliza, KpiData } from "@/lib/types";
import { fetchPolizas } from "@/lib/api";
import {
  calculateKpis,
  getExpiringPolizas,
  groupByCompany,
} from "@/lib/utils";

export default function DashboardPage() {
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

  const kpis: KpiData = loading
    ? { totalVigentes: 0, montoProyectado: 0, montoEnRiesgo: 0 }
    : calculateKpis(polizas);

  const expiringPolizas = loading ? [] : getExpiringPolizas(polizas, 30);
  const companyData = loading ? [] : groupByCompany(polizas);

  return (
    <div className="min-h-screen bg-zinc-50/50">
      <Header />

      <main className="space-y-8 px-8 py-8">
        {/* KPI Cards */}
        <section>
          <KpiCards data={kpis} loading={loading} />
        </section>

        {/* Alerts + Chart */}
        <section className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <AlertsTable
              polizas={expiringPolizas}
              allPolizas={polizas}
              loading={loading}
            />
          </div>
          <div>
            <CompanyChart data={companyData} loading={loading} />
          </div>
        </section>
      </main>

      {/* Floating AI Chat */}
      <AiChatWidget />
    </div>
  );
}
