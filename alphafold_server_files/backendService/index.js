const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');
const fs = require('fs/promises');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/submitdata', async (req,res)=> {
    let seqData = req.body.proteinSeq;
    const fileName = Array(5).fill(0).map(x => Math.random().toString(36).charAt(2)).join('')
    fs.writeFile(config.file.inputFileDir + '/' + fileName + '.fasta',seqData)
    .then(() => {
        setTimeout(()=> res.send("Submitted successfully. Job ID: " + fileName), 5000)
    })
    .catch((err) => {
        res.send("Error --> " + err);
    });
})

app.listen(config.app.port, (err)=> { 
    if(err) 
        console.log('Encountered an error', err)
    else
        console.log("Listening on port " + config.app.port);
})