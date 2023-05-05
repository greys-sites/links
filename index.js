const fs = require('fs');
const express = require('express');
const app = express();

const index = fs.readFileSync('./index.html', 'utf-8');

app.get('/', (req, res) => {
	return res.send(index)
})

app.listen(3002);