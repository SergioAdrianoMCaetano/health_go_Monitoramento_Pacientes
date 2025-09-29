import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from { 
        opacity: 0; 
        transform: translateY(20px); 
    }
    to { 
        opacity: 1; 
        transform: translateY(0); 
    }
`;

const pulse = keyframes`
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
`;

export const FileListContainer = styled.div`
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;
    min-width: 280px;
    max-width: 320px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
    animation: ${fadeIn} 0.5s ease;
    
    @media (max-width: 768px) {
        max-width: 100%;
        margin-bottom: 1rem;
    }
`;

export const FileListHeader = styled.h4`
    margin: 0 0 1.25rem 0;
    color: #2d3748;
    font-size: 1.2rem;
    font-weight: 700;
    text-align: center;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #e2e8f0;
`;

export const FileItem = styled.div`
    margin-bottom: 0.5rem;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const FileButton = styled.button<{ active?: boolean }>`
    width: 100%;
    padding: 0.875rem 1rem;
    border: none;
    border-radius: 10px;
    background: ${props => props.active ? 
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
        '#ffffff'
    };
    color: ${props => props.active ? 'white' : '#4a5568'};
    cursor: pointer;
    text-align: left;
    transition: all 0.3s ease;
    border: 2px solid ${props => props.active ? '#667eea' : '#e2e8f0'};
    font-size: 0.95rem;
    font-weight: ${props => props.active ? '600' : '500'};
    box-shadow: ${props => props.active ? 
        '0 4px 15px rgba(102, 126, 234, 0.3)' : 
        '0 2px 8px rgba(0, 0, 0, 0.05)'
    };

    &:hover {
        background: ${props => props.active ? 
            'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)' : 
            '#f7fafc'
        };
        transform: translateY(-2px);
        box-shadow: ${props => props.active ? 
            '0 6px 20px rgba(102, 126, 234, 0.4)' : 
            '0 4px 15px rgba(0, 0, 0, 0.1)'
        };
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

export const LoadingMessage = styled.div`
    text-align: center;
    padding: 2rem 1rem;
    color: #718096;
    font-size: 1rem;
    
    &::before {
        content: "⏳";
        display: block;
        font-size: 2rem;
        margin-bottom: 0.5rem;
        animation: ${pulse} 1.5s infinite;
    }
`;

export const EmptyMessage = styled.div<{ error?: boolean }>`
    text-align: center;
    padding: 1.5rem 1rem;
    color: ${props => props.error ? '#e53e3e' : '#718096'};
    font-size: 0.95rem;
    line-height: 1.5;
    background: ${props => props.error ? '#fed7d7' : '#f7fafc'};
    border-radius: 8px;
    border: 1px solid ${props => props.error ? '#feb2b2' : '#e2e8f0'};

    &::before {
        content: "${props => props.error ? '❌' : '📝'}";
        display: block;
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }

    small {
        display: block;
        margin-top: 0.5rem;
        font-size: 0.85rem;
        opacity: 0.8;
    }
`;

// Estilos responsivos
export const ResponsiveContainer = styled.div`
    @media (max-width: 480px) {
        ${FileListContainer} {
            padding: 1rem;
            min-width: auto;
        }
        
        ${FileButton} {
            padding: 0.75rem;
            font-size: 0.9rem;
        }
        
        ${FileListHeader} {
            font-size: 1.1rem;
            margin-bottom: 1rem;
        }
    }

    @media (min-width: 481px) and (max-width: 767px) {
        ${FileListContainer} {
            padding: 1.25rem;
        }
        
        ${FileButton} {
            padding: 0.8rem;
        }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
        ${FileListContainer} {
            max-width: 280px;
        }
    }

    @media (min-width: 1024px) {
        ${FileListContainer} {
            max-width: 300px;
        }
        
        ${FileButton} {
            font-size: 1rem;
            padding: 1rem;
        }
    }
`;