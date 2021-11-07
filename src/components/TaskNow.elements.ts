import styled from "styled-components";

export const TaskNowHolder = styled.button`
    width: 90%;
    background-color: ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.secondary};
    padding: 2rem 0;
    border: 0;
    border-radius: 25px;
    font-weight: 900;
    font-family: inherit;
    font-size: 1.5rem;
`