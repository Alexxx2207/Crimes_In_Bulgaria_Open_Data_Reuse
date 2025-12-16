import by_provinces from "../assets/by_province.csv?raw";
import by_types from "../assets/by_type.csv?raw";

interface RowData {
    name: string,
    totalCrimes: number,
    recidivist: number,
    unemployed: number,
    doNothing: number,
    study: number,
    other: number
}

export function parseProvincesCSV(): RowData[] {
    const lines = by_provinces.split('\n')
    
    const result: RowData[] = []

    for(let row = 6; row < 35; ++row) {
        const rowData = splitCSV(lines[row])
        
        result[row-6] = {
            name: rowData[1],
            totalCrimes: Number(rowData[2]),
            recidivist: Number(rowData[3]),
            unemployed: Number(rowData[4]),
            doNothing: Number(rowData[5]),
            study: Number(rowData[6]),
            other: Number(rowData[7])
        }
    }

    return result;
}

const rowsForTypes = [8,9,15,21,23,24,25,26,27,28,31,40,41,43,44,46,47,56,64,75,78,83,86];

export function parseTypesCSV(): RowData[] {
    const lines = by_types.split('\n')
    
    const result: RowData[] = []
    let counter = 0;

    for(let row = 6; row < 86; ++row) {
        if(rowsForTypes.includes(row+1)) {
            const rowData = splitCSV(lines[row])
            
            result[counter++] = {
                name: rowData[1],
                totalCrimes: Number(rowData[2]),
                recidivist: Number(rowData[3]),
                unemployed: Number(rowData[4]),
                doNothing: Number(rowData[5]),
                study: Number(rowData[6]),
                other: Number(rowData[7])
            }
        }
    }

    return result;
}

export function getTotalCrimesCSV() {
    const lines = by_types.split('\n')
    
    const rowData = splitCSV(lines[6])

    return Number(rowData[2])
}

export function getCriminalsCSV() {
    const lines = by_types.split('\n')
    
    const rowData = splitCSV(lines[6])

    return Number(rowData[8])
}

export function getRecidivistsCSV() {
    const lines = by_types.split('\n')
    
    const rowData = splitCSV(lines[6])

    return Number(rowData[3])
}

export function getTotalGrouped() {
    const lines = by_types.split('\n')
    
    const rowData = splitCSV(lines[6])

    return [Number(rowData[4]), Number(rowData[5]), Number(rowData[6]), Number(rowData[7])]
}

function splitCSV(row: string): string[] {
    const cells = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < row.length; i++) {
        const char = row[i];

        if (char === '"') {
            if (inQuotes && row[i + 1] === '"') {
            current += '"';
            i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            cells.push(current);
            current = "";
        } else {
            current += char;
        }
    }

    cells.push(current);
    return cells;
}
