import styles from './styles.module.css'
import { Map } from '../map';
import { TypesTotal } from '../types-total';
import { DoughnutGroup } from '../doughnut-group';
import { getCriminalsCSV, getRecidivistsCSV, getTotalCrimesCSV } from '../../services/csv_parser';

export function App() {
    return (
        <div className={styles.page}>
            <h1>Статистика за извършените престъпления през 2024</h1>

            <section>
                <h2>Обща информация</h2>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div>{getTotalCrimesCSV()}</div>
                        <p>Извършени престъпления</p>
                    </div>
                    <div className={styles.card}>
                        <div>{getCriminalsCSV()}</div>
                        <p>Установени извършители</p>
                    </div>
                    <div className={styles.card}>
                        <div>{getRecidivistsCSV()}</div>
                        <p>Рецидивисти</p>
                    </div>
                </div>
            </section>

            <section className={styles.totalByTypesSection}>
                <h2>Брой извършени престъпления по вид</h2>
                <TypesTotal />
            </section>

            <section>
                <h2>Разбиване по социална група</h2>
                <DoughnutGroup />
            </section>

            <section>
                <h2>Извършени престъпления по области</h2>
                <Map />
            </section>
            
        </div>
    )
}
