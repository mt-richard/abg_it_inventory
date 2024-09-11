const express = require('express')  
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 4500

app.get('/', (req, res) =>{
    res.send('Welcome to ABG I.T Inventory MS API.');
});

app.listen(port, function(){
    console.log(`Welcome to ABG I.T Inventory MS API.\nListening on http://localhost:${port}`)
})