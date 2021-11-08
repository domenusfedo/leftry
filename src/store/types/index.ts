import { taskType } from '../action-types/index';

export interface Task {
    id: number;
    title: string;
    priority: string;
    finishUntil: Date //Date
}

export interface ExpiredTask {
    id: number;
    title: string;
    priority: string;
    finishUntil: Date,
    expired: boolean
}

export interface TaskStored {
    id: number;
    title: string;
    priority: string;
    finishUntil: number //Date
}

interface addTask {
    type: taskType.addTask,
    payload: Task
}

interface removeTask {
    type: taskType.removeTask,
    payload: Task
}

interface expireTask {
    type: taskType.expireTask,
    payload: Task
}

export type taskActions = addTask | removeTask | expireTask;