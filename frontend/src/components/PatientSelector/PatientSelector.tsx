import { useEffect, useState, useRef } from "react";
import {
    SelectorContainer,
    Label,
    Input,
    SuggestionsList,
    SuggestionItem,
} from "./PatientSelector.styles";

interface PatientSelectorProps {
    pacientes: string[];
    selected: string;
    onSelect: (nome: string) => void;
}

export default function PatientSelector({
    pacientes,
    selected,
    onSelect,
}: PatientSelectorProps) {
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    const suggestions = pacientes
        .filter((nome) => nome.toLowerCase().includes(query.toLowerCase()))
        .filter(Boolean)
        .slice(0, 10);

    const handleSelect = (nome: string) => {
        setQuery(nome);
        onSelect(nome);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return() => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setQuery(selected);
    }, [selected]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
            Math.min(prev + 1, suggestions.length - 1)
        );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex === -1) {
                handleSelect(query);
            } else {
                handleSelect(suggestions[highlightedIndex]);
            }
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
            setHighlightedIndex(-1);
        }
    };

    return (
        <SelectorContainer ref={containerRef}>
        <Label>Selecionar paciente:</Label>
        <Input
            type="text"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
                setHighlightedIndex(-1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Digite o nome do paciente..."
        />
        {showSuggestions && (
            <SuggestionsList>
                <SuggestionItem
                    onClick={() => handleSelect("")}
                    highlighted={highlightedIndex === -1}
                >
                    Todos os pacientes
                </SuggestionItem>
                    {suggestions.map((nome, index) => (
                        <SuggestionItem
                            key={`${nome}-${index}`}
                            onClick={() => handleSelect(nome)}
                            highlighted={highlightedIndex === index}
                        >
                        {nome}
                </SuggestionItem>
                ))}
            </SuggestionsList>
        )}
        </SelectorContainer>
    );
}

