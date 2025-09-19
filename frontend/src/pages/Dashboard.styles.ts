import styled from "styled-components";

export const DashboardWrapper = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: auto;
    font-family: Arial, sans-serif;

    h1 {
        text-align: center;
        margin-bottom: 2rem;
        color: #007bff;
    }
`;

export const GridLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1024px) {
        grid-template-columns: 2fr 2fr;
    }
`;
