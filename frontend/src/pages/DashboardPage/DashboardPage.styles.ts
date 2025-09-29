import styled from 'styled-components';

export const DashboardContainer = styled.div`
    width: 100%;
    max-width: 1400px;
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

export const DashboardHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e2e8f0;

    h2 {
        color: #2d3748;
        font-size: 2rem;
        margin: 0;
        font-weight: 700;
    }
`;

export const FileInfo = styled.div`
    background: #f7fafc;
    padding: 1rem;
    border-radius: 10px;
    border-left: 4px solid #667eea;

    strong {
        color: #2d3748;
    }
`;

export const DashboardGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

export const ChartSection = styled.section`
    grid-column: 1 / -1;
`;

export const TableSection = styled.section`
    min-height: 400px;
`;

export const MapSection = styled.section`
    min-height: 300px;
`;

export const LoadingMessage = styled.div`
    text-align: center;
    padding: 4rem;
    color: #4a5568;

    h3 {
        margin-bottom: 1rem;
    }
`;

export const ErrorMessage = styled.div`
    text-align: center;
    padding: 3rem;
    background: #fed7d7;
    border-radius: 10px;
    color: #c53030;

    button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: #c53030;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
        background: #b91c1c;
        }
    }
`;