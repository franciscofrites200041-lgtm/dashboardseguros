"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { KpiCards } from "@/components/KpiCards";
import { AlertsTable } from "@/components/AlertsTable";
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
      <Header
        companyData={companyData}
        loading={loading}
        polizas={polizas}
        onPolizasChange={setPolizas}
      />

      <main className="space-y-8 px-8 py-8">
        {/* KPI Cards */}
        <section>
          <KpiCards data={kpis} loading={loading} />
        </section>

        {/* Alerts — Full Width */}
        <section>
          <AlertsTable
            polizas={expiringPolizas}
            allPolizas={polizas}
            loading={loading}
          />
        </section>
      </main>

      {/* Floating AI Chat */}
      <AiChatWidget />
    </div>
  );
}
