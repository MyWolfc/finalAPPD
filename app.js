const express = require('express');
const RutaV = require('./rutas/rutaVacante');
const RutaP = require('./rutas/rutaProspecto')
const RutaE = require('./rutas/rutaEntrevista')
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('inicio');
   });
app.use('/Vacante', RutaV);
app.use('/Prospecto',RutaP);
app.use('/Entrevista',RutaE);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
