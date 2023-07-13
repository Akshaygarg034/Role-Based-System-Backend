const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note')
const fetchuser = require('../middlewares/fetchuser');
const router = express.Router();

// Only admins and superadmins are allowed
router.post('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        if (req.user.role == "admin" || req.user.role == "superadmin") {
            const notes = await Note.find();
            res.send(notes);
        }
        else {
            return res.status(404).json({ error: 'Users are not allowed' })
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }

})

// That user, admins and superadmins are allowed
router.get('/fetchusernotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.send(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }

})

// Fetch Notes by ID
router.post('/fetchnotesbyid/:id', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.params.id });
        if (!notes) {
            return res.status(404).send('Notes Not Found')
        }
        // Checks if the note User is same as the User of the token
        if (req.user.role == "admin" || req.user.role == "superadmin"){
            res.send(notes);
        }
        else{
            return res.status(401).send('Other Users are Not Allowed')
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

// Only student is allowed
router.post('/addnote', fetchuser, [
    body('title', 'title must be minimum of 3 characters').isLength({ min: 3 }),
    body('description', 'description must be minimum of 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        // This will throw an error if title or description is not valid
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description } = req.body;
        const note = new Note({ title, description, user: req.user.id, name: req.user.name });
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

// That user, admins and superadmins are allowed
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description } = req.body;
    const newNote = {};
    try {
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note Not Found')
        }
        // Checks if the note User is same as the User of the token || user of token is admin || superadmin
        if (req.user.role == "admin" || req.user.role == "superadmin") {
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json(note)
        }
        else {
            return res.status(401).send('Users are not allowed to do this.')
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

// That user, admins and superadmins are allowed
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note Not Found')
        }
        // Checks if the note User is same as the User of the token
        if (req.user.role == "admin" || req.user.role == "superadmin") {
            note = await Note.findByIdAndDelete(req.params.id);
            res.json({
                Success: "Note has been deleted",
                note: note
            })
        }
        else{
            return res.status(401).send('Users are Not Allowed')
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

module.exports = router