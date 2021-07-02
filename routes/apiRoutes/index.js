const router = require('express').Router();
const fs = require('fs');
const { post } = require('../htmlRoutes');

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

router.post("/notes",(req,res) => {
    const note = req.body;
    const notes = getNotes();
    notes.push(note);
    saveNotes(notes);
    res.json(note)
})

router.delete(
});

module.exports = router;

