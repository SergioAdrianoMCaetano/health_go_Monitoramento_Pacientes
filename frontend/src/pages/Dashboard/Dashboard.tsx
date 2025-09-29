import { useState } from "react";
import UploadForm from "../../components/UploadForm/UploadForm";
import PatientTable from "../../components/PatientTable/PatientTable";
import VitalChart from "../../components/VitalChart/VitalChart";
import MapView from "../../components/MapView/MapView";
import FileList from "../../components/FileList/FileList";
import { DashboardWrapper, GridLayout, PageTitle } from "./Dashboard.styles";

export default function Dashboard() {
    const [refresh, setRefresh] = useState(false);

    return (
        <DashboardWrapper>
            <PageTitle>HealthGo Dashboard</PageTitle>
            <UploadForm onUpload={() => setRefresh((r) => !r)} />
            <FileList />
            <GridLayout>
                <div className="chart">
                    <VitalChart refresh={refresh} />
                    <MapView />
                </div>
                <div className="table">
                    <PatientTable refresh={refresh} />
                </div>
            </GridLayout>
        </DashboardWrapper>
    );
}