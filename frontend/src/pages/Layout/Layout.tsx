// src/pages/Layout/BaseLayout.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutContainer, Header, Nav, Main, Footer } from "./Layout.styles";

interface BaseLayoutProps {
    children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
    const location = useLocation();

    return (
        <LayoutContainer>
        <Header>
            <h1>🏥 HealthGo Monitor</h1>
            <Nav>
            {location.pathname !== "/" && (
                <Link to="/">⬅ Voltar para Upload</Link>
            )}
            </Nav>
        </Header>
        
        <Main>
            {children}
        </Main>

        <Footer>
            <p>Sistema de Monitoramento de Pacientes - HealthGo © 2024</p>
        </Footer>
        </LayoutContainer>
    );
}