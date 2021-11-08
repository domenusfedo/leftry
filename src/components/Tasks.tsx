import React from 'react';

import {
    Holder,
    HeaderHolder,
    Header,
    Button,
    AddIcon
  } from './Tasks.elements'

interface IProps {
    show: boolean;
    showSet: React.Dispatch<React.SetStateAction<boolean>>
}

const Tasks: React.FC<IProps> = ({show, showSet}) => {

    return (
            <HeaderHolder>
                <Header>My tasks</Header>
                <Button onClick={(_e) => showSet(!show)}>
                    <AddIcon/>
                </Button>
            </HeaderHolder>
    );
};

export default Tasks;