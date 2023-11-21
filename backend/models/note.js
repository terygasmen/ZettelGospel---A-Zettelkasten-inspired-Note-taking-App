const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
        title: {type: String},
        content: { type: String, required: true},
        address: { type: String, required: true},
        citation: {type: String }
}, {
        timestamps: true,
});

const note = mongoose.model("note", noteSchema);

module.exports = note;