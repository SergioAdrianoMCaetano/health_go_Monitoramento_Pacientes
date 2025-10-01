import type { PatientRecord } from "../types/patient";

export interface AppState {
    uploadedFiles: string[];
    selectedFile: string | null;
    patientData: PatientRecord[];
    isValidFile: boolean;
    loading: boolean;
    error: string | null;
}

export interface AppContextType {
    state: AppState;
    setUploadedFiles: (files: string[]) => void;
    setSelectedFile: (file: string | null) => void;
    setPatientData: (data: PatientRecord[]) => void;
    setValidFile: (isValid: boolean) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    resetApp: () => void;
}

export const initialState: AppState = {
    uploadedFiles: [],
    selectedFile: null,
    patientData: [],
    isValidFile: false,
    loading: false,
    error: null,
};