import styled from "styled-components";

export const LayoutContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: "Roboto", sans-serif;
`;

export const Header = styled.header`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem 2rem;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        margin: 0;
        color: #2d3748;
        font-size: 1.8rem;
        font-weight: 700;
    }
`;

export const Nav = styled.nav`
    a {
        color: #667eea;
        text-decoration: none;
        font-weight: 600;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
        }
    }
`;

export const Main = styled.main`
    flex: 1;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

export const Footer = styled.footer`
    background: rgba(0, 0, 0, 0.1);
    color: white;
    text-align: center;
    padding: 1rem;
    font-size: 0.9rem;
`;