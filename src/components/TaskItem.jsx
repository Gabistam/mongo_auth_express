import React, { useState } from 'react';
import ShowTask from './ShowTask';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenSquare } from '@fortawesome/free-solid-svg-icons';

function TaskItem({ task, onToggleStatus }) {
    const [showDetails, setShowDetails] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <div className="card mb-3">
            <div className="card-body" onClick={() => setShowDetails(true)}>
                <h5 className="card-title">{task.title}</h5>
                <p className={`card-text ${task.completed ? 'text-success' : 'text-warning'} font-weight-bold`}>
                    {task.completed ? "Terminé" : "En cours"}
                </p>
                <button className={`btn ${task.completed ? 'btn-warning' : 'btn-success'} mb-2 badge  rounded-pill`} onClick={() => onToggleStatus(task)}>
                    {task.completed ? "En cours" : "Terminé"}
                </button>

                <div className="task-actions">
                    <FontAwesomeIcon 
                        icon={faPenSquare}
                        size="2x"
                        className="mr-3" 
                        style={{color: "#eb7100", cursor: "pointer"}} 
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowEditModal(true); // Affiche le modal de modification
                        }} 
                    />
                    
                    <a href="#">
                        <FontAwesomeIcon 
                            icon={faTrashCan} 
                            size="2x" 
                            className="mx-3" 
                            style={{color: "#d30318", cursor: "pointer"}} 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowDeleteModal(true);
                            }}
                        />
                    </a>
                </div>
            </div>
            {showDetails && <ShowTask task={task} onClose={() => setShowDetails(false)} />}
            {showEditModal && <UpdateTask task={task} onClose={() => setShowEditModal(false)} />}
            {showDeleteModal && <DeleteTask task={task} onClose={() => setShowDeleteModal(false)} />}
        </div>
    );
}

export default TaskItem;
