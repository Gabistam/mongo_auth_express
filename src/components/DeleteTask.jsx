import React from 'react';

function DeleteTask({ task, onClose, onDelete }) {
    const handleDelete = async () => {
        console.log("Tentative de suppression...");
        try {
            const response = await fetch(`/api/tasks/${task._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de la tâche');
            }

            onDelete(task._id); // Mettre à jour la liste des tâches dans TaskList
            onClose(); // Fermer le modal
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
