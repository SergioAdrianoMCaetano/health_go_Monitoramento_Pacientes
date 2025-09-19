import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;

    th, td {
        padding: 0.8rem;
        border: 1px solid #ccc;
        text-align: left;
    }

    th {
        background-color: #f0f0f0;
    }
    `;

    export const Row = styled.tr<{ alert: boolean }>`
    background-color: ${({ alert }) => (alert ? "#ffe5e5" : "#fff")};
`;
