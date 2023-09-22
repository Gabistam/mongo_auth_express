import React from 'react';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';

function ShowTask({ task, onClose }) {
    return (
        <div className="modal show-task-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">{task.title}</h2>
                        <button type="button" className="close" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Status: {task.completed ? "Terminé" : "En cours"}</p>
                        <UpdateTask task={task} />
                        <DeleteTask task={task} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowTask;
