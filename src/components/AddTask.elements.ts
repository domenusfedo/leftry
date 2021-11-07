import styled from "styled-components";
import { MdAdd } from 'react-icons/md'

export const Button = styled.button`
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 25px;
    width: 25px;
    height: 25px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
    background-color: transparent;
    font-weight: 900;
    font-size: 2rem;
    border: none;
    z-index: 100;
`;

export const Button2 = styled.button`
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 25px;
    width: 90%;
    height: 25px;
    padding: 3rem 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.main};
    background-color: ${({ theme }) => theme.colors.secondary};
    font-weight: 900;
    font-size: 2rem;
    border: none;
    z-index: 100;
`;



export const AddIcon = styled(MdAdd)`
    color: gray;
`