import React, { useState } from "react";
import type { PatientRecord } from "../types/patient";
import type { AppContextType, AppState } from "./AppContext.types";
import { initialState } from "./AppContext.types";
import { AppContext } from "./AppContext.context";

// Provider
export function AppProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AppState>(initialState);

    const setUploadedFiles = (files: string[]) => {
        setState(prev => ({ ...prev, uploadedFiles: files }));
    };

    const setSelectedFile = (file: string | null) => {
        setState(prev => ({ ...prev, selectedFile: file }));
    };

    const setPatientData = (data: PatientRecord[]) => {
        setState(prev => ({ ...prev, patientData: data }));
    };

    const setValidFile = (isValid: boolean) => {
        setState(prev => ({ ...prev, isValidFile: isValid }));
    };

    const setLoading = (loading: boolean) => {
        setState(prev => ({ ...prev, loading }));
    };

    const resetApp = () => {
        setState(initialState);
    };

    const contextValue: AppContextType = {
        state,
        setUploadedFiles,
        setSelectedFile,
        setPatientData,
        setValidFile,
        setLoading,
        resetApp,  
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}