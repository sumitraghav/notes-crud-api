const Note = require('../models/note.model');

exports.create = (req, res) => {
    console.log('Create note');
    console.log(req.body);
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content is empty"
        });
    }

    // Create A note
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    });

    // Save note in database
    note.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
}

exports.findAll = (req, res) => {
    console.log('find all note');
    // fetch all notes from database
    Note.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the Note."
            });
        });
}

exports.findOne = (req, res) => {
    console.log('Find one note');
    // fetch all notes from database
    Note.findById(req.params.noteId)
        .then(note => {
            console.log(req.params.noteId);
            if (!note) {
                res.status(404).send({
                    message: `Note not found with Id ${req.params.noteId}`
                })
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                res.status(404).send({
                    message: `Note not found with Id ${req.params.noteId}`
                })
            }
            res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
}

exports.update = (req, res) => {
    console.log('update note');
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content is empty"
        });
    }

    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, { new: true }).then(note => {
        if (!note) {
            res.status(400).send({
                message: "note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            res.status(404).send({
                message: `Note not found with Id ${req.params.noteId}`
            })
        }
        res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    })
}

exports.delete = (req, res) => {
    console.log('delete note');
    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
}