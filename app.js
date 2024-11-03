const express = require('express')  
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 4500

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

// main routes
app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/locations', require('./routes/locations'))
app.use('/suppliers', require('./routes/suppliers'))
app.use('/item_category', require('./routes/item_category'))
app.use('/inventory_items', require('./routes/inventory_items'))

app.get('/', (req, res) =>{
    res.send('Welcome to ABG I.T Inventory MS API.');
});

app.listen(port, function(){
    console.log(`Welcome to ABG I.T Inventory MS API.\nListening on http://localhost:${port}`)
})