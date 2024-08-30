const db = require('../db'); // Supabase client
const Mentee = require('../models/mentee');

// Create a new mentee
async function createMentee(req, res) {
    try {
        const menteeData = new Mentee(req.body);
        const mentee = await menteeData.save();
        res.status(201).json(mentee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an existing mentee
async function updateMentee(req, res) {
    try {
        const { id } = req.params;
        const menteeData = new Mentee(req.body);
        const updatedMentee = await menteeData.update(id);
        res.status(200).json(updatedMentee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a mentee by ID
async function getMenteeById(req, res) {
    try {
        const { id } = req.params;
        const mentee = await Mentee.getById(id);
        res.status(200).json(mentee);
    } catch (error) {
        res.status(404).json({ error: 'Mentee not found' });
    }
}

module.exports = {
    createMentee,
    updateMentee,
    getMenteeById
};
