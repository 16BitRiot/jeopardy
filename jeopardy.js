// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]


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
        // tr.classList.add(classNo);
        tr.addEventListener('click', function (e) { handleClick(e) });
        classNo = classNo + 100;
        gameBoard.append(tr);
    }

};


async function getApi() {
    let response = await axios.get(`http://jservice.io/api/categories?count=100`);
    console.log(response);
    /** Get NUM_CATEGORIES random category from API.
     *
     * Returns array of category ids
     */
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
    NUM_CATEGORIES();
    catDisplay();
    makeBody();
}
getApi()

/** Return object with data about a category:
*
*  Returns { title: "Math", clues: clue-array }
*
* Where clue-array is:
*   [
*      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
*      {question: "Bell Jar Author", answer: "Plath", showing: null},
*      ...
*   ]
*/


// async function getCategory(catId) {
//     // pull category based on handed in value
//     let response2 = await axios.get(`https://jservice.io/api/category?id=${catId}`);
//     // clue object placed in variable
//     const clues = response2.data.clues;
//     // insert the title as key and clue array as value
//     tryClues = clues;
//     return categoryClues[response2.data.title] = clues;
// }



/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    // see makeboard function
}



/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(e) {

    let evt = event.target;
    const rowSelect = e.currentTarget;
    const x = rowSelect.id;
    const y = evt.cellIndex;
    let jBoardSpot = jBoard[x][y];
    const clickValue = evt.className;
    const clickID = evt.id;
    console.log(evt);
    // debugger

    if (isNaN(jBoardSpot) === true){
        console.log('give anser=we')
    }
    // will run if hte back end is a number
    if (isNaN(jBoardSpot) === false){
        console.log(jBoardSpot);
        getQuestion(categoryIDs[y], jBoardSpot)
        async function getQuestion(catId, value){
            let getQuestion = await axios.get(`https://jservice.io/api/clues?value=${value}&category=${catId}`);
            let questionData = getQuestion.data;
            let questionComplete = questionData[0];
            evt.innerText = questionComplete.question;
            jBoard[x][y] = 'showing';
            evt.classList.add('showing')
            debugger
        } 
    }

    // if (isNaN(jBoardSpot) === true){
    //     console.log(jBoardSpot);
    // }

    // if (clickValue === noClass) {
    //     getCategory2(clickID, clickValue);
    //     async function getCategory2(catId, value) {
    //         let response2 = await axios.get(`https://jservice.io/api/clues?value=${value}&category=${catId}`);
    //         let catVal = response2.data;
    //         let catVal2 = catVal[0];
    //         console.log(catVal2.question);
    //         console.log(catVal2.answer);
    //         insertQuest = catVal2.question;
    //         evt.innerText = insertQuest;
    //         evt.classList.add('showing');
    //         clickValue = 'showing';
    //     }
    // }
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