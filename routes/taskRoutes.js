const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/auth');
const taskController = require('../controllers/taskController');

// Route pour servir la page React
router.get('/tasks', taskController.renderTasksPage);

// Route pour récupérer toutes les tâches
router.get('/api/tasks', isLoggedIn, taskController.getAllTasks);

// Route pour créer une nouvelle tâche
router.post('/api/tasks', isLoggedIn, taskController.createTask);

// Route pour mettre à jour une tâche
router.put('/api/tasks/:id', isLoggedIn, taskController.updateTask);

// Route pour supprimer une tâche
router.delete('/api/tasks/:id', isLoggedIn, taskController.deleteTask);

module.exports = router;
