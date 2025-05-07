"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", Accepted: 186, Rejected: 80 },
    { month: "February", Accepted: 305, Rejected: 200 },
    { month: "March", Accepted: 237, Rejected: 120 },
    { month: "April", Accepted: 73, Rejected: 190 },
    { month: "May", Accepted: 209, Rejected: 130 },
    { month: "June", Accepted: 214, Rejected: 140 },
]

const chartConfig = {
    Accepted: {
        label: "Accepted",
        color: "#ff6666",
    },
    Rejected: {
        label: "Rejected",
        color: "#606060",
    },
}

export function ChartComponent() {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="Accepted" fill="var(--color-Accepted)" radius={4} />
                <Bar dataKey="Rejected" fill="var(--color-Rejected)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
