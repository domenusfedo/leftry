import styled from "styled-components"
import { BiTime, BiArrowToRight, BiX } from 'react-icons/bi';
import { MdDoneAll } from 'react-icons/md';
import { css } from "styled-components";

export const HeaderDiv = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.main};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 2rem 2rem;
    font-size: 0.8rem;
    height: 5rem;
    position: fixed;
    box-shadow: 0px 0px 12px 10px rgba(27,27,27,0.25);
    z-index: 500;
`;

export const Desc = styled.div`
    width: 60%;
    margin-left: 1rem;
`

export const Profile = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Header = styled.h1`
    font-size: 2.5rem;
    font-weight: 900;
`;

export const Informations = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    flex-direction: column;
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 2rem;
`
export const Information = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
`
export const Holder = styled.div`
    margin-left: 1rem;
`


export const InformationTitle = styled.h2``
export const InformationAmount = styled.h4`
    color: gray;
`
const sharedStyle = css`
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.main};
`

export const TimeIcon = styled(BiTime)`
    ${sharedStyle}
`

export const DoneIcon = styled(BiArrowToRight)`
    ${sharedStyle}
`

export const ExpiredIcon = styled(BiX)`
    ${sharedStyle}
`

//tasks
export const Desc1 = styled.div`
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`;


export const TaskElement = styled.div`
    width: 90%;
    height: 7rem;
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

    &:last-child {
        margin-bottom: 0;
    }
`;

export const TaskProgress = styled.h3`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: transparent;
    color: darkgrey;
    left: 0;
    bottom: 0;
    font-weight: 600;
    z-index: 100;
    margin-bottom: 0.2rem;
`;

type Progress = {
    left: number
}

export const Timer = styled.div<Progress>`
    width: ${({ left }) => `${left}%`};
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.secondary};
    position: absolute;
    left: 0;
    bottom: 0;
    font-weight: 600;
    height: 0.2rem;
    transition: all 0.5s;
`;

export const TaskTitle = styled.h2`
    font-weight: 800;
    font-size: 1.7rem;
    margin-bottom: 0.2rem;
    color: ${({ theme }) => theme.colors.white};
`;

export const TaskPriority = styled.p`
    color: gray;
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.main};
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

//AvailableTasks
export const AvailableTasks = styled.div`
    width: 100%;
    //min-height: 423px; //only if TaskNow 
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`