import { Task, taskActions } from "../types"
import { taskType } from "../action-types"
import { Dispatch } from 'redux';


export const addTaskAction = (task: Task) => {
    return (dispatch: Dispatch<taskActions>) => {
        dispatch({
            type: taskType.addTask,
            payload: task
        })
    }
}

export const removeTaskAction = (id: number, title: string, priority: string, finisUntil: Date) => {
    return (dispatch: Dispatch<taskActions>) => {
        dispatch({
            type: taskType.removeTask,
            payload: {
                id: id,
                title: title,
                priority: priority,
                finishUntil: finisUntil
            }
        })
    }
}

export const expireTaskAction = (task: Task) => {
    return (dispatch: Dispatch<taskActions>) => {
        dispatch({
            type: taskType.expireTask,
            payload: task
        })
    }
}