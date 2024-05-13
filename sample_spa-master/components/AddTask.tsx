'use client';

import { TaskContext } from '@/context/TaskContext';
import React, {useContext, useState} from 'react';

const AddTask = ({}) => {

    const { tasks, addTask } = useContext(TaskContext);
    const [description, setDescription] = useState('');

    const saveTask = (e: {preventDefault: () => void}) => {
        e.preventDefault();
        console.log('Lista antes de incluir: ' + tasks);
        addTask(description);
        setDescription('');
    }

    return (
        <div className="text-center">
            <h3 className="mb-4 text-xl font-semibold text-gray-600">Adicionar Tarefa</h3>
            <form onSubmit={saveTask}>
                <input 
                    type="text" 
                    placeholder="Descreva a tarefa" 
                    className="border border-gray-500 px-4 py-2 rounded-xl focus:border-blue-600 focus:outline-none focus:border-2"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button 
                    type="submit"
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg mx-2 hover:bg-blue-600"
                >
                    Incluir
                </button>
            </form>
        </div>
    );
};

export default AddTask;