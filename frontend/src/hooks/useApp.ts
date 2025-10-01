import { useContext } from "react";
import { AppContext } from "../context/AppContext.context";

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("O useApp deve ser usado dentro de um AppProvider");
    }
    return context;
}
