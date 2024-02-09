/* eslint-disable no-undef */
import http from 'node:http';
import { URL } from 'node:url';
import fs from 'fs-extra';
import { exec } from 'node:child_process';

const COUNTER_FILE_PATH = 'counter.txt';

/**
     * Handles incoming requests.
     *
     * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g,. encoded contents of HTML form fields.
     * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
     * The answer sent by this stream must consist of two parts: the header and the body.
     * <ul>
     *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
     *  <li>The body contains the correct data, e.g. a form definition.
     * </ul>
     * @author Stanisław Polak <polak@agh.edu.pl>
*/

// reading from file synchronously
function readCounterSync() {
    return parseInt(fs.readFileSync(COUNTER_FILE_PATH, 'utf-8'));
}

// writing to file synchronously
function writeCounterSync(counter) {
    const counterString = counter.toString();
    fs.writeFileSync(COUNTER_FILE_PATH, counterString, 'utf-8');
}

// reading and writing to file asynchronously
function readWriteCounterAsync(response) {
    fs.readFile(COUNTER_FILE_PATH, 'utf8', function (err, counter) {
        if (err) throw err;
        counter = parseInt(counter);
        counter++;
        const counterString = counter.toString();
        writeCounterAsync(response, counterString);
    });
}

// writing to file asynchronously
function writeCounterAsync(response, counterString) {
    fs.writeFile(COUNTER_FILE_PATH, counterString, function (err) {
        if (err) throw err;
        sendHTMLResponseCounter(response, renderResult(counterString));
    });
}

function sendHTMLResponseCounter(response, html) {
    // Creating an answer header — we inform the browser that the returned data is a html
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(html);
    response.end();
}

// executing system commands until Ctrl + D is sent
function runSystemCommands(response, commands) {
    console.log(commands);
    exec(commands, (err, stdout, stderr) => {
        if (err) {
            console.error("could not execute command: ", err)
            return
        }
        if (stderr) {
            console.log("error: ", stderr);
            return;
        }
        console.log("Output: \n", stdout)
        sendHTMLResponseCounter(response, renderResult2(stdout));
    })
}

function renderResult(counter) {
    return `
    <html>
      <head>
        <meta charset="utf-8">
        <title>Counter result</title>
      </head>
      <body>
        <h1>Counter result</h1>
        <p>Liczba uruchomień: ${counter}</p>
      </body>
    </html>
  `;
}

function renderResult2(text) {
    return `
    <html>
      <head>
        <meta charset="utf-8">
        <title>result</title>
      </head>
      <body>
        
        <p>Result: ${text}</p>
      </body>
    </html>
  `;
}

function requestListener(request, response) {
    console.log('--------------------------------------');
    console.log(`The relative URL of the current request: ${request.url}`);
    console.log(`Access method: ${request.method}`);
    console.log('--------------------------------------');
    // Create the URL object
    const url = new URL(request.url, `http://${request.headers.host}`);
    /* ******** */
    /* "Routes" */
    /* ******** */
    /* ---------------- */
    /* Route "GET('/')" */
    /* ---------------- */
    if (url.pathname === '/' && request.method === 'GET') {
        // Generating the form if the relative URL is '/', and the GET method was used to send data to the server'
        /* ************************************************** */
        // Setting a response body
        response.write(`
<!DOCTYPE html>
<html lang="en">
    </head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Your first page</title>
    </head>
    <body>
        <main>
            <h1>First application</h1>
            <form method="GET" action="/submit">
                <select name="name">
                    <option value="-----">---------</option>
                    <option value="sync">sync</option>
                    <option value="async">async</option>
                </select>
                <textarea name="commands" id="commands">Tu wpisz tekst który pojawi się domyślnie</textarea>
                <button type="submit">SUBMIT</button>
            </form>
        </main>
  </body>
</html>`);
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browser
    }
    /* ---------------------- */
    /* Route "GET('/submit')" */
    /* ---------------------- */
    else if (url.pathname === '/submit' && request.method === 'GET') {
        // Processing the form content, if the relative URL is '/submit', and the GET method was used to send data to the server'
        let chosenOption = url.searchParams.get('name');
        let counter;
        if (chosenOption == "sync") {
            counter = readCounterSync();
            counter++;
            writeCounterSync(counter);
            sendHTMLResponseCounter(response, renderResult(counter));
        }
        else if (chosenOption == "async") {
            readWriteCounterAsync(response);
        }
        else {
            let commands = url.searchParams.get('commands');
            runSystemCommands(response, commands);
        }
    }
    // If no route is implemented
    else {
        response.writeHead(501, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.write('Error 501: Not implemented');
        response.end();
    }
}
// Main block
const server = http.createServer(requestListener);
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');