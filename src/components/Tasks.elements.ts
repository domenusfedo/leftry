import styled from "styled-components"
import { MdDoneAll, MdAdd } from 'react-icons/md'

export const Header = styled.h1`
    color: ${({ theme }) => theme.colors.white};

    @media screen and (min-width: 960px) {
        margin-right: 2rem;
    }
`;

export const Desc = styled.div`
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`;


export const TaskElement = styled.div`
    width: 90%;
    margin-bottom: 2rem;
    background-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0px 0px 12px 10px rgba(27,27,27,0.25);
    border-radius: 10px;
    display: flex;
    padding: 0 1.5rem;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    position: relative;
`;

export const TaskProgress = styled.div`
    width: 100%;
    
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: ${({ theme }) => theme.colors.main};
    position: absolute;
    left: 0;
    bottom: 0;
`;

export const TaskTitle = styled.h2`
    font-weight: 800;
    font-size: 1.7rem;
    margin-bottom: 0.5rem;
`;

export const TaskPriority = styled.p`
    color: ${({ theme }) => theme.colors.main};
    font-size: 1rem;
    font-weight: 600;
`;

export const TaskButton = styled(MdDoneAll)`
    color: ${({ theme }) => theme.colors.main};
    opacity: 0.5;
    font-size: 2rem;
    transition: all 1s;

    &:hover {
        cursor: pointer;
        opacity: 1;
    }
`;

export const HeaderHolder = styled.div`
    /* padding: 0 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between; */

    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 2rem 2rem;
    font-size: 0.9rem;
    width: 100%;
    grid-area: b;

    @media screen and (min-width: 960px) {
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    @media screen and (max-width: 360px) {
        padding: 2rem 0.5rem;
    }
`;

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
    z-index: 0;
`;

export const AddIcon = styled(MdAdd)`
    color: gray;
    cursor: pointer;
    font-size: 3rem;
    transition: all 0.5s;

    &:hover {
        color: darkgrey;
    }
`