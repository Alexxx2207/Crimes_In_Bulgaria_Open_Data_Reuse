import { Bar } from "react-chartjs-2";
import { parseTypesCSV } from "../../services/csv_parser";

export const options = {
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
    },
    scales: {
        x: {
            ticks: {
                color: "#cccccc",
            },
            grid: {
                color: "#444444",
                borderColor: "#888888",
            },
        },
        y: {
            ticks: {
                color: "#ffffff",
            },
            grid: {
                color: "#333333",
                borderColor: "#888888",
            },
        },
    },
};

export function TypesTotal() {
    const parsedData = parseTypesCSV()
    
    const data = {
        labels: parsedData.map(p => p.name),
        datasets: [
            {
                label: 'Брой',
                data: parsedData.map(p => p.totalCrimes),
                backgroundColor: 'rgba(50, 215, 0, 1)',
                color: 'rgba(255, 255, 255, 1)',
            },
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
}