import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import ShowTask from './ShowTask';
import AddTask from './AddTask';
import DeleteTask from './DeleteTask';
import UpdateTask from './UpdateTask';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await fetch('/api/tasks');
                
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des tâches');
                }

                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des tâches:", error);
            }
        }

        fetchTasks();
    }, []);

    const handleNewTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const handleToggleStatus = async (taskToUpdate) => {
        try {
            const response = await fetch(`/api/tasks/${taskToUpdate._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...taskToUpdate,
                    completed: !taskToUpdate.completed,
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du statut de la tâche');
            }

            const updatedTask = await response.json();
            console.log("Mise à jour de la tâche:", updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === updatedTask._id ? updatedTask : task
                )
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut de la tâche:", error);
        }
    };

    const handleDeleteTask = (deletedTaskId) => {
        console.log("Suppression de la tâche avec l'ID:", deletedTaskId);
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deletedTaskId));
    };

    const handleUpdateTask = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );
    };

    return (
        <div className="task-list">
            <h1>Ma liste de tâches</h1>
            <AddTask onTaskAdded={handleNewTask} />
            {selectedTask ? (
                <div>
                    <ShowTask task={selectedTask} />
                    <DeleteTask task={selectedTask} onClose={() => setSelectedTask(null)} onDelete={handleDeleteTask} />
                    <UpdateTask task={selectedTask} onClose={() => setSelectedTask(null)} onUpdate={handleUpdateTask} />
                </div>
            ) : (
                tasks.map(task => (
                    <TaskItem key={task._id} task={task} onClick={() => handleTaskClick(task)} onToggleStatus={handleToggleStatus} />
                ))
            )}
        </div>
    );
}

export default TaskList;
