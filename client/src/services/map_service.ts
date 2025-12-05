import { parseProvincesCSV } from "./csv_parser";

const provinceToNUTS3: Record<string, string> = {
    "Благоевград": "BLG",
    "Бургас": "BGS",
    "Варна": "VAR",
    "Велико Търново": "VTR",
    "Видин": "VID",
    "Враца": "VRC",
    "Габрово": "GAB",
    "Добрич": "DOB",
    "Кърджали": "KRZ",
    "Кюстендил": "KNL",
    "Ловеч": "LOV",
    "Монтана": "MON",
    "Пазарджик": "PAZ",
    "Перник": "PER",
    "Плевен": "PVN",
    "Пловдив": "PDV",
    "Разград": "RAZ",
    "Русе": "RSE",
    "Силистра": "SLS",
    "Сливен": "SLV",
    "Смолян": "SML",
    "Град София": "SOF",
    "Софийска": "SFO",
    "Стара Загора": "SZR",
    "Търговище": "TGV",
    "Хасково": "HKV",
    "Шумен": "SHU",
    "Ямбол": "JAM"
};


export function inverseMapping(nut3: string) {
    for(const [k,v] of Object.entries(provinceToNUTS3)) {
        if (v == nut3) {
            return k
        }
    }

    return "";
} 

export function generateProvinceData() {
    const provinces = parseProvincesCSV()

    const result: Record<string, number> = {};

    for(const p of provinces) {
        result[provinceToNUTS3[p.name]] = p.totalCrimes
    }

    return result
}