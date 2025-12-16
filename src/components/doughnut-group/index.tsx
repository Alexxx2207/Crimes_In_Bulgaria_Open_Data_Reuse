import { Doughnut } from "react-chartjs-2";
import { getTotalGrouped } from "../../services/csv_parser";
import styles from './styles.module.css'
import type { ChartOptions } from "chart.js";


const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top",
            labels: {
                color: "#ffffff",
                font: {
                    size: 16, 
                },
            },
        },
    },
};

export function DoughnutGroup() {
    const data = {
        labels: ['Безработни', 'Учащи', 'Безработни и неучащи', 'Други'],
        datasets: [
            {
                label: '',
                data: getTotalGrouped(),
                backgroundColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(221, 0, 255, 1)',
                    'rgba(0, 236, 0, 1)',
                    'rgba(0, 99, 204, 1)',
                ],
                borderColor: [
                    'rgba(255, 255, 255, 1)',
                    'rgba(255, 255, 255, 1)',
                    'rgba(255, 255, 255, 1)',
                    'rgba(255, 255, 255, 1)',
                ],
                borderWidth: 3,
            },
        ],
    };

    return (
        <div className={styles.container}>
            <div style={{ width: 800, height: 500 }}>
                <Doughnut options={options} data={data} />
            </div>
        </div>
    )
}