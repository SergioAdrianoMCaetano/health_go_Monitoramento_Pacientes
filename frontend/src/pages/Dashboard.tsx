import { useState } from "react";
import UploadForm from "../components/UploadForm/UploadForm";
import PatientTable from "../components/PatientTable/PatientTable";
import VitalChart from "../components/VitalChart/VitalChart";
import { DashboardWrapper, GridLayout } from "./Dashboard.styles";

export default function Dashboard() {
    const [refresh, setRefresh] = useState(false);

    return (
        <DashboardWrapper>
        <h1>HealthGo Dashboard</h1>
        <UploadForm onUpload={() => setRefresh((r) => !r)} />
        <GridLayout>
            <PatientTable refresh={refresh} />
            <VitalChart refresh={refresh} />
        </GridLayout>
        </DashboardWrapper>
    );
}

