//words available for hangman game
//  var wordArray = ["luisana","aldo","melquiades","coffee","black","hole","cellphone","test"];

//selects a random word from array, determines length of word, and assigns a selected word to a variable (selectedWord).  
// var randomWord = Math.floor(Math.random()*wordArray.length);
// var wordLength = wordArray[randomWord].length;
// var selectedWord = wordArray[randomWord];

// initialize an emptyWord that will be compared to  selectedWord and emptyDisplayWord.  emtpyDisplayWord is used to display to page in the following format:  if emptyWord = "test" then emtpyDisplayWord = "t e s t" 
// var emptyDisplayWord = "";

// gameStatus object will keep track of game and is initialized here.

// console.log(wordArray[randomWord]);
// console.log(wordLength);

//create two arrays of the same size (length of selectedWord). Each letter of selectedWord will occupy a space in the selectedWordArray.  e.g. selectedWord = test; selectedWordArray = [t,e,s,t];  each space in emptyWordArray is occupied by "_". e.g. selectedWord = test emptyWordArray = [-,-,-,-]


// for (i = 0; i < wordLength; i++){
//     selectedWordArray[i] = selectedWord.substr(i,1);
//     emptyWordArray[i] = "_";
//     emptyWordDisplayArray[i] = "_ "
    
// };
var gameStatus = { isPlaying: false, selectedWord: "", emptyWord: "", selectedWordArray: [], emptyWordArray: [], wrongLetterArray: [], testValue: 0, numberWins: 0, numberLosses: 0, lives: 0 };

var wordArray = ["luisana", "aldo", "melquiades", "coffee", "black", "hole", "cellphone", "test"];

$(document).ready(function () {
    
    initialization();
    //var initialObject = initialization();
});

function initialization(){
    if (!gameStatus.isPlaying){
        var randomWord = Math.floor(Math.random()*wordArray.length);
        var selectedWord = wordArray[randomWord];
        gameStatus.selectedWord = wordArray[randomWord];
        gameStatus.selectedWordArray = [];
        gameStatus.emptyWordArray = [];
        gameStatus.emptyWord = "";
        gameStatus.lives = 6;
        gameStatus.wrongLetterArray = [];
        
        for (i = 0; i < gameStatus.selectedWord.length; i++){
            gameStatus.selectedWordArray[i] = gameStatus.selectedWord.substr(i,1);
            gameStatus.emptyWordArray[i] = "-";
        }

        console.log(selectedWord);

        $("#testId").html("press space bar to start playing");
        $("#lives").html("lives: " + gameStatus.lives);
        $("#wins").html("wins: " + gameStatus.numberWins);
        $("#losses").html("losses: " + gameStatus.numberLosses);
        $("#emptyWord").html();
        $("#wrongKey").html();
    };
};



$(document).keypress(function startGameKeyPress(event) {
    if (!gameStatus.isPlaying){
        var eventPress = String.fromCharCode(event.keyCode);
        if (/ /.test(eventPress)){
            $("#testId").html("INNNNNNN");
            gameKeyPress();
        } else{console.log("wrong key... you don't want to play?")}
    } else if (gameStatus.isPlaying) { 
                var eventPress = String.fromCharCode(event.keyCode);
                if (/[a-zA-Z]/.test(eventPress)) {
                    gameLogic(event, gameStatus.selectedWord, gameStatus.selectedWordArray, gameStatus.emptyWord, gameStatus.emptyWordArray, gameStatus.wrongLetterArray);
                } else { console.log("key needs to be a letter from a-z") };
    };
});

function gameKeyPress(){
    gameStatus.isPlaying = true;
};


function gameLogic(event, selectedWord, selectedWordArray, emptyWord, emptyWordArray, wrongLetterArray){    
    console.log("this is my logic") 

    var userInput = String.fromCharCode(event.keyCode).toLowerCase();    
    var isUserGuessValid = false;
   

    for (i = 0; i < selectedWord.length; i++){
        if (selectedWordArray[i] == userInput){
            emptyWordArray[i] = userInput;
            isUserGuessValid = true;
        }
        // emptyWordDisplay = emptyWordDisplay + " " + emptyWordArray[i];
        emptyWord = emptyWord + emptyWordArray[i];
    };

    if (!isUserGuessValid && wrongLetterArray.indexOf(userInput) == -1){
        gameStatus.lives--;
        wrongLetterArray.push(userInput);
        wrongLetterWord = wrongLetterWord + " " + userInput;
        // $("#wrongLetterWord").html(wrongLetterWord);
        console.log(wrongLetterArray);
        $("#lives").html(gameStatus.lives)
    };
    console.log(emptyWordArray);
    console.log(emptyWord);
    checkGameStatus(emptyWord, selectedWord);    
};

function checkGameStatus(emptyWord, selectedWord) {
    if (gameStatus.lives > 0 && emptyWord == selectedWord) {
        gameStatus.isPlaying = false;
        gameStatus.numberWins++;
        $("#wins").html("wins: " + gameStatus.numberWins);
        initialization();
    }
    else if (gameStatus.lives <= 0) {
        gameStatus.isPlaying = false;
        gameStatus.numberLosses++;
        $("#losses").html("losses: " + gameStatus.numberLosses);
        initialization();
    }else{console.log("still playin'")};
};