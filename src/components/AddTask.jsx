import React, { useState } from 'react';

function AddTask({ onTaskAdded }) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la tâche');
            }

            const newTask = await response.json();
            onTaskAdded(newTask);  // Appeler la fonction de rappel

            setTitle('');
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="taskTitle" className="form-label">Titre de la tâche</label>
                <input type="text" className="form-control" id="taskTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary mb-5">Ajouter</button>
        </form>
    );
}

export default AddTask;
