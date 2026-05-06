import React, { useMemo } from "react";

export default function Analytics({ deals = [] }) {

  const metrics = useMemo(() => {

    if (deals.length === 0) {
      return {
        pqi_score: 0,
        edi_score: 0,
        pi_score: 0,
        pipeline_coverage: 0,
        conversion_rate: 0,
        forecast_accuracy: 0,
        followup_compliance: 0,
      };
    }

    const total = deals.length;

    const activeDeals = deals.filter(d => d.stage !== "Rejected");
    const approvedDeals = deals.filter(d => d.stage === "Approved");

    const withFollowup = deals.filter(d => d.next_action_date);
    const slaBreaches = deals.filter(d => d.sla_breach_status);

    // PIPELINE COVERAGE
    const pipeline_coverage = (activeDeals.length / total) * 100;

    // CONVERSION
    const conversion_rate = (approvedDeals.length / total) * 100;

    // FORECAST (weighted confidence)
    const forecast_accuracy =
      deals.reduce((sum, d) => sum + (Number(d.confidence_percent) || 0), 0) / total;

    // FOLLOW-UP COMPLIANCE
    const followup_compliance =
      (withFollowup.length / total) * 100;

    // PERFORMANCE INDEX (SLA)
    const pi_score =
      100 - (slaBreaches.length / total) * 100;

    // TEMP (until signals + usage connected)
    const pqi_score = 70;
    const edi_score = 65;

    return {
      pqi_score: Math.round(pqi_score),
      edi_score: Math.round(edi_score),
      pi_score: Math.round(pi_score),

      pipeline_coverage: Math.round(pipeline_coverage),
      conversion_rate: Math.round(conversion_rate),
      forecast_accuracy: Math.round(forecast_accuracy),
      followup_compliance: Math.round(followup_compliance),
    };

  }, [deals]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">

      <h2 className="text-2xl font-semibold">
        Connected Analytics
      </h2>

      {/* KPI */}
      <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card title="PQI" value={metrics.pqi_score} />
        <Card title="EDI" value={metrics.edi_score} />
        <Card title="PI" value={metrics.pi_score} />
        <Card title="Pipeline" value={metrics.pipeline_coverage} />
        <Card title="Conversion" value={metrics.conversion_rate} />
        <Card title="Forecast" value={metrics.forecast_accuracy} />
        <Card title="Follow-up" value={metrics.followup_compliance} />
      </div>

      {/* PIPELINE INSIGHT */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="font-medium mb-3">Pipeline Health</h3>

        <div className="text-sm space-y-2">
          <p>Total Deals: {deals.length}</p>
          <p>Active Deals: {deals.filter(d => d.stage !== "Rejected").length}</p>
          <p>Approved Deals: {deals.filter(d => d.stage === "Approved").length}</p>
          <p>SLA Breaches: {deals.filter(d => d.sla_breach_status).length}</p>
        </div>
      </div>

    </div>
  );
}

/* CARD */
function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <p className="text-xs text-gray-500">{title}</p>
      <h3 className="text-lg font-semibold">{value}%</h3>
    </div>
  );
}