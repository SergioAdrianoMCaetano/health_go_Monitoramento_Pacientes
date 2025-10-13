// src/components/MapView/MapView.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useApp } from "../../hooks/useApp";
import { MapWrapper } from "./MapView.style";
import "leaflet/dist/leaflet.css";

// Definir o tipo correto para as posições
interface Location {
    position: [number, number]; // ← LatLngTuple explícito
    name: string;
}

export default function MapView() {
    const { state } = useApp();

    const unique = [...new Set(state.patientData.map(p => p.patient_name))].filter(Boolean);
    
    // Definir locations com tipo explícito
    const locations: Location[] = [
        { position: [-15.78, -47.93], name: "Hospital Central" },
        { position: [-15.79, -47.92], name: "Clínica Saúde" },
        { position: [-15.77, -47.94], name: "Posto Avançado" }
    ];

    return (
        <MapWrapper>
            <MapContainer 
                center={[-15.78, -47.93] as [number, number]} // ← Type assertion aqui também
                zoom={13} 
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer 
                    attribution='&copy; OpenStreetMap' 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                />
                
                {locations.map((location, index) => (
                    <Marker key={index} position={location.position}>
                        <Popup>
                            <strong>{location.name}</strong><br/>
                            Pacientes: {unique.length}<br/>
                            {unique.slice(0, 3).join(", ")}
                            {unique.length > 3 && ` e mais ${unique.length - 3}`}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            
            <div style={{
                marginTop: "10px",
                padding: "10px", 
                background: "#f8f9fa", 
                borderRadius: "5px", 
                fontSize: "0.9rem"
            }}>
                <strong>📍 Informações do Mapa:</strong><br/>
                • Pacientes únicos: {unique.length}<br/>
                • Total de registros: {state.patientData.length}
            </div>
        </MapWrapper>
    );
}

