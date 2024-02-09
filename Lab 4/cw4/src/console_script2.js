/* eslint-disable no-undef */
import fs from 'fs-extra';
import { argv } from 'node:process';
import { exec } from 'node:child_process';
import readline from 'readline';

/** Path to file witch stores number of script runs */
const COUNTER_FILE_PATH = 'src/counter.txt';

/** First two "argv" array elements are paths to executable files so they're not important **/
const args = argv.slice(2);

/** Synchronously read value from file counter.txt */
function readCounterSync() {
    try {
        return parseInt(fs.readFileSync(COUNTER_FILE_PATH, 'utf-8'));
    } catch (err) {
        console.log("Błąd z odczytem zawartości pliku.")
    }
}

/** Synchronously write value to file counter.txt 
 * @param {int} counter - value from file counter.txt
*/
function writeCounterSync(counter) {
    try {
        fs.writeFileSync(COUNTER_FILE_PATH, counter.toString(), 'utf-8');
    } catch (err) {
        console.log("Błąd z zapisem zawartości do pliku.")
    }
}

/** Asynchronously read value from file counter.txt */
async function readCounterAsync() {
    try {
        return await fs.readFile(COUNTER_FILE_PATH, 'utf-8');
    } catch (err) {
        console.log("Błąd z odczytem zawartości pliku.")
    }
}

/** Asynchronously write value to file counter.txt 
 * @param {int} counter - value from file counter.txt
*/
async function writeCounterAsync(counter) {
    try {
        return await fs.writeFile(COUNTER_FILE_PATH, counter.toString());
    } catch (err) {
        console.log("Błąd z zapisem zawartości do pliku.")
    }
}

function runSystemCommands() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (command) => {
        runSingleCommand(command);
    });
}

function runSingleCommand(command) {
    exec(command, (err, output) => {
        if (err) {
            console.error("could not execute command: ", err)
            return
        }
        console.log("Output: \n", output)
    })
}

/** Main function  */
async function main() {
    if (args.length > 1) {
        console.log("Wrong arguments number!");
        return;
    }
    else if (args[0] === '--sync') {
        let counter = readCounterSync();
        counter++;
        writeCounterSync(counter);
        console.log("Liczba uruchomień: " + counter);
    }
    else if (args[0] === '--async') {
        let counter = await readCounterAsync();
        counter++;
        writeCounterAsync(counter);
        console.log("Liczba uruchomień: " + counter);
    }
    else if (args.length == 0) {
        console.log("Wprowadź komendy — naciśnięcie Ctrl+D kończy wprowadzanie danych");
        runSystemCommands();
    }
}

main()