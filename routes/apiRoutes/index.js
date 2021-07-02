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

router.delete("/notes",(req,res) =>{
    const deleteId = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        let notesArr = JSON.parse(data);
        for (let i = 0; i < notesArr.length; i++) {
            if (notesArr[i].id === deleteId) {
              notesArr.splice(i, 1);
            }
        }
    return res;
    });
});

module.exports = router;

