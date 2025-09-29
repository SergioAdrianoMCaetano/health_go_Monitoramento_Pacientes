import styled from "styled-components";

export const FormContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
`;

export const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

export const HiddenInput = styled.input`
    display: none;
`;

export const FileName = styled.p`
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: #ccc;
    width: 100%;
    text-align: right;
`;
