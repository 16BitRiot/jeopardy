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
let testObject = {};
let categoryClues = {};
const responseData = {};
const rows = 5;
const columns = 5;

// Producers and Creators
function numGen() { return Math.floor(Math.random() * 90) };
const div = document.createElement('div');
const br = document.createElement('br');
let catRow = document.getElementById("catRow");
// const tHead = document.createElement('thead');
const tBody = document.createElement('tbody');
// let tr = document.createElement('tr');
// let td = document.createElement('td');
let gameBoard = document.getElementById('gameboard');
function catDisplay() {
    let tHead = document.createElement('thead');
    for (let cat of categories) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerText = cat;
        tr.appendChild(td);
        catRow.append(tr);
    }
};

function questionBox() {
    let tempbox = tr;
    tempbox.append('?');
    tempbox.append(br);
    tHead.append(tempbox);
    gameBoard.append(tHead);
}
// const  = document.createElement('');


async function getApi() {
    let response = await axios.get(`http://jservice.io/api/categories?count=100`);
    console.log(response);
    /** Get NUM_CATEGORIES random category from API.
     *
     * Returns array of category ids
     */
    function NUM_CATEGORIES() {
        // **********NEEDS DUPLICATE CHECKER
        for (let x = 0; x < 5; x++) {
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

async function getCategory(catId) {
    // pull category based on handed in value
    let response2 = await axios.get(`https://jservice.io/api/category?id=${catId}`);
    // clue object placed in variable
    const clues = response2.data.clues;
    // insert the title as key and clue array as value
    return categoryClues[response2.data.title] = clues;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    const emptyRow = Array.apply('test', Array(rows));
    tHead.appendChild(emptyRow);
    console.log(getCategory(22));
}









/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
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