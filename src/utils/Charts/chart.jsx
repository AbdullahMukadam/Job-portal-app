"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export function ChartComponent({
    totaljobsPosted,
    totalApplicants,
    role,
    totalAppliedJobs,
    totalAcceptedJobs,
    totalRejectedJobs
}) {
    // Define chart data based on user role
    const chartData = React.useMemo(() => {
        if (role === "candidate") {
            return [
                { jobs: "Applied-Jobs", value: parseInt(totalAppliedJobs || 0), fill: "hsl(var(--chart-1))" },
                { jobs: "Accepted-Jobs", value: parseInt(totalAcceptedJobs || 0), fill: "hsl(var(--chart-2))" },
                { jobs: "Rejected-Jobs", value: parseInt(totalRejectedJobs || 0), fill: "hsl(var(--chart-3))" },
            ]
        } else {
            return [
                { jobs: "Jobs-Posted", value: parseInt(totaljobsPosted || 0), fill: "hsl(var(--chart-1))" },
                { jobs: "Total-Applicants ", value: parseInt(totalApplicants || 0), fill: "hsl(var(--chart-2))" },
            ]
        }
    }, [role, totalAppliedJobs, totalAcceptedJobs, totalRejectedJobs, totaljobsPosted, totalApplicants]);

    // Chart configuration
    const chartConfig = {
        chrome: {
            label: "Applied Jobs",
            color: "hsl(var(--chart-1))",
        },
        safari: {
            label: "Accepted Jobs",
            color: "hsl(var(--chart-2))",
        },
        firefox: {
            label: "Rejected Jobs",
            color: "hsl(var(--chart-3))",
        },
        edge: {
            label: "Jobs Posted",
            color: "hsl(var(--chart-1))",
        },
        other: {
            label: "Total Applicants",
            color: "hsl(var(--chart-2))",
        },
    }

    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto h-52 max-h-[200px]"
        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="jobs"
                    innerRadius={60}
                    strokeWidth={5}
                >
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            fill="currentColor"
                                            fontSize="24px"
                                            fontWeight="bold"
                                            className="dark:fill-white"
                                        >
                                            {role === "candidate" ? totalAppliedJobs : totaljobsPosted}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            fill="#64748b" /* Default muted text color */
                                            fontSize="12px"
                                            className="dark:fill-white"
                                        >
                                            {role === "candidate" ? "Jobs Applied" : "Jobs Posted"}
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    )
}