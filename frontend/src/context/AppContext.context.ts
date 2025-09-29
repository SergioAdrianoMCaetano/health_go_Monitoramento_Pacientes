import { createContext } from "react";
import type { PatientRecord } from "../types/patient";

export interface AppState {
    uploadedFiles: string[];
    selectedFile: string | null;
    patientData: PatientRecord[];
    isValidFile: boolean;
    loading: boolean;
}

export interface AppContextType {
    state: AppState;
    setUploadedFiles: (files: string[]) => void;
    setSelectedFile: (file: string | null) => void;
    setPatientData: (data: PatientRecord[]) => void;
    setValidFile: (isValid: boolean) => void;
    setLoading: (loading: boolean) => void;
    resetApp: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);