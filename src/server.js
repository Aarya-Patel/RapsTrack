
const path = require('path');
const EventEmitter = require('events');
const express = require('express');
const {exec} = require('child_process');

const PORT = 5000;

class MyEmitter extends EventEmitter{}

const myEmitter = new MyEmitter();
const app = express();

// Serve the actual app files
app.use('/home', express.static('public'));
app.use('/', express.static('loadingScreen'));

//Basic loading (index.html) file that needs to be served
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'loadingScreen', 'loading.html'));
})

app.get('/data.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data.json'));
});



// Receive the POST request and redirect
app.post('/', (req, res, next) => {
    //Run the python script and then redirect
    exec('python3 public/PythonFiles/main.py', (err, stdout, stderr) => {
        res.redirect('/home');
    });
});


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));





