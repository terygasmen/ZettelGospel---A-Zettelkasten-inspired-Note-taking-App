const express = require('express');
const router = express.Router();
const note = require('../models/note');

router.get("/", async (req, res) => {
        const searchTerm = req.query.q;
        const query = searchTerm ? { $text: { $search: searchTerm }} : {};

        try {
                const result = await note.find(query).exec();
                res.json(result);
        } catch (err) {
                console.error(err);
                res.status(500).json({error: "Internal Server Error"});
        }
});

const mongoose = require('mongoose');

router.get("/:id", async (req, res) => {
    const noteId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({ error: "Invalid note ID" });
    }

    try {
        const result = await note.findById(noteId).exec();
        if (!result) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/add", async (req, res) => {
        const newNote = new note(req.body);
      
        try {
          await newNote.save();
          console.log("Note added successfully");
          res.status(201).json(newNote); 
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      });      

router.delete("/delete", async (req, res) => {
        const id = req.body.idNote;

        try {
                await note.findByIdAndDelete(id).exec();
                console.log("Note Deleted Successfully");
                res.status(204).send();
        } catch (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
        }
});

module.exports = router;
