import React, { useState } from 'react';

function UpdateTask({ task, onClose, onUpdate }) {
    const [title, setTitle] = useState(task.title);

    const handleUpdate = async () => {
        console.log("Tentative de mise à jour...");
        try {
            const response = await fetch(`/api/tasks/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de la tâche');
            }

            const updatedTask = await response.json();
            onUpdate(updatedTask); // Mettre à jour la liste des tâches dans TaskList
            onClose(); // Fermer le modal
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la tâche:", error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                className="form-control mb-3" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Titre de la tâche"
            />
            <button className="btn btn-primary m-2" onClick={handleUpdate}>Mettre à jour</button>
            <button className="btn btn-secondary m-2" onClick={onClose}>Annuler</button>
        </div>
    );
}

export default UpdateTask;
