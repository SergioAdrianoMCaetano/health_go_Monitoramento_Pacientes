import styled from 'styled-components';

export const HomeContainer = styled.div`
    max-width: 800px;
    width: 100%;
    background: white;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    margin: 2rem 0;
`;

export const WelcomeSection = styled.section`
    text-align: center;
    margin-bottom: 3rem;

    h2 {
        color: #2d3748;
        font-size: 2.5rem;
        margin-bottom: 1rem;
        font-weight: 700;
    }

    p {
        color: #718096;
        font-size: 1.2rem;
        line-height: 1.6;
    }
`;

export const UploadSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const ValidationMessage = styled.div<{ error?: boolean; success?: boolean }>`
    padding: 1rem;
    border-radius: 10px;
    font-weight: 600;
    text-align: center;
    
    ${props => props.error && `
        background: #fed7d7;
        color: #c53030;
        border: 2px solid #feb2b2;
    `}
    
    ${props => props.success && `
        background: #c6f6d5;
        color: #276749;
        border: 2px solid #9ae6b4;
    `}
    
    ${props => !props.error && !props.success && `
        background: #bee3f8;
        color: #2c5aa0;
        border: 2px solid #90cdf4;
    `}
`;