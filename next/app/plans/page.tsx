'use client'

import { redirect, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Tab, Tabs } from "../components/Tabs";
import { Plans, getPlans } from "../services";
import { useAuthStore } from "../store";

export default function Page() {
    const { token, hasHydrated } = useAuthStore();
    const [plans, setPlans] = useState<Plans>([]);
    const [filteredPlans, setFilteredPlans] = useState<Plans>([]);
    const router = useRouter();

    useEffect(() => {
        (async function () {
            if (token === null) return;

            const result = await getPlans(token);

            setPlans(result);
        })()
    }, [router, token])

    const handleFilter = useCallback((status: "expired" | "active" | "pending") => {
        setFilteredPlans(plans.filter((plan) => plan.status === status));
    }, [plans])

    if (!hasHydrated) {
        return (
            <svg
                className="size-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
            </svg>
        )
    }

    if (token === null) {
        return redirect('/');
    }

    return (
        <div className="flex flex-col mx-6 w-full h-full p-4">
            <Tabs>
                <Tab label="All">
                    <div className="flex gap-6 flex-wrap">
                        {plans.map((plan, index) => (
                            <Card key={index} {...plan} />
                        ))}
                    </div>
                </Tab>
                <Tab label="Active" action={() => handleFilter('active')}>
                    <div className="flex gap-6 flex-wrap">
                        {filteredPlans.map((plan, index) => (
                            <Card key={index} {...plan} />
                        ))}
                    </div>
                </Tab>
                <Tab label="Pending" action={() => handleFilter('pending')}>
                    <div className="flex gap-6 flex-wrap">
                        {filteredPlans.map((plan, index) => (
                            <Card key={index} {...plan} />
                        ))}
                    </div>
                </Tab>
                <Tab label="Expired" action={() => handleFilter('expired')}>
                    <div className="flex gap-6 flex-wrap">
                        {filteredPlans.map((plan, index) => (
                            <Card key={index} {...plan} />
                        ))}
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}