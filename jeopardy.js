// Jeopardy project Nov 2022

// Variables
let categories = [];
let categoryIDs = [];
const rows = 6;
const columns = 5;
let jBoard = [];
let anserVals = {};


// Producers and Creators
function numGen() { return Math.floor(Math.random() * 90) };
const br = document.createElement('br');
let catRow = document.getElementById("catRow");
const tBody = document.createElement('tbody');
let gameBoard = document.getElementById('gameBoardBody');

// function to create Catagores display row
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
            tr.appendChild(td);
            counter = counter + 1;
        }
        tr.id = z;
        tr.addEventListener('click', function (e) { handleClick(e) });
        classNo = classNo + 100;
        gameBoard.append(tr);
    }
};

// First pull from API for categories and basic info
async function getApi() {
    let response = await axios.get(`http://jservice.io/api/categories?count=100`);
    console.log(response);
    function NUM_CATEGORIES() {
        // **********NEEDS DUPLICATE CHECKER
        for (let x = 0; x < rows; x++) {
            // store new random # in variable
            const tempNo = numGen();
            // pull random catagory with variable #
            const catagory = response.data[tempNo];
            // push values into catagory and ID arrays
            function getCategoryIds() {
                // Not sure if this should be nested?
                categoryIDs.push([catagory.id]);
                return categoryIDs;
            }
            getCategoryIds();
            categories.push([catagory.title]);
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
    // in function variables
    let evt = event.target;
    const rowSelect = e.currentTarget;
    const x = rowSelect.id;
    const y = evt.cellIndex;
    let jBoardSpot = jBoard[x][y];
    const answerKey = `${x}${y}`;
// if Javascript board value hold non-number, load answer and remove listening event from cell
// ********click event needs to be set to TD instead of TR
    if (isNaN(jBoardSpot) === true){
        evt.innerText = anserVals.answerKey;
        jBoard[x][y] = 'closed';
        evt.removeEventListener('click', handleClick);
    }
// if the javascript board value holds a number, then replace innertext with Question
    if (isNaN(jBoardSpot) === false){
        getQuestion(categoryIDs[y], jBoardSpot)
        async function getQuestion(catId, value){
            let getQuestion = await axios.get(`https://jservice.io/api/clues?value=${value}&category=${catId}`);
            let questionData = getQuestion.data;
            let questionComplete = questionData[0];
            // ***** Add check here for empty or bad data
            evt.innerText = questionComplete.question;
            jBoard[x][y] = 'showing';
            evt.classList.add('showing')
            const objAnswer = {answerKey: questionComplete.answer};
            Object.assign(anserVals, objAnswer);
        } 
    }
}



/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO