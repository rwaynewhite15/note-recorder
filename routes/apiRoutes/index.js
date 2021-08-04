const router = require('express').Router();
const fs = require('fs');
const { post } = require('../htmlRoutes');
let uniqueID = 1

function getNotes(){
    const notes = fs.readFileSync("db/db.json", "utf8");
    return JSON.parse(notes);
}
function saveNotes(notes){
    console.log(`NOTE SAVED`);
    fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8");
}

router.get("/notes", (req, res) => {
    const notes = getNotes();
    res.json(notes);
  });

router.delete("/notes/:id", (req, res) => {
    const notes = getNotes();
    const unpdatedNotes = notes.filter(note => note.id !== req.params.id);
    saveNotes(unpdatedNotes);
    res.status.json({
        ok : true
    });
  });

router.post("/notes",(req,res) => {
    const note = req.body;
    const {title,text} = note;
    const newNote = {title,text,id:(uniqueID++).toString()};
    const notes = getNotes();
    notes.push(newNote);
    saveNotes(notes);
    res.json(newNote);
})

module.exports = router;

