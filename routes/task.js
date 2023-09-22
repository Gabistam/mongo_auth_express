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
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des tâches.');
    }
});

// Route pour créer une nouvelle tâche
router.post('/api/tasks', isLoggedIn, async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).send('Erreur lors de la création d\'une nouvelle tâche.');
    }
});

// Route pour mettre à jour une tâche
router.put('/api/tasks/:id', isLoggedIn, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (err) {
        res.status(500).send('Erreur lors de la mise à jour de la tâche.');
    }
});

// Route pour supprimer une tâche
router.delete('/api/tasks/:id', isLoggedIn, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tâche supprimée avec succès.' });
    } catch (err) {
        res.status(500).send('Erreur lors de la suppression de la tâche.');
    }
});

module.exports = router;
