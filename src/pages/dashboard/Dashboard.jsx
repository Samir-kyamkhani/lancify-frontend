import React from "react";
import StatsSection from "../../components/dashboard/StatsSection";
import ProjectsCard from "../../components/dashboard/ProjectsCard";
import ClientSection from "../../components/dashboard/ClientSection";
import NotificationsSection from "../../components/dashboard/NotificationsSection";
import AnalyticsSection from "../../components/dashboard/AnalyticsSection";
import UserDashboardPage from "../clientDashboard/UserDashboardPage";
import { getUserRole } from "../../settings";

export default function Dashboard() {
  const role = getUserRole(); // Change this dynamically based on logged-in user

  return (
    <div className="min-h-screen w-full bg-gray-50 py-6 text-black">
      {role === "user" && <UserDashboardPage />}

      {role === "admin" && (
        <main className="space-y-4 sm:space-x-12 w-full grid grid-cols-1 gap-6">
          <section className="grid grid-cols-1 w-full gap-6">
            <StatsSection />
          </section>
          <section className="grid grid-cols-1 w-full gap-6">
            <AnalyticsSection />
          </section>
          <section className="w-full">
            <ClientSection />
          </section>
          <section className="w-full grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ProjectsCard />
            </div>
            <div className="xl:col-span-1">
              <NotificationsSection />
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
