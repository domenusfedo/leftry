import { taskType } from "../action-types";
import { taskActions } from "../types";
import { Task, ExpiredTask } from '../types/index';

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

// const testObj = {
//     finishUntil: new Date('November 9, 2021 11:55:00'),
//     id: 12113,
//     priority: 'high',
//     title: 'Test Expired'
// }

const initialState: State = {
    tasks: [],
    finished: [],
    expired: [],
};

const addTaskHanlder = (state: State, task: Task) => {
    let finishDate = task.finishUntil;
    let hoursAdded = 4;

    const addHours = function (h: any) {
        finishDate.setHours(finishDate.getHours() + h);
        return finishDate;
    }

    if (task.priority === 'high') {
        hoursAdded = 2;
    } else if (task.priority === 'low') {
        hoursAdded = 8;
    }
    finishDate = addHours(hoursAdded);


    console.log(task)
    const updatedState = {
        ...state,
        tasks: [
            ...state.tasks,
            task
        ]
    }
    orderArrayOnAction(updatedState)
    storeToLocalStorage(updatedState);

    return updatedState
}

const removeTaskHanlder = (state: State, obj: Task) => {
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
        tasks: parsedStoredState.tasks.map((notConvertedTask: Task): Task => {
            let object: Task | ExpiredTask = {
                ...notConvertedTask,
                finishUntil: new Date(notConvertedTask.finishUntil)
            }
            return object;
        })
    }

    orderArrayOnAction(savedStore);

    // const noExpireTasks = {
    //     expired: [
    //         ...savedStore.expired,
    //         savedStore.tasks.filter((value: ExpiredTask) => value.expired)
    //     ],
    //     finished: savedStore.finished,
    //     tasks: savedStore.tasks.filter((value: ExpiredTask) => !value.expired)
    // }

    // console.log(savedStore.tasks.filter((value: ExpiredTask) => value.expired))
    //console.log(testObj.finishUntil.getMilliseconds())

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