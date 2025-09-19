import styled from "styled-components";

export const FileListContainer = styled.div`
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;

    h2 {
        margin-bottom: 1rem;
        color: #007bff;
    }

    p {
        color: #333333;
    }

    ul {
        list-style: none;
        padding: 0;
    }
    `;

    export const FileItem = styled.li`
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
    color: #333333;
`;
