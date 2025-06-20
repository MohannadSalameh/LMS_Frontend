// useDashboardData.js
import { useContext } from "react";
import { DashboardDataContext } from "./DashboardDataContext"; // 👈 import the context

export const useDashboardData = () => {
    const context = useContext(DashboardDataContext); // ✅ correct usage
    if (!context) {
        throw new Error("useDashboardData must be used within a DashboardDataProvider");
    }
    return context;
};
