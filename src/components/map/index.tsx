import { generateProvinceData, inverseMapping } from "../../services/map_service"
import provincesRaw from "../../assets/provinces.geojson?raw"
import { type GeoJSONOptions } from "leaflet"
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
import L from "leaflet"
import styles from "./styles.module.css"

const provinces = JSON.parse(provincesRaw);

const getColor = (v: number) => {
    return v > 400 ? "#fb00abff" :
        v > 200 ? "#ff0000ff" :
        v > 100 ? "#ff640aff" :
        v > 60  ? "#fff700ff" :
                "#1aff00ff";
};

export function Map() {
    const provinceData = generateProvinceData();
    
    const style: GeoJSONOptions["style"] = (feature: any) => {
        const code = feature.properties.nuts3;
        const val = provinceData[code] ?? 0;
        return {
            fillColor: getColor(val),
            weight: 1,
            color: "#333",
            fillOpacity: 0.7
        };
    };

    const onEachProvince: GeoJSONOptions["onEachFeature"] = (feature, layer) => {
        const code = feature.properties.nuts3;

        layer.bindPopup(`
            <b>${inverseMapping(code)}</b><br>
            Престъпления: ${provinceData[code] ?? "N/A"}<br>
        `);

        layer.on({
            mouseover: (e) => {
                e.target.setStyle({
                    weight: 3,
                    color: "#000"
                });
            },
            mouseout: (e) => {
                e.target.setStyle({
                    weight: 1,
                    color: "#333"
                });
            }
        });
    };

    const bgBounds = L.geoJSON(provinces).getBounds();

    return (
        <>
            <div className={styles.mapLegend}>
                    <div className={styles.legendCard}>
                        <div style={{backgroundColor: '#1aff00ff', width: 50, height: 10}}></div>
                        <span>{'[0,60)'}</span>
                    </div>
                    <div className={styles.legendCard}>
                        <div style={{backgroundColor: '#fff700ff', width: 50, height: 10}}></div>
                        <span>{'[60, 100)'}</span>
                    </div>
                    <div className={styles.legendCard}>
                        <div style={{backgroundColor: '#ffb20aff', width: 50, height: 10}}></div>
                        <span>{'[100, 200)'}</span>
                    </div>
                    <div className={styles.legendCard}>
                        <div style={{backgroundColor: '#ff0000ff', width: 50, height: 10}}></div>
                        <span>{'[200, 400)'}</span>
                    </div>
                    <div className={styles.legendCard}>
                        <div style={{backgroundColor: '#fb00abff', width: 50, height: 10}}></div>
                        <span>{'[400, -)'}</span>
                    </div>
            </div>
            <div className={styles.mapWrapper}>
                <MapContainer
                    bounds={bgBounds}
                    boundsOptions={{ padding: [10, 10] }}
                    zoom={8}
                    minZoom={8}
                    maxZoom={8}
                    style={{ height: "100%", width: "100%" }}
                    >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

                    {provinces && (
                    <GeoJSON
                        data={provinces}
                        style={style}
                        onEachFeature={onEachProvince}
                    />
                    )}
                </MapContainer>
            </div>
        </>
    )
}