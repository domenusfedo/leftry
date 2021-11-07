import styled from 'styled-components';
import { MdAdd } from 'react-icons/md'

type TaskFieldProps = {
    open: boolean
}

type Props = {
    focused: boolean
}

export const TasksField = styled.div<TaskFieldProps>`
    z-index: 2000;
    position: absolute;
    top: 0;
    left: 0;
    top: ${({ open }) => (open ? 0 : '-100vh')};
    opacity: ${({ open }) => (open ? 1 : 0)};
    background-color: ${({ theme }) => theme.colors.main};
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: all 0.5s;
`;

export const Input = styled.input`
    width: 90%;
    font-family: inherit;
    padding: 2rem 0;
    border: none;
    outline: none;
    background-color: transparent;
    text-align: center;
    color: inherit;
    font-weight: 800;
    font-size: 2.5rem;
    margin-bottom: 2rem;


    &::placeholder {
        color: inherit;
        font-weight: 800;
    }
`

export const Priority = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

export const PriorityElement = styled.div<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    padding: 1rem;
    font-weight: 800;
    font-size: 1.7rem;
    margin: 0 1rem;
    border: 6px solid ${({ theme }) => theme.colors.secondary};;
    background-color: ${({ theme, focused }) => (focused ? theme.colors.secondary : theme.colors.main)};
    color: ${({ theme, focused }) => (focused ? theme.colors.main : theme.colors.secondary)};
    transition: all 0.4s;
    cursor: pointer;
`

export const AddIcon = styled(MdAdd)`
    color: gray;
`

export const AddTask = styled.button`
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, -5%);
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 0;
    border-radius: 25px;
    width: 90%;
    color: ${({ theme }) => theme.colors.main};
    font-family: inherit;
    font-weight: bold;
    font-size: 1.5em;
    padding: 2rem 0;
    cursor: pointer;
`;

export const PrioExp = styled.h5`
    margin-top: 2rem;
    padding: 0 2rem;
`