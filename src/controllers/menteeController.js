const db = require('../db'); // Supabase client
const Mentee = require('../models/mentee');

// Create a new mentee
async function createMentee(req, res) {
    try {
        console.log(req.body)
        const menteeData = new Mentee(req.body);
        const mentee = await menteeData.save();
        res.status(201).json(mentee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// // Update an existing mentee
// async function updateMentee(req, res) {
//     try {
//         const { id, menteeData } = req.body;
//         // const menteeData = new Mentee(req.body);
//         const updatedMentee = await menteeData.update(id);
//         res.status(200).json(updatedMentee);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// Update an existing mentee
async function updateMentee(req, res) {
    try {
        const { id, ...menteeData } = req.body; // Destructure id from the request body

        // Fetch the existing mentee data
        console.log(req.body)
        const existingMentee = await Mentee.getById(id);
        if (!existingMentee) {
            return res.status(404).json({ error: 'Mentee not found' });
        }

        // Update only the provided fields
        const updatedMenteeData = { ...existingMentee, ...menteeData };

        console.log("done")
        // Save the updated mentee data
        const updatedMentee = new Mentee(updatedMenteeData);
        const result = await updatedMentee.update(id);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// Get a mentee by ID
async function getMenteeById(req, res) {
    try {
        const { id } = req.body;
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
