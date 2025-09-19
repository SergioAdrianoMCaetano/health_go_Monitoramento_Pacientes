import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapWrapper } from "./MapView.style";
import "leaflet/dist/leaflet.css";

export default function MapView() {
    return (
        <MapWrapper>
        <MapContainer center={[-15.78, -47.93]} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[-15.78, -47.93]}>
            <Popup>Paciente João Silva</Popup>
            </Marker>
        </MapContainer>
        </MapWrapper>
    );
}
