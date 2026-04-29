import React from "react";
import Footer from "../homePage/footer";
import Navbar from "../homePage/navbar";

export default function GovernancePage() {
  return (
    <>
    <Navbar/>
    <div className="bg-landvista-bg text-landvista-charcoal">

      {/* HERO */}
      <section className="bg-landvista-bg py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl text-landvista-charcoal font-semibold mb-6">
            Governance & Control Framework
          </h1>
          <p className="text-lg text-landvista-grey max-w-2xl mb-6">
            TerraSignal operates under structured governance systems designed to ensure transparency, data integrity, and disciplined decision-making.
          </p>

          <button className="bg-landvista-blue text-white px-6 py-3 rounded-md font-medium">
            View Governance Framework
          </button>

          <p className="text-sm text-landvista-grey mt-4">
            All access and interactions are controlled and monitored
          </p>
        </div>
      </section>

      {/* SECTION WRAPPER */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 space-y-20">

        {/* GOVERNANCE PRINCIPLES */}
        <Section title="Governance Principles">
          <Grid>
            <Card title="Independent Model" />
            <Card title="Policy-Aligned Intelligence" />
            <Card title="No Speculative Outputs" />
            <Card title="Controlled Access Only" />
          </Grid>
        </Section>

        {/* ACCESS CONTROL */}
        <Section title="Access Control System">
          <p className="mb-6 text-landvista-grey">
            Access is governed through RBAC, tier-based visibility, and contextual restrictions.
          </p>

          <Grid>
            <Card title="Visitor" desc="Public view only" />
            <Card title="Applicant" desc="Restricted preview" />
            <Card title="Investor" desc="Intelligence access" />
            <Card title="Mandate User" desc="Deal-level access" />
            <Card title="Admin / Founder" desc="Full control" />
          </Grid>
        </Section>

        {/* NDA */}
        <Section title="NDA Enforcement">
          <Grid>
            <Card title="Mandatory NDA" desc="Required before access" />
            <Card title="Version Controlled" />
            <Card title="Logged with Metadata" />
          </Grid>

          <Alert text="No NDA → No intelligence access" />
        </Section>

        {/* DATA GOVERNANCE */}
        <Section title="Data Governance">
          <Grid>
            <Card title="Multi-source validation" />
            <Card title="Signal-based structuring" />
            <Card title="Analyst verification" />
          </Grid>
        </Section>

        {/* DOCUMENT SECURITY */}
        <Section title="Document Security">
          <Grid>
            <Card title="No open downloads" />
            <Card title="Signed URLs (time-limited)" />
            <Card title="Watermarking (user + timestamp)" />
            <Card title="Controlled backend delivery" />
          </Grid>
        </Section>

        {/* AUDIT */}
        <Section title="Audit & Tracking">
          <Grid>
            <Card title="Login / Logout" />
            <Card title="NDA acceptance" />
            <Card title="Document access" />
            <Card title="Intelligence views" />
            <Card title="Admin actions" />
          </Grid>
        </Section>

        {/* PLATFORM RESTRICTIONS */}
        <Section title="Platform Restrictions">
          <List
            items={[
              "No brokerage activities",
              "No land transactions",
              "No ROI projections",
              "No speculative insights",
            ]}
          />
        </Section>

        {/* COMPLIANCE */}
        <Section title="Compliance & Legal Framework">
          <List
            items={[
              "Advisory-only platform",
              "No direct solicitation",
              "Decision-support information only",
            ]}
          />
        </Section>

        {/* SYSTEM STATES */}
        <Section title="System Behavior States">
          <Grid>
            <Card title="Access Denied" />
            <Card title="NDA Required" />
            <Card title="Session Expired" />
            <Card title="Unauthorized Action" />
          </Grid>
        </Section>

        {/* CTA */}
        <section className="bg-landvista-blue text-white p-10 rounded-xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Access a Governed Intelligence Platform
          </h2>
          <p className="text-gray-300 mb-6">
            Access is subject to qualification and approval
          </p>
          <button className="bg-white text-landvista-blue px-6 py-3 rounded-md font-medium">
            Request Access
          </button>
        </section>

      </div>

      {/* FOOTER */}
  <Footer/>

    </div>
  </>);
}


/* ---------------- COMPONENTS ---------------- */

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-semibold text-landvista-blue mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Grid({ children }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
}

function Card({ title, desc }) {
  return (
    <div className="bg-white border rounded-lg p-5">
      <h3 className="font-semibold text-landvista-charcoal mb-2">
        {title}
      </h3>
      {desc && (
        <p className="text-sm text-landvista-grey">{desc}</p>
      )}
    </div>
  );
}

function Alert({ text }) {
  return (
    <div className="mt-6 bg-landvista-maroon/10 text-landvista-maroon px-4 py-3 rounded-md font-medium">
      {text}
    </div>
  );
}

function List({ items }) {
  return (
    <ul className="space-y-3 text-landvista-grey">
      {items.map((item, i) => (
        <li key={i}>• {item}</li>
      ))}
    </ul>
  );
}