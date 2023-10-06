const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/auth');

// Route pour servir la page React
router.get('/tasks', (req, res) => {
    res.render('pages/tasks.twig');
});

// Route pour récupérer toutes les tâches
router.get('/api/tasks', isLoggedIn, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });  // Filtrer les tâches par userId
        res.json(tasks);
    } catch (err) {
        console.error("Erreur lors de la récupération des tâches:", err);
        res.status(500).send('Erreur lors de la récupération des tâches.');
    }
});


// Route pour créer une nouvelle tâche
router.post('/api/tasks', isLoggedIn, async (req, res) => {
    try {
        const taskData = {
            ...req.body,
            userId: req.user._id  // Utilisez l'ID de l'utilisateur connecté
        };
        const task = new Task(taskData);
        await task.save();
        res.json(task);
    } catch (err) {
        console.error("Corps de la requête:", req.body);
        console.error("Erreur détaillée:", err);
        res.status(500).send('Erreur lors de la création d\'une nouvelle tâche.');
    }
});


// Route pour mettre à jour une tâche
router.put('/api/tasks/:id', isLoggedIn, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(403).send('Vous n\'êtes pas autorisé à modifier cette tâche.');
        }
        Object.assign(task, req.body);
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).send('Erreur lors de la mise à jour de la tâche.');
    }
});

// Route pour supprimer une tâche
router.delete('/api/tasks/:id', isLoggedIn, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(403).send('Vous n\'êtes pas autorisé à supprimer cette tâche.');
        }
        await task.remove();
        res.json({ message: 'Tâche supprimée avec succès.' });
    } catch (err) {
        res.status(500).send('Erreur lors de la suppression de la tâche.');
    }
});

module.exports = router;
