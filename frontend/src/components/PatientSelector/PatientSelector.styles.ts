import styled from "styled-components";

interface SuggestionItemProps {
    highlighted?: boolean;
}

export const SelectorContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 400px;
    margin-bottom: 1rem;
`;

export const Label = styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 6px;
    color: #fff;
`;

export const Input = styled.input`
    width: 100%;
    padding: 8px 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;

    @media (max-width: 480px) {
        font-size: 0.9rem;
        padding: 6px 10px;
    }

    @media (min-width: 481px) and (max-width: 767px) {
        font-size: 0.95rem;
        padding: 7px 11px;
    }
`;


export const SuggestionsList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0,
    right: 0;
    background: white;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
    list-style: none;
    margin: 0;
    padding: 0;
`;


export const SuggestionItem = styled.li<SuggestionItemProps>`
    padding: 8px 12px;
    cursor: pointer;
    background-color: ${({ highlighted }) =>
        highlighted ? "#e0e0e0" : "transparent"};
    &:hover {
        background-color: #f0f0f0;
    }
`;
