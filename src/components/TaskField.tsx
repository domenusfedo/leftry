import React, {useState} from 'react';
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
    PrioExp
} from './TaskField.components'

interface IState {
    task: Task;
}

interface IProps {
    visible: boolean,
    visibleSet: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskField: React.FC<IProps> = ({visible, visibleSet}) => {
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
        task.title.trim().length <= 0 ||
        task.priority.trim().length <= 0
       ) { 
        console.log('error')
           //Error modal logic
           visibleSet(!visible)
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
                <Input name="title" placeholder="add title..." value={task.title} onChange={(event) => changeHanlder(event)}/>
                <Priority>
                    <PriorityElement focused={active.high} id="high" onClick={(e) => clickHanlder(e, "priority")}>p1</PriorityElement>
                    <PriorityElement focused={active.medium} id="medium" onClick={(e) => clickHanlder(e, "priority")}>p2</PriorityElement>
                    <PriorityElement focused={active.low} id="low" onClick={(e) => clickHanlder(e, "priority")}>p3</PriorityElement>
                </Priority>
                <PrioExp>
                    You will have {active.high && "2"} {active.medium && "4"} {active.low && "8"} hours 
                </PrioExp>
                <AddTask onClick={() => submitHandler()}>add task</AddTask>
            </TasksField>
    );
};

export default TaskField;