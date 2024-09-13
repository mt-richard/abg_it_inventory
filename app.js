const express = require('express')  
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 4500

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/users', require('./routes/users'))

app.get('/', (req, res) =>{
    res.send('Welcome to ABG I.T Inventory MS API.');
});

app.listen(port, function(){
    console.log(`Welcome to ABG I.T Inventory MS API.\nListening on http://localhost:${port}`)
})