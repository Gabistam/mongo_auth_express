import React, { useState } from 'react';

function AddTask() {
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

            setTitle('');
            // Vous pouvez ajouter une logique pour rafraîchir la liste des tâches ici
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
            <button type="submit" className="btn btn-primary">Ajouter</button>
        </form>
    );
}

export default AddTask;
