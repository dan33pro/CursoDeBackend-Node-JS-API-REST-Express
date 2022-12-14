const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Este es mi server en Express');
});
app.listen(port, () => {
    console.log('Corrinedo en: http://localhost:' + port);
});
