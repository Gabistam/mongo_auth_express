// DeleteTask.jsx
import React from 'react';

function DeleteTask({ task, onClose }) {
    const handleDelete = async () => {
        console.log("Tentative de suppression...");
        try {
            const response = await fetch(`/api/tasks/${task._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de la tâche');
            }

            // Si la suppression a réussi, fermez le modal et rafraîchissez la liste des tâches ou mettez à jour l'état
            onClose();
        } catch (error) {
            console.error("Erreur lors de la suppression de la tâche:", error);
        }
    };
    return (
        <div>
            <p>Êtes-vous sûr de vouloir supprimer cette tâche?</p>
            <button className="btn btn-danger m-2" onClick={handleDelete}>Supprimer</button>
            <button className="btn btn-secondary m-2" onClick={onClose}>Annuler</button>
        </div>
    );
    
    
}

export default DeleteTask;
