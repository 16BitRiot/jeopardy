// Jeopardy project Nov 2022

// Variables
let categories = [];
let categoryIDs = [];
const rows = 6;
const columns = 5;
let jBoard = [];
let anserVals = {};
let indexArray = [];

// Producers and Creators
function numGen() { return Math.floor(Math.random() * 90) };
const br = document.createElement('br');
let catRow = document.getElementById("catRow");
let gameBoard = document.getElementById('gameBoardBody');

// functions

// create Catagores display row
function catDisplay() {
    let tr = document.createElement('tr');
    for (let cat of categories) {
        let td = document.createElement('td');
        td.innerText = cat;
        tr.appendChild(td);
    }
    catRow.append(tr);
};

// build default gameboard body
function makeBody() {
    // Make Javascript Body
    function makeJboard() {
        for (let i = 0; i < columns; i++) {
            const emptyRow = Array.apply(null, Array(rows));
            jBoard.push(emptyRow);
        }
        return jBoard;
    }
    makeJboard()
    // make HTML Body
    let classNo = 100;
    for (let z = 0; z < columns; z++) {
        let tr = document.createElement('tr');
        let counter = 0;
        for (let i of categoryIDs) {
            let td = document.createElement('td');
            jBoard[z][counter] = classNo;
            td.id = counter;
            td.innerText = classNo;
            td.addEventListener('click', function (e) { handleClick(e) });
            tr.appendChild(td);
            counter = counter + 1;
        }
        tr.id = z;
        // e is passed in here to grab event data and is used in the handleClick function
        // tr.addEventListener('click', function (e) { handleClick(e) });
        classNo = classNo + 100;
        gameBoard.append(tr);
    }
};

// First pull from API for categories and basic info
async function getApi() {
    let response = await axios.get(`http://jservice.io/api/categories?count=100`);
    function NUM_CATEGORIES() {
        for (let x = 0; x < 25; x++) {
            if (indexArray.length < rows) {
                let tempIndex = numGen();
                let catagory1 = response.data[tempIndex];
                console.log(catagory1);
                if (catagory1.clues_count > 6) {
                    if (indexArray.indexOf(tempIndex) === -1) {
                        indexArray.push(tempIndex);
                    }
                }
            }
        }
        for (let x = 0; x < rows; x++) {
            let indexID = indexArray[x];
            let catagory2 = response.data[indexID];
            // push values into catagory and ID arrays
            function getCategoryIds() {
                categoryIDs.push([catagory2.id]);
                return categoryIDs;
            }
            getCategoryIds();
            // add titles to categories array for category display
            categories.push([catagory2.title]);
        }
    }
    // call functions to  Set board with categories and body
    NUM_CATEGORIES();
    catDisplay();
    makeBody();
}
// Run GetApi on page load
getApi()

// Click event
function handleClick(e) {
    // debugger

    // in function variables
    let evt = e.target;
    let rowSelect = e.currentTarget;
    // *****x and y are not grabbing actual coordinates******
    let x = Number(e.target.parentNode.id);
    let y = Number(e.target.id);
    let XY = x+y;
    let jBoardSpot = jBoard[x][y];
    // if Javascript board value hold non-number, load answer and remove listening event from cell
    if (jBoardSpot === null) {
        return;
    }
    if (isNaN(jBoardSpot) === true) {
        evt.innerText = anserVals[XY];
        jBoard[x][y] = null;
        evt.removeEventListener('click', handleClick);
    }
    // if the javascript board value holds a number, then replace innertext with Question
    if (isNaN(jBoardSpot) === false) {
        getQuestion(categoryIDs[y], jBoardSpot)
        async function getQuestion(catId, value) {
            let getQuestion = await axios.get(`https://jservice.io/api/clues?value=${value}&category=${catId}`);
            let questionData = getQuestion.data;
            let questionComplete = questionData[0];
            // ***** Add check here for empty or bad data
            evt.innerText = questionComplete.question;
            jBoard[x][y] = 'showing';
            evt.classList.add('showing');
            const objAnswer = { [XY]: questionComplete.answer };
            Object.assign(anserVals, objAnswer);
        }
    }
}
