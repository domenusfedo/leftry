import React from 'react';

import {
    Button,
    AddIcon
} from './AddTask.elements'

interface IProps {
    show: boolean;
    showSet: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTask: React.FC<IProps> = ({show, showSet}) => {
    return (
        <>
            <Button onClick={(_e) => showSet(!show)}>
                <AddIcon/>
            </Button>
        </>
    );
};

export default AddTask;