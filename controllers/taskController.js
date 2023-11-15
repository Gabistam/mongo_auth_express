const Task = require('../models/Task');

exports.renderTasksPage = (req, res) => {
    res.render('pages/tasks.twig');
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.json(tasks);
    } catch (err) {
        console.error("Erreur lors de la récupération des tâches:", err);
        res.status(500).send('Erreur lors de la récupération des tâches.');
    }
};

exports.createTask = async (req, res) => {
    try {
        const taskData = {
            ...req.body,
            userId: req.user._id
        };
        const task = new Task(taskData);
        await task.save();
        res.json(task);
    } catch (err) {
        console.error("Corps de la requête:", req.body);
        console.error("Erreur détaillée:", err);
        res.status(500).send('Erreur lors de la création d\'une nouvelle tâche.');
    }
};

exports.updateTask = async (req, res) => {
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
};

exports.deleteTask = async (req, res) => {
    try {
        const result = await Task.deleteOne({ _id: req.params.id, userId: req.user._id });
        if (result.deletedCount === 0) {
            return res.status(403).send('Vous n\'êtes pas autorisé à supprimer cette tâche ou la tâche n\'existe pas.');
        }
        res.json({ message: 'Tâche supprimée avec succès.' });
    } catch (err) {
        res.status(500).send('Erreur lors de la suppression de la tâche.');
        console.log("Erreur lors de la suppression de la tâche:", err);
    }
};

