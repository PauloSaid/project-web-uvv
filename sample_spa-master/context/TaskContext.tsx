"use client";

import React, {createContext, useState} from 'react';

export enum Stage{
    Backlog,
    ToDo,
    Doing,
    Done
}

export type Task = {
    description: string;
    stage: Stage
}

type TaskContextType = {
    tasks: Task[];
    addTask: (description:string) => void;
    removeTask: (taskIndex:number) => void;
    changeStage: (taskIndex:number, new_stage:Stage) => void;
}

export const TaskContext = createContext({} as TaskContextType);

export const TaskContextProvider = ({ children } : {children: React.ReactNode;}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (description: string) => {
        let newTask = {
            description,
            stage: Stage.Backlog
        }
        setTasks([...tasks, newTask]);
    };

    const removeTask = (taskIndex:number) => {
        setTasks(tasks.filter((_:Task, index: number) => taskIndex !== index));
    };

    const changeStage = (taskIndex:number, new_stage:Stage) => {
        tasks[taskIndex].stage = new_stage;
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask, changeStage }}>
            {children}
        </TaskContext.Provider>
    );
}