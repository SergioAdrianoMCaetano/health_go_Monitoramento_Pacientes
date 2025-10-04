import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    html {
        font-family: "Roboto", sans-serif;
    }
    
    body {
        font-family: "Roboto", sans-serif;
        background-color: #1f2a38;
        color: #e0e0e0;
        line-height: 1.6;
    }
    
    // Garantir que todos os elementos textuais usem Roboto
    h1, h2, h3, h4, h5, h6, p, span, div, a, li, button, input, textarea, select, label {
        font-family: "Roboto", sans-serif;
    }
    
    h1, h2, h3 {
        color: #007bff;
        font-weight: 600;
    }
`;