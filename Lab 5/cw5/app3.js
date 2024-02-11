import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';

/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug'); // Use the 'Pug' template system
app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment

/* ************************************************ */

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

/* ******** */
/* "Routes" */
/* ******** */

app.get('/', async function (request, response) {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('AGH');
    const collection = db.collection('students');
    const students = await collection.find({}).toArray();

    response.render('index', { students: students });
    client.close();
});

app.get('/submit', function (request, response) {
    response.set('Content-Type', 'text/plain')
    response.send(`Hello ${request.query.name}`);
});

app.post('/', function (request, response) {
    response.set('Content-Type', 'text/plain')
    response.send(`Hello ${request.body.name}`);
});

app.get('/:faculty', async function (request, response) {
    const faculty = request.params.faculty;
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('AGH');
    const collection = db.collection('students');
    const students = await collection.find({faculty: faculty}).toArray();

    response.render('index', { students: students });
    client.close();
});

/* ************************************************ */

app.listen(8000, function () {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});