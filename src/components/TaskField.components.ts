import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { BiX } from 'react-icons/bi';

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
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    transition: all 0.5s;
    padding: 3rem 0;
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
    font-size: 2rem;
    margin-bottom: 2rem;
    width: 90%;


    &::placeholder {
        color: inherit;
        opacity: 1;
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

export const PrioExp = styled.h5`
    margin-top: 2rem;
    padding: 0 2rem;
`

export const AddTask = styled.button`
    width: 80%;
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 0;
    border-radius: 25px;
    color: ${({ theme }) => theme.colors.main};
    font-family: inherit;
    font-weight: bold;
    font-size: 1.5em;
    padding: 2rem 0;
    cursor: pointer;
    margin-bottom: 1rem;
`;

export const CloseIcon = styled(BiX)`
    font-size: 3rem;
`
export const ActionHolder = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    /* position: absolute;
    bottom: 0;
    left: 0; */
`

export const InputsHolder = styled.div`
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;