import { Bar } from "react-chartjs-2";
import { parseTypesCSV } from "../../services/csv_parser";
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";
import { useMemo } from "react";

const options: ChartOptions<"bar"> = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
            labels: {
                color: "#ffffff",
            },
        },
        tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            titleColor: "#000000ff",
            bodyColor: "#000000ff", 
        }
    },
    scales: {
        x: {
            ticks: {
                color: "#cccccc",
            },
            grid: {
                color: "#444444",
            },
        },
        y: {
            ticks: {
                color: "#ffffff",
            },
            grid: {
                color: "#333333",
            },
        },
    },
};

export function TypesTotal() {
    const parsedData = parseTypesCSV()
    
    const data = useMemo<ChartData<"bar", number[], string>>(
        () => ({
            labels: parsedData.map(p => p.name),
            datasets: [
                {
                    label: "Брой",
                    data: parsedData.map(p => p.totalCrimes),
                    backgroundColor: (c: ScriptableContext<"bar">) => {
                        const chart = c.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) return "rgba(229, 245, 15, 1)";

                        const g = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
                        g.addColorStop(0, "rgba(68, 241, 16, 1)");
                        g.addColorStop(1, "rgba(206, 20, 20, 1)");
                        return g;
                    },
                    borderWidth: 0,
                },
            ],
        }),
        []
    );

    return (
        <Bar options={options} data={data} />
    )
}