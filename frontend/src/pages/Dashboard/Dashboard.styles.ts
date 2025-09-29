import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const DashboardWrapper = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: auto;
    font-family: Roboto, sans-serif;

    h1 {
        text-align: center;
        margin-bottom: 2rem;
        color: #007bff;
    }
`;

export const GridLayout = styled.div`
    display: grid;
    grid-template-areas:
        "chart"
        "table";
    gap: 2rem;

    .chart {
        grid-area: chart;
        background-color: #2c3e50;
        border-radius: 12px;
        padding: 1rem;
        animation: ${fadeIn} 0.6s ease;
        box-shadow: 0 0 10px rgba(0, 123, 255, 0.2);
    }

    .table {
        grid-area: table;
        background-color: #34495e;
        border-radius: 12px;
        padding: 1rem;
        animation: ${fadeIn} 0.6s ease;
        box-shadow: 0 0 10px rgba(0, 123, 255, 0.2);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        grid-template-areas:
        "chart"
        "table";
    }

    @media (min-width: 481px) and (max-width: 767px) {
        grid-template-columns: 1fr;
        grid-template-areas:
        "chart"
        "table";
    }

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "table chart";
    }

    @media (min-width: 1024px) {
        grid-template-columns: 2fr 2fr;
        grid-template-areas: "table chart";
    }
`;


export const PageTitle = styled.h1`
    text-align: center;
    margin-bottom: 2rem;
    color: "#007bff";
    font-size: 2rem;
    animation: ${fadeIn} 0.6s ease;

    @media (max-width: 480px) {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }

    @media (min-width: 481px) and (max-width: 767px) {
        font-size: 1.75rem;
    }

    @media (min-width: 768px) {
        font-size: 2rem;
    }
`;
