const express = require('express');
const { callbackify } = require('util');
const app = express();

app.listen(3000, ()=>{
    console.log(`Listening on Port 3000`);
})

