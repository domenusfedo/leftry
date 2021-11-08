import React, {useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store';

import { Task } from '../store/types';

import {
    TasksField,
    Input,
    Priority,
    PriorityElement,
    AddTask,
    PrioExp,
    CloseIcon,
    ActionHolder,
    InputsHolder
} from './TaskField.components'

interface IState {
    task: Task;
}

interface IProps {
    visible: boolean,
    visibleSet: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskField: React.FC<IProps> = ({visible, visibleSet}) => {
    const titleInput = useRef<HTMLInputElement>(null);
    const [task, taskSet] = useState<IState["task"]>({
        id: 0,
        title: '',
        priority: 'medium',
        finishUntil: new Date()
    });

    const [active, activeSet] = useState({
        high: false,
        medium: true,
        low: false
    })

    const dispatch = useDispatch();
    const {
        addTaskAction
    } = bindActionCreators(actionCreators, dispatch)

    const submitHandler = () => {
       if(
        (task.title.trim().length <= 0 || task.title.trim().length >= 16)||
        task.priority.trim().length <= 0
       ) { 
           //Error modal logic
           titleInput.current!.placeholder = 'provide a title';
           setTimeout(() => {
                titleInput.current!.placeholder = 'add title...'
           }, 1000)
           return
       }
        const taskObj: Task = {
            id: Math.random(),
            title: task.title.charAt(0).toUpperCase() + task.title.slice(1),
            priority: task.priority.toString().toLowerCase(),
            finishUntil: new Date()
        }
        addTaskAction(taskObj);
        
        taskSet({
            id: 0,
            title: '',
            priority: 'medium',
            finishUntil: new Date()
        })
        activeSet({
            high: false,
            medium: true,
            low: false
        })
        visibleSet(!visible)
    }

    const changeHanlder = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if((e.target.value).trim().toString().length >= 16) {
            return
        }
        
        taskSet({
            ...task,
            [e.target.name]: e.target.value
        })
    }


    const clickHanlder = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string): void => {
        taskSet({
            ...task,
            [name]: e.currentTarget.id
        })
        const temporaryReset = {
            high: false,
            medium: false,
            low: false
        }

        activeSet({
            ...temporaryReset,
            [e.currentTarget.id]: true
        })
    }

    return (
             <TasksField open={visible ? true : false}>
                <InputsHolder>
                <Input ref={titleInput} name="title" placeholder="add title..." value={task.title} onChange={(event) => changeHanlder(event)}/>
                <Priority>
                    <PriorityElement focused={active.high} id="high" onClick={(e) => clickHanlder(e, "priority")}>p1</PriorityElement>
                    <PriorityElement focused={active.medium} id="medium" onClick={(e) => clickHanlder(e, "priority")}>p2</PriorityElement>
                    <PriorityElement focused={active.low} id="low" onClick={(e) => clickHanlder(e, "priority")}>p3</PriorityElement>
                </Priority>
                <PrioExp>
                    {active.high && "2"} {active.medium && "4"} {active.low && "8"} hours to complete
                </PrioExp>
                </InputsHolder>
                <ActionHolder>
                    <AddTask onClick={() => submitHandler()}>add task</AddTask>
                    <CloseIcon onClick={() => visibleSet(false)}></CloseIcon>
                </ActionHolder>
            </TasksField>
    );
};

export default TaskField;