import styled, { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Sen:wght@400;700;800&display=swap');
html {
        font-family: 'sen', sans-serif;
        height: 100%;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
`;

export const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};

    @media screen and (min-width: 960px) {

    }
`