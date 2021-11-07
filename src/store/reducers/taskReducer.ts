import { title } from "process";
import { taskType } from "../action-types";
import { taskActions } from "../types";
import { Task } from '../types/index';

type State = {
    tasks: {
        id: number;
        title: string;
        priority: string;
        finishUntil: Date //Date
    }[],
    finished: {
        id: number;
        title: string;
        priority: string;
        finishUntil: Date
    }[],
    expired: {
        id: number;
        title: string;
        priority: string;
        finishUntil: Date
    }[]
}

const storeToLocalStorage = (updatedState: State) => {
    localStorage.setItem("state", JSON.stringify(updatedState))
}

const orderArrayOnAction = (array: State) => {
    return array.tasks.sort((a: Task, b: Task) => {
        return Math.abs(new Date(a.finishUntil).getTime()) - Math.abs(new Date(b.finishUntil).getTime());
    });
}

const initialState: State = {
    tasks: [],
    finished: [],
    expired: [],
};

const addTaskHanlder = (state: State, task: Task) => {
    let finishDate = task.finishUntil;
    let hoursAdded: number;

    const addHours = function (h: any) {
        finishDate.setHours(finishDate.getHours() + h);
        return finishDate;
    }

    if (task.priority === 'high') {
        hoursAdded = 2;
    } else if (task.priority === 'medium') {
        hoursAdded = 4;
    } else {
        hoursAdded = 8;
    }
    finishDate = addHours(hoursAdded);

    const updatedState = {
        ...state,
        tasks: [
            ...state.tasks,
            task
        ]
    }

    storeToLocalStorage(updatedState);

    return updatedState
}

const removeTaskHanlder = (state: State, obj: Task) => {
    console.log(obj)

    const updatedState = {
        ...state,
        finished: [
            ...state.finished,
            obj
        ],
        tasks: state.tasks.filter(t => t.id !== obj.id)
    }


    orderArrayOnAction(updatedState)

    storeToLocalStorage(updatedState);

    return updatedState;
}

const expireTaskHanlder = (state: State, obj: Task) => {
    const updatedState = {
        ...state,
        expired: [
            ...state.expired,
            obj
        ],
        tasks: state.tasks.filter(t => t.id !== obj.id)
    }

    return updatedState;
}

const defaultCase = (state: State) => {
    const storedState = localStorage.getItem("state");
    if (!storedState) {
        return state;
    }
    const parsedStoredState = JSON.parse(storedState);

    const savedStore = {
        expired: parsedStoredState.expired,
        finished: parsedStoredState.finished,
        tasks: parsedStoredState.tasks.map((notConvertedTask: Task) => {
            const object: Task = {
                ...notConvertedTask,
                finishUntil: new Date(notConvertedTask.finishUntil)
            }
            return object;
        })
    }

    orderArrayOnAction(savedStore)

    return savedStore;
}

const reducer = (state = initialState, action: taskActions): State => {
    switch (action.type) {
        case taskType.addTask:
            return addTaskHanlder(state, action.payload);
        case taskType.removeTask:
            return removeTaskHanlder(state, action.payload);
        case taskType.expireTask:
            return expireTaskHanlder(state, action.payload);
        default:
            return defaultCase(state)
    }
}

export default reducer;