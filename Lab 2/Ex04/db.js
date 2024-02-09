// creating data below
const mockupData = [
    {
        type: "Z łazienką",
        places: 2,
        imgUrl: "https://unsplash.com/photos/rEJxpBskj3Q",
        rentBy: null,
        startDate: null,
        endDate: null
    },
    {
        type: "Bez łazienki",
        places: 1,
        imgUrl: "https://unsplash.com/photos/H-1j_s0dhCw",
        rentBy: "Jan Kowalski",
        startDate: "2023-05-01",
        endDate: "2023-05-03"
    },
    {
        type: "Bez łazienki",
        places: 1,
        imgUrl: "https://unsplash.com/photos/t7zYZzO_CX0",
        rentBy: "Jakub Kowalczyk",
        startDate: "2023-05-15",
        endDate: "2023-05-20"
    },
    {
        type: "Z łazienką",
        places: 2,
        imgUrl: "https://unsplash.com/photos/oxeCZrodz78",
        rentBy: "Maciej Dubiel",
        startDate: "2023-05-20",
        endDate: "2023-05-22"
    },
    {
        type: "Z łazienką",
        places: 1,
        imgUrl: "https://unsplash.com/photos/w1RE0lBbREo",
        rentBy: "Andrzej Duda",
        startDate: "2023-06-01",
        endDate: "2023-06-10"
    }
]

// creating database below
const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

const request = indexedDB.open("RoomsDatabase", 1);

request.onerror = function (event) {
    console.log("An error occurred with IndexedDB");
    console.log(event);
}

request.onupgradeneeded = function () {
    const db = request.result;
    const store = db.createObjectStore("room", { keyPath: "id", autoIncrement: true });

    store.createIndex("type", ["type"], { unique: false });
    store.createIndex("places", ["places"], { unique: false });
    store.createIndex("imgUrl", ["imgUrl"], { unique: false });
    store.createIndex("rentBy", ["rentBy"], { unique: false });
    store.createIndex("startDate", ["startDate"], { unique: false });
    store.createIndex("endDate", ["endDate"], { unique: false });

    for (room of mockupData) {
        store.put(room);
    }
}

request.onsuccess = function () {
    console.log("Pomyślnie utworzono bazę danych!");
}

function reserveRoom() {
    const nameAndRoom = document.querySelectorAll("#reserve-room-input-container > input");
    let name = nameAndRoom[0].value;
    let surname = nameAndRoom[1].value;
    let roomId = nameAndRoom[2].value;
    let startDate = nameAndRoom[3].value;
    let endDate = nameAndRoom[4].value;
    roomId = Number.parseInt(roomId);

    console.log(startDate);
    console.log(name);

    // error handling
    if ((name == "") || (surname == "")){
        console.log("Błąd przy wprowadzaniu imienia bądź nazwiska!");
        return;
    }
    
    if (isNaN(roomId)) {
        console.log("Błąd przy wprowadzaniu numeru pokoju!")
        return;
    }

    if (isNaN(startDate) || isNaN(endDate)) {
        console.log("Błąd przy wprowadzaniu dat pobytu!");
        return;
    }

    const db = request.result;
    const transaction = db.transaction("rooms", "readwrite");
    const store = transaction.objectStore("rooms");
    const idQuery = store.get(roomId);

    idQuery.onsuccess = function () {
        const room = idQuery.result;
        if (room.rentBy) {
            console.log("Ten pokój został już przez kogoś wypożyczony!");
            return;
        }
        else {
            room.rentBy = name + " " + surname;
            laterDate.setDate(todayDate.getDate() + dayQuantity);
            todayDate = convertDateToString(todayDate);
            laterDate = convertDateToString(laterDate);
            room.startDate = todayDate;
            room.endDate = laterDate;
        }
    }

    idQuery.onerror = function () {
        console.log("Nie ma takiego pokoju w bazie danych!");
        return;
    }

    transaction.oncomplete = function () {
        console.log("Zamykanie transakcji!");
        return;
    }
}

function resignRoom() {
    const nameAndRoom = document.querySelectorAll("#resign-room-input-container > input");
    let name = nameAndRoom[0].value;
    let surname = nameAndRoom[1].value
    let roomId = nameAndRoom[2].value;
    roomId = Number.parseInt(roomId);

    // errors handling below
    if (!checkRoom(roomId)) {
        console.log("Nie ma takiego pokoju w bazie danych!");
        return;
    }

    if (!checkPerson(rentBy)) {
        console.log("Nie ma takiej osoby w bazie danych!")
        return;
    }

    const room = mockup[roomId];

    if (room.rentBy == name + " " + surname) {
        room.rentBy = null
        console.log("Pan/Pani " + name + " " + surname + " zwraca pokój o nnumerze " + roomId);
    } else {
        console.log("Pan/Pani " + name + " " + surname + " nie wypożyczył/a tego pokoju!");
    }

}

function showRooms() {
    const dates = document.querySelectorAll("#dates-input-container > input");
    let startDate = dates[0].value;
    let endDate = dates[1].value;

    startDate = convertToDateType(startDate);
    endDate = convertToDateType(endDate);

    // errors handling below
    if (startDate > endDate) {
        console.log("Data rozpoczęcia nie może być późniejsza od daty zakończenia!");
        return;
    }

    if (isNaN(startDate) || isNaN(endDate)) {
        console.log("Nieprawidłowy format daty!");
        return;
    }

    const db = request.result;
    const transaction = db.transaction("room", "readwrite");
    const roomObject = transaction.objectStore("room");
    const roomRequests = roomObject.getAll();

    roomRequests.onsuccess = function () {
        let rooms = roomRequests.result;

        for (let room of rooms) {
            if ((startDate < convertToDateType(room.startDate)) && (convertToDateType(room.endDate) < endDate)) {
                console.log("ID pokoju: " + room.id);
                console.log("Typ pokoju: " + room.type);
                console.log("Ilość miejsc: " + room.places);
                console.log("URL zdjęcia: " + room.imgUrl);
                console.log("Wypożyczający: " + room.rentBy);
                console.log("Początek rezerwacji: " + room.startDate);
                console.log("Koniec rezerwacji: " + room.endDate);
                console.log("-----------------------");
            }
        }
        console.log(checkRoomInDB(10));
    }

    transaction.oncomplete = function () {
        console.log("Transakcja zakończona");
        db.close();
    };

    transaction.onerror = function (event) {
        console.log("Błąd transakcji:", event.target.errorCode);
    };
}

function convertToDateType(date) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}

function checkRoom(roomId) {
    if (!mockupData.hasOwnProperty(roomId)) {
        return false;
    }
    return true;
}

function checkPerson(nameAndSurname) {
    if (!mockupData.hasOwnProperty(nameAndSurname)) {
        return false;
    }
    return true;
}

function convertDateToString(date) {
    const isoString = date.toISOString();
    const dateParts = isoString.substring(0, 10).split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${year}-${month}-${day}`;
}


const reserveRoomButton = document.querySelector("#reserve-room-button");
const resignRoomButton = document.querySelector("#resign-room-button");
const showRoomsButton = document.querySelector("#show-rooms-button");
reserveRoomButton.addEventListener('click', reserveRoom);
resignRoomButton.addEventListener('click', resignRoom);
showRoomsButton.addEventListener('click', showRooms);
