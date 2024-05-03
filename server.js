'use strict'

// Definition
const express = require('express');
const app = express();
const port = process.env.port || 3000;

// Routing config

app.use('/', require('./api-gateway/index.gateway'));
app.use('/api', require('./api-gateway/api.gateway'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})